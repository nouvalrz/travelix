import { useState } from "react";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

import { fetchUploadImage } from "../data/client/uploadImage";
import { fetchUpdatePaymentProof } from "../data/client/transactions";

export const useUplaodPaymentProof = (transactionId: string) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const handleUploadPaymentProof = async () => {
    if (!image) return;

    setLoading(true);

    try {
      const { url } = await fetchUploadImage(image);

      const response = await fetchUpdatePaymentProof(transactionId, url);

      addToast({
        color: "default",
        title: "Success",
        description: "Successfully upload payment proof image",
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

    setLoading(false);
  };

  return { image, setImage, handleUploadPaymentProof, loading };
};
