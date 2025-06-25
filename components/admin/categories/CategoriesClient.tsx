"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SortDescriptor } from "@react-types/shared";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Pagination } from "@heroui/pagination";
import { Button } from "@heroui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useDisclosure } from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/card";

import DeleteModal from "../DeleteModal";

import { Category } from "@/types/category.type";
import { formatDateTime } from "@/lib/formatDate";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { fetchDeleteCategory } from "@/lib/data/client/categories";

const CategoriesClient = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  const [selectedDelete, setSelectedDelete] = useState<Category | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const rowsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });

  const categoriesSearched = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, categories]);

  const pages = Math.ceil(categoriesSearched.length / rowsPerPage) || 1;

  const categoriesSorted = useMemo(() => {
    const column = sortDescriptor.column;

    return [...categoriesSearched].sort((a, b) => {
      let aValue: string | number = a[column as keyof Category];
      let bValue: string | number = b[column as keyof Category];

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
  }, [sortDescriptor, categoriesSearched]);

  const categoriesPaginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return categoriesSorted.slice(start, end);
  }, [currentPage, categoriesSorted]);

  const handleDeleteCategory = useCallback(async () => {
    try {
      await fetchDeleteCategory(selectedDelete!.id);
      onClose();
      addToast({
        color: "success",
        title: "Success",
        description: "Successfully delete category",
      });
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
        });
      }
    }
  }, [selectedDelete]);

  const handleOpenModalDelete = (category: Category) => {
    setSelectedDelete(category);
    onOpen();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, sortDescriptor.direction]);

  const renderCell = useCallback((category: Category, columnKey: React.Key) => {
    const cellValue = category[columnKey as keyof Category];

    switch (columnKey) {
      case "imageUrl":
        return (
          <Image
            alt={cellValue}
            className="w-24 h-24 object-cover"
            classNames={{
              wrapper: "bg-no-repeat bg-cover bg-center",
            }}
            fallbackSrc="/images/fallback-image.jpg"
            src={cellValue || "error"}
          />
        );

      case "createdAt":
        return <p>{formatDateTime(cellValue)}</p>;
      case "actions":
        return (
          <div className="flex gap-2 items-center">
            <Button
              isIconOnly
              as={Link}
              color="primary"
              href={"/admin/categories/" + category.id}
              variant="flat"
            >
              <Pencil className="size-5" />
            </Button>
            <Button
              isIconOnly
              color="danger"
              variant="flat"
              onPress={() => handleOpenModalDelete(category)}
            >
              <Trash2 className="size-5" />
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search by name..."
          value={searchKeyword}
          onValueChange={setSearchKeyword}
        />
        <Button
          as={Link}
          color="primary"
          href="/admin/categories/add"
          startContent={<Plus className="size-12" />}
        >
          Add Category
        </Button>
      </div>
      <Card className="mt-4" shadow="sm">
        <CardBody>
          <Table
            removeWrapper
            className="min-w-[600px]"
            sortDescriptor={sortDescriptor}
            topContent={
              <div className="flex justify-between w-full items-center">
                <p className="text-sm font-medium">
                  Total Categories : {categories.length}
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
              <TableColumn key="imageUrl">Image</TableColumn>
              <TableColumn key="name" allowsSorting>
                Name
              </TableColumn>
              <TableColumn key="createdAt" allowsSorting>
                Created At
              </TableColumn>
              <TableColumn key="actions">Actions</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={<EmptyPlaceholder />}
              items={categoriesPaginated}
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
        title="Delete Category"
        onDelete={handleDeleteCategory}
      >
        <p>
          Are you sure want to delete{" "}
          <span className="text-primary">{selectedDelete?.name}</span>?
        </p>
      </DeleteModal>
    </div>
  );
};

export default CategoriesClient;
