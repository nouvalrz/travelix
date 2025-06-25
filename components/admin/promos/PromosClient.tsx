"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SortDescriptor } from "@react-types/shared";
import { Button } from "@heroui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Image } from "@heroui/image";
import Link from "next/link";
import { Input } from "@heroui/input";
import {
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Table,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { useDisclosure } from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/card";

import DeleteModal from "../DeleteModal";

import { formatDateTime } from "@/lib/formatDate";
import { Promo } from "@/types/promo.type";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { fetchDeletePromo } from "@/lib/data/client/promos";

const PromosClient = ({ promos }: { promos: Promo[] }) => {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const rowsPerPage = 10;

  const [selectedDelete, setSelectedDelete] = useState<Promo | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });

  const promosSearched = useMemo(() => {
    return promos.filter((promo) =>
      promo.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, promos]);

  const pages = Math.ceil(promosSearched.length / rowsPerPage) || 1;

  const promosSorted = useMemo(() => {
    const column = sortDescriptor.column;

    return [...promosSearched].sort((a, b) => {
      let aValue: string | number = a[column as keyof Promo];
      let bValue: string | number = b[column as keyof Promo];

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
  }, [sortDescriptor, promosSearched]);

  const promosPaginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return promosSorted.slice(start, end);
  }, [currentPage, promosSorted]);

  const handleDeletePromo = useCallback(async () => {
    try {
      await fetchDeletePromo(selectedDelete!.id);
      onClose();
      addToast({
        color: "success",
        title: "Success",
        description: "Successfully delete banner",
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

  const handleOpenModalDelete = (promo: Promo) => {
    setSelectedDelete(promo);
    onOpen();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, sortDescriptor.direction]);

  const renderCell = useCallback((promo: Promo, columnKey: React.Key) => {
    const cellValue = promo[columnKey as keyof Promo];

    switch (columnKey) {
      case "imageUrl":
        return (
          <Image
            alt={cellValue as string}
            className="w-24 h-24 object-cover"
            classNames={{
              wrapper: "bg-no-repeat bg-cover bg-center",
            }}
            fallbackSrc="/images/fallback-image.jpg"
            src={(cellValue as string) || "error"}
          />
        );
      case "createdAt":
        return <p>{formatDateTime(cellValue as string)}</p>;
      case "actions":
        return (
          <div className="flex gap-2 items-center">
            <Button
              isIconOnly
              as={Link}
              color="primary"
              href={"/admin/promos/" + promo.id}
              variant="flat"
            >
              <Pencil className="size-5" />
            </Button>
            <Button
              isIconOnly
              color="danger"
              variant="flat"
              onPress={() => handleOpenModalDelete(promo)}
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
          href="/admin/promos/add"
          startContent={<Plus className="size-12" />}
        >
          Add Promo
        </Button>
      </div>
      <Card className="mt-4" shadow="sm">
        <CardBody>
          <Table
            removeWrapper
            className="min-w-[700px]"
            sortDescriptor={sortDescriptor}
            topContent={
              <div className="flex justify-between w-full items-center">
                <p className="text-sm font-medium">
                  Total Promos : {promos.length}
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
              <TableColumn key="title" allowsSorting>
                Name
              </TableColumn>
              <TableColumn key="promo_code" allowsSorting>
                Promo Code
              </TableColumn>
              <TableColumn key="createdAt" allowsSorting>
                Created At
              </TableColumn>
              <TableColumn key="actions">Actions</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={<EmptyPlaceholder />}
              items={promosPaginated}
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
        title="Delete Banner"
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

export default PromosClient;
