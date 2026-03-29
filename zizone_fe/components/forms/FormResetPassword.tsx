"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { PATH } from "@/config/path";
import LogoTheme from "../customs/LogoTheme";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { resetPassword } from "@/api/auth";
import axios from "axios";

interface ResetPasswordError {
    password?: string;
    confirmPassword?: string;
}

export default function FormResetPassword() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<ResetPasswordError>({});
    const [showPass, setShowPass] = useState<{
        password: boolean;
        confirmPassword: boolean;
    }>({
        password: false,
        confirmPassword: false
    });
    const [loading, setLoading] = useState<boolean>(false);

    const code = searchParams.get("code");

    const handleResetPassword = async () => {
        if (!code) {
            toast.error("Mã xác thực không hợp lệ");
            return;
        }

        const newErrors: ResetPasswordError = {};

        if (!password) {
            newErrors.password = "Mật khẩu không được để trống";
        } else if (password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống";
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = "Xác nhận mật khẩu không khớp";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }


        setErrors({});
        setLoading(true)

        try {
            const res = await resetPassword(password, code);
            if (res.success) {
                toast.success("Đặt lại mật khẩu thành công");
                router.replace(PATH.SIGN_IN);
            }
        } catch (error) {
            let message = "Đặt lại mật khẩu thất bại. Vui lòng kiểm tra lại thông tin.";
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
                    Đặt lại mật khẩu để tiếp tục học tiếng Trung cùng Zizone
                </p>
            </div>
            <div className="flex flex-col gap-2">

                <div className="grid">
                    <div className="flex items-center mb-2">
                        <Label htmlFor="password" >Mật khẩu <span className="text-red-500">*</span></Label>
                    </div>
                    <div className={"relative w-full"}>
                        <Input
                            id="password"
                            type={showPass.password ? "text" : "password"}
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                            }}
                            onFocus={() => {
                                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                            }}
                            className={`w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ${errors.password ? 'border-red-500 focus-visible:border-red-500' : 'focus-visible:border-input'}`}
                        />
                        <button onClick={() => setShowPass((prev) => ({ ...prev, password: !prev.password }))}
                            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground cursor-pointer">
                            {showPass.password ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>

                    <div className={"h-4"}>{errors.password && <small className="text-red-500">{errors.password}</small>}</div>
                </div>

                <div className="grid">
                    <div className="flex items-center mb-2">
                        <Label htmlFor="confirmPassword" >Xác nhận mật khẩu <span className="text-red-500">*</span></Label>
                    </div>
                    <div className={"relative w-full"}>
                        <Input
                            id="confirmPassword"
                            type={showPass.confirmPassword ? "text" : "password"}
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                            }}
                            onFocus={() => {
                                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                            }}
                            className={`w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ${errors.confirmPassword ? 'border-red-500 focus-visible:border-red-500' : 'focus-visible:border-input'}`}
                        />
                        <button onClick={() => setShowPass((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground cursor-pointer">
                            {showPass.confirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>

                    <div className={"h-4"}>{errors.confirmPassword && <small className="text-red-500">{errors.confirmPassword}</small>}</div>
                </div>
                <p className="text-xs text-muted-foreground italic text-center">
                    * Đặt lại mật khẩu có hiệu lực trong 5 phút
                </p>
                <Button className="w-full mt-1" onClick={handleResetPassword} disabled={loading}>
                    {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Đặt lại mật khẩu"}
                </Button>
            </div>
            <div className={`text-center text-sm`}>
                Quay lại đăng nhập?{" "}
                <Link href={PATH.SIGN_IN} className="underline underline-offset-4">
                    Đăng nhập
                </Link>
            </div>
        </div>
    )
}

