import { z } from "zod";

export const createUserSchema = z.object({
    fullName: z.string().min(1, "Họ và tên không được để trống"),
    email: z.string().email("Email không hợp lệ"),
    role: z.enum(["user", "admin"]),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
