import { z } from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Mật khẩu cũ không được để trống"),
  newPassword: z
    .string()
    .min(6, `Mật khẩu mới phải có ít nhất 6 ký tự`),
  confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu mới"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
}).refine((data) => data.oldPassword !== data.newPassword, {
  message: "Mật khẩu mới không được giống mật khẩu cũ",
  path: ["newPassword"],
});

export const updateProfileSchema = z.object({
  userName: z.string().min(3, "Tên tài khoản phải có ít nhất 3 ký tự").max(50, "Tên tài khoản không được vượt quá 50 ký tự"),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
