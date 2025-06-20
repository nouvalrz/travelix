import z from "zod";

export const PromoSchema = z.object({
  title: z.string().min(3, "Minimum of 3 characters"),
  description: z
    .string()
    .min(5, "Minimum of 5 characters")
    .max(100, "Maximum of 100 characters"),
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
  terms_condition: z.string().min(5, "Minimum of 5 characters"),
  promo_code: z.string().min(4, "Minimum of 4 characters"),
  promo_discount_price: z.number().min(1, "Minimum of price is 1"),
  minimum_claim_price: z.number().min(0, "Minimum of price is 0"),
});

export type PromoFormType = z.infer<typeof PromoSchema>;
