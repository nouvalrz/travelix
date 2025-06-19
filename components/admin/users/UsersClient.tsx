"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SortDescriptor } from "@react-types/shared";
import { Button } from "@heroui/button";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { Image } from "@heroui/image";

import { User, UserRole } from "@/types/user.type";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import RoleChip from "@/components/RoleChip";

const roleValues: (UserRole | "")[] = ["", "admin", "user"];

const UsersClient = ({ users }: { users: User[] }) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [roleSelected, setRoleSelected] = useState<UserRole | "">("");
  const rowsPerPage = 15;

  const [currentPage, setCurrentPage] = useState(1);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });

  const usersRoleFiltered = useMemo(() => {
    return users.filter((user) =>
      !roleSelected ? true : user.role === roleSelected
    );
  }, [users, roleSelected]);

  const usersSearched = useMemo(() => {
    return usersRoleFiltered.filter((user) =>
      user.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, usersRoleFiltered]);

  const pages = Math.ceil(usersSearched.length / rowsPerPage) || 1;

  const usersSorted = useMemo(() => {
    const column = sortDescriptor.column;

    return [...usersSearched].sort((a, b) => {
      let aValue: string | number = a[column as keyof User] as string;
      let bValue: string | number = b[column as keyof User] as string;

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
  }, [sortDescriptor, usersSearched]);

  const usersPaginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return usersSorted.slice(start, end);
  }, [currentPage, usersSorted]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, sortDescriptor.direction, roleSelected]);

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "profilePictureUrl":
        return (
          <Image
            alt={cellValue}
            className="w-16 h-16 object-cover rounded-full"
            classNames={{
              wrapper: "bg-no-repeat bg-cover bg-center rounded-full",
            }}
            fallbackSrc="/images/fallback-image.jpg"
            src={cellValue || "error"}
          />
        );

      case "role":
        const role = cellValue as UserRole;

        return <RoleChip role={role} />;

      case "actions":
        return (
          <div className="flex gap-2 items-center">
            <Button
              isIconOnly
              as={Link}
              color="primary"
              href={"/admin/transactions/" + user.id}
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
        return cellValue?.toString();
    }
  }, []);

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3">
        <Input
          isClearable
          placeholder="Search by name..."
          value={searchKeyword}
          onValueChange={setSearchKeyword}
        />

        <div className="max-w-[240px] w-full">
          <Select
            classNames={{ value: "capitalize" }}
            maxListboxHeight={600}
            selectedKeys={new Set([roleSelected])}
            onSelectionChange={(value) => {
              setRoleSelected(value.currentKey as UserRole | "");
            }}
          >
            {roleValues.map((role) => (
              <SelectItem key={role} textValue={role || "All role"}>
                <RoleChip role={role} />
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <Table
        className="mt-4"
        sortDescriptor={sortDescriptor}
        topContent={
          <div className="flex justify-between w-full items-center">
            <p className="text-sm font-medium">Total users : {users.length}</p>
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
          <TableColumn key="profilePictureUrl">Profile</TableColumn>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="email">Email</TableColumn>
          <TableColumn key="role">Role</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={<EmptyPlaceholder />} items={usersPaginated}>
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

export default UsersClient;
