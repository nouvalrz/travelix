"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { fetchLogout } from "@/lib/data/client/logout";
import { AppError } from "@/lib/appError";

const LogoutModal = (props: Omit<ModalProps, "children">) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const logout = async () => {
    setLoading(true);
    try {
      await fetchLogout();
      props.onOpenChange!(false);
      addToast({
        color: "success",
        title: "Logout Success",
      });
      router.refresh();
    } catch (error) {
      if (error instanceof AppError) {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
        });
      }
    }
    setLoading(false);
  };

  return (
    <Modal {...props}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-base">
              Logout
            </ModalHeader>
            <ModalBody>
              <p className="text-sm">Are you sure want to logout?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" isLoading={loading} onPress={logout}>
                Logout
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
