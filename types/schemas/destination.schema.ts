import z from "zod";

export const DestinationsSchema = z
  .object({
    imageUrls: z.array(
      z.union([
        z
          .instanceof(File, { message: "Image is required" })
          .refine((file) => file.type.startsWith("image/"), {
            message: "Must be an image",
          })
          .refine((file) => file.size <= 2 * 1024 * 1024, {
            message: "Max size is 2MB",
          }),
        z.string().url("Must be a valid URL"),
      ])
    ),
    categoryId: z.string().nonempty(),
    title: z.string().min(3, "Minimum characters is 3"),
    description: z.string().min(10, "Minimum characters is 10"),
    price: z.number(),
    price_discount: z
      .number()
      .min(0, "Minimum price discount is IDR 0")
      .optional(),
    rating: z
      .number()
      .min(1, "Rating cannot be less than 1")
      .max(5, "Rating cannot be more than 5"),
    total_reviews: z.number().min(1, "Total reviews at least 1"),
    facilities: z.string().min(5, "Minimum of 5 characters"),
    address: z.string().nonempty(),
    province: z.string().nonempty(),
    city: z.string().nonempty(),
    location_maps: z.string().nonempty(),
  })
  .superRefine((data, ctx) => {
    if (
      typeof data.price_discount === "number" &&
      data.price_discount >= data.price
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Discount price must be less than the regular price",
        path: ["price_discount"],
      });
    }
  });

export type DestinationFormType = z.infer<typeof DestinationsSchema>;
