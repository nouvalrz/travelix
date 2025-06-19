import z from "zod";

export const CategorySchema = z.object({
  name: z.string().min(3, "Minimum of 3 characters"),
  imageUrl: z.union([
    z
      .instanceof(File, { message: "Image is required" })
      .refine((file) => file.type.startsWith("image/"), {
        message: "Must be an image",
      })
      .refine((file) => file.size <= 2 * 1024 * 1024, {
        message: "Max size is 2MB",
      }),
    z.string().url("Must be a valid URL"),
  ]),
});

export type CategoryFormType = z.infer<typeof CategorySchema>;
