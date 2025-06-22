import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.union([z.literal("admin"), z.literal("user")]),
  profilePictureUrl: z.union([
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
  phoneNumber: z.string(),
});

export type UserFormType = z.infer<typeof UserSchema>;
