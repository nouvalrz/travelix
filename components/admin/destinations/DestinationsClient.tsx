"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SortDescriptor } from "@react-types/shared";
import { Button } from "@heroui/button";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Input } from "@heroui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Image } from "@heroui/image";
import { useDisclosure } from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/card";

import DeleteModal from "../DeleteModal";

import { Destination } from "@/types/destination.type";
import { formatDateTime } from "@/lib/formatDate";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { Category } from "@/types/category.type";
import { fetchDeleteDestination } from "@/lib/data/client/destinations";
import { AppError } from "@/lib/appError";

const DestinationsClient = ({
  destinations,
  categories,
}: {
  destinations: Destination[];
  categories: Category[];
}) => {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [categoryFilterSelected, setCategoryFilterSelected] = useState<
    string | null
  >("");
  const rowsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDelete, setSelectedDelete] = useState<Destination | null>(
    null
  );
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });

  const destinationsCategoryFiltered = useMemo(() => {
    return destinations.filter((destination) =>
      !categoryFilterSelected
        ? true
        : destination.categoryId === categoryFilterSelected
    );
  }, [destinations, categoryFilterSelected]);

  const destinationsSearched = useMemo(() => {
    return destinationsCategoryFiltered.filter((destination) =>
      destination.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, destinationsCategoryFiltered]);

  const pages = Math.ceil(destinationsSearched.length / rowsPerPage) || 1;

  const destinationsSorted = useMemo(() => {
    const column = sortDescriptor.column;

    return [...destinationsSearched].sort((a, b) => {
      let aValue: string | number = a[column as keyof Destination] as string;
      let bValue: string | number = b[column as keyof Destination] as string;

      if (column === "createdAt") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (aValue < bValue)
        return sortDescriptor.direction === "ascending" ? -1 : 1;
      if (aValue > bValue)
        return sortDescriptor.direction === "ascending" ? 1 : -1;

      return 0;
    });
  }, [sortDescriptor, destinationsSearched]);

  const destinationsPaginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return destinationsSorted.slice(start, end);
  }, [currentPage, destinationsSorted]);

  const handleDeletePromo = useCallback(async () => {
    try {
      await fetchDeleteDestination(selectedDelete!.id);
      onClose();
      addToast({
        color: "success",
        title: "Success",
        description: "Successfully delete destination",
      });
      router.refresh();
    } catch (error) {
      if (error instanceof AppError) {
        addToast({
          color: "danger",
          title: error.message,
          description: error.errors?.join(", "),
        });
      }
      if (error instanceof Error) {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
        });
      }
    }
  }, [selectedDelete]);

  const handleOpenModalDelete = (destination: Destination) => {
    setSelectedDelete(destination);
    onOpen();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, categoryFilterSelected, sortDescriptor.direction]);

  const renderCell = useCallback(
    (destination: Destination, columnKey: React.Key) => {
      const cellValue = destination[columnKey as keyof Destination];

      switch (columnKey) {
        case "imageUrls":
          const images = cellValue as string[];

          return (
            <Image
              alt={images[0] as string}
              className="w-24 h-24 object-cover"
              classNames={{ wrapper: "bg-no-repeat bg-cover bg-center" }}
              fallbackSrc="/images/fallback-image.jpg"
              src={images.find(Boolean)}
            />
          );
        case "category":
          const category = cellValue as Category;

          return <p>{category.name}</p>;

        case "createdAt":
          return <p>{formatDateTime(cellValue as string)}</p>;
        case "actions":
          return (
            <div className="flex gap-2 items-center">
              <Button
                isIconOnly
                as={Link}
                color="primary"
                href={"/admin/destinations/" + destination.id}
                variant="flat"
              >
                <Pencil className="size-5" />
              </Button>
              <Button
                isIconOnly
                color="danger"
                variant="flat"
                onPress={() => handleOpenModalDelete(destination)}
              >
                <Trash2 className="size-5" />
              </Button>
            </div>
          );
        default:
          return cellValue?.toString();
      }
    },
    []
  );

  return (
    <div className="mt-6">
      <div className="flex lg:items-center gap-3 md:flex-row flex-col">
        <Input
          isClearable
          placeholder="Search by name..."
          value={searchKeyword}
          onValueChange={setSearchKeyword}
        />

        <div className="flex items-center gap-3 lg:max-w-[400px] flex-shrink-0">
          <div className="w-full">
            <Autocomplete
              allowsCustomValue={false}
              selectedKey={categoryFilterSelected}
              onSelectionChange={(key) =>
                setCategoryFilterSelected(key as string)
              }
            >
              <>
                <AutocompleteItem key="">All Category</AutocompleteItem>
                {categories.map((category) => (
                  <AutocompleteItem key={String(category.id)}>
                    {category.name}
                  </AutocompleteItem>
                ))}
              </>
            </Autocomplete>
          </div>

          <Button
            as={Link}
            className="flex-shrink-0"
            color="primary"
            href="/admin/destinations/add"
            startContent={<Plus className="size-5" />}
          >
            Add Destination
          </Button>
        </div>
      </div>
      <Card className="mt-4" shadow="sm">
        <CardBody>
          <Table
            removeWrapper
            className="min-w-[800px]"
            sortDescriptor={sortDescriptor}
            topContent={
              <div className="flex justify-between w-full items-center">
                <p className="text-sm font-medium">
                  Total destinations : {destinations.length}
                </p>
                <Pagination
                  showControls
                  page={currentPage}
                  total={pages}
                  onChange={setCurrentPage}
                />
              </div>
            }
            onSortChange={setSortDescriptor}
          >
            <TableHeader>
              <TableColumn key="imageUrls">Image</TableColumn>
              <TableColumn key="title" allowsSorting>
                Name
              </TableColumn>
              <TableColumn key="category">Category</TableColumn>
              <TableColumn key="createdAt" allowsSorting>
                Created At
              </TableColumn>
              <TableColumn key="actions">Actions</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={<EmptyPlaceholder />}
              items={destinationsPaginated}
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      <DeleteModal
        modalProps={{ isOpen: isOpen, onOpenChange: onOpenChange }}
        title="Delete Destination"
        onDelete={handleDeletePromo}
      >
        <p>
          Are you sure want to delete{" "}
          <span className="text-primary">{selectedDelete?.title}</span>?
        </p>
      </DeleteModal>
    </div>
  );
};

export default DestinationsClient;
