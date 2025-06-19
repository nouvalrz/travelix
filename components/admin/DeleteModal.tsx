"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "@heroui/modal";
import React, { useState } from "react";

type DeleteModalProps = {
  modalProps: Omit<ModalProps, "children">;
  title: string;
  children: React.ReactNode;
  onDelete: () => Promise<void>;
};

const DeleteModal = ({
  modalProps,
  children,
  title,
  onDelete,
}: DeleteModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);

    await onDelete();

    setLoading(false);
  };

  return (
    <Modal {...modalProps}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="danger" isLoading={loading} onPress={handleDelete}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
