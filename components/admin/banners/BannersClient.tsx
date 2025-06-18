"use client";

import React, { useCallback, useMemo, useState } from "react";
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

import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { formatDateTime } from "@/lib/formatDate";
import { Banner } from "@/types/banner.type";

const BannersClient = ({ banners }: { banners: Banner[] }) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
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

  const bannersPaginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return bannersSearched.slice(start, end);
  }, [currentPage, bannersSearched]);

  const bannersSorted = useMemo(() => {
    const column = sortDescriptor.column;

    return bannersPaginated.sort((a, b) => {
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
  }, [sortDescriptor, bannersPaginated]);

  const renderCell = useCallback((banner: Banner, columnKey: React.Key) => {
    const cellValue = banner[columnKey as keyof Banner];

    switch (columnKey) {
      case "imageUrl":
        return (
          <Image
            alt={cellValue}
            className="w-24 h-24 object-cover"
            src={cellValue}
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
              href={"/admin/categories/" + banner.id}
              variant="flat"
            >
              <Pencil className="size-5" />
            </Button>
            <Button isIconOnly color="danger" variant="flat">
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
        <Button color="primary" startContent={<Plus className="size-12" />}>
          Add Category
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
        <TableBody emptyContent={<EmptyPlaceholder />} items={bannersSorted}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BannersClient;
