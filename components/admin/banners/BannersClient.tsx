"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SortDescriptor } from "@react-types/shared";
import { Button } from "@heroui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
import { Image } from "@heroui/image";
import Link from "next/link";
import { useDisclosure } from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

import DeleteModal from "../DeleteModal";

import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { formatDateTime } from "@/lib/formatDate";
import { Banner } from "@/types/banner.type";
import { fetchDeleteBanner } from "@/lib/data/client/banners";

const BannersClient = ({ banners }: { banners: Banner[] }) => {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedDelete, setSelectedDelete] = useState<Banner | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const rowsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });

  const bannersSearched = useMemo(() => {
    return banners.filter((banner) =>
      banner.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, banners]);

  const pages = Math.ceil(bannersSearched.length / rowsPerPage) || 1;

  const bannersSorted = useMemo(() => {
    const column = sortDescriptor.column;

    return [...bannersSearched].sort((a, b) => {
      let aValue: string | number = a[column as keyof Banner];
      let bValue: string | number = b[column as keyof Banner];

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
  }, [sortDescriptor, bannersSearched]);

  const bannersPaginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return bannersSorted.slice(start, end);
  }, [currentPage, bannersSorted]);

  const handleDeleteBanner = useCallback(async () => {
    try {
      await fetchDeleteBanner(selectedDelete!.id);
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

  const handleOpenModalDelete = (banner: Banner) => {
    setSelectedDelete(banner);
    onOpen();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, sortDescriptor.direction]);

  const renderCell = useCallback((banner: Banner, columnKey: React.Key) => {
    const cellValue = banner[columnKey as keyof Banner];

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
              href={"/admin/banners/" + banner.id}
              variant="flat"
            >
              <Pencil className="size-5" />
            </Button>
            <Button
              isIconOnly
              color="danger"
              variant="flat"
              onPress={() => handleOpenModalDelete(banner)}
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
          href="/admin/banners/add"
          startContent={<Plus className="size-12" />}
        >
          Add Banner
        </Button>
      </div>
      <Table
        className="mt-4"
        sortDescriptor={sortDescriptor}
        topContent={
          <div className="flex justify-between w-full items-center">
            <p className="text-sm font-medium">
              Total Banners : {banners.length}
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
        <TableBody emptyContent={<EmptyPlaceholder />} items={bannersPaginated}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DeleteModal
        modalProps={{ isOpen: isOpen, onOpenChange: onOpenChange }}
        title="Delete Banner"
        onDelete={handleDeleteBanner}
      >
        <p>
          Are you sure want to delete{" "}
          <span className="text-primary">{selectedDelete?.name}</span>?
        </p>
      </DeleteModal>
    </div>
  );
};

export default BannersClient;
