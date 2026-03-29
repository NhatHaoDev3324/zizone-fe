"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { PATH } from "@/config/path";
import LogoTheme from "../customs/LogoTheme";
import DialogVerifyOTP from "../customs/DialogVerifyOTP";
import { forgotPassword } from "@/api/auth";
import axios from "axios";
import { toast } from "sonner";

interface ForgotPasswordError {
    email?: string;
}

export default function FormForgotPassword() {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<ForgotPasswordError>({});
    const [openDialogVerify, setOpenDialogVerify] = useState<boolean>(false);

    const handleForgotPassword = async () => {
        const newErrors: ForgotPasswordError = {};

        if (!email) {
            newErrors.email = "Email không được để trống";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setLoading(true)

        try {
            const res = await forgotPassword(email);
            if (res.success) {
                setOpenDialogVerify(true)
            }
        } catch (error) {
            let message = "Gửi yêu cầu thất bại. Vui lòng kiểm tra lại thông tin.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`flex flex-col gap-4 min-w-xs md:min-w-sm`}>
            <div className={`flex flex-col gap-4 items-center text-center`}>
                <LogoTheme />
                <p className="text-foreground text-sm max-w-xs">
                    Nhập email của bạn để nhận mã OTP xác thực đặt lại mật khẩu Zizone
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="grid">
                    <Label htmlFor="email" className={"mb-2"}>Email <span className="text-red-500">*</span></Label>
                    <Input
                        id="email"
                        type="text"
                        placeholder="Nhập email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        onFocus={() => {
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        className={`w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ${errors.email ? 'border-red-500 focus-visible:border-red-500' : 'focus-visible:border-input'}`}
                    />
                    <div className={"h-4"}>{errors.email && <small className="text-red-500">{errors.email}</small>}</div>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                    <Button className="w-full" onClick={handleForgotPassword} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Gửi yêu cầu"}
                    </Button>
                </div>
            </div>
            <div className={`text-center text-sm `}>
                Quay lại đăng nhập?{" "}
                <Link href={PATH.SIGN_IN} className="underline underline-offset-4">
                    Đăng nhập
                </Link>
            </div>
            <DialogVerifyOTP openDialog={openDialogVerify} setOpenDialog={setOpenDialogVerify} email={email} resendOtp={handleForgotPassword} type="forgot-password" />
        </div>
    )
}