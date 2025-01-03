import { z } from "zod";

export const ConfirmFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  confirmationCode: z
    .string()
    .length(10, { message: "Length of confirmation code must be 8" }),
});
