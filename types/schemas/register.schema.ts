import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(100, { message: "Name maximum characters is 100" }),
    email: z.string().email({ message: "Email format is invalid" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    passwordRepeat: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["user", "admin"]).default("user").optional(),
    phoneNumber: z
      .string()
      .min(9)
      .max(15)
      .regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }),
    profilePictureFile: z
      .instanceof(File)
      .refine((file) => file.type.startsWith("image/"), {
        message: "Must be an image",
      })
      .refine((file) => file.size <= 2 * 1024 * 1024, {
        message: "Max size is 2MB",
      })
      .optional(),
    profilePictureUrl: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords do not match",
    path: ["passwordRepeat"],
  });

export type RegisterType = z.infer<typeof RegisterSchema>;
