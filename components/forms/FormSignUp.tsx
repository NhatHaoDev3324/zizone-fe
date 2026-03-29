"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { PATH } from "@/config/path";
import { toast } from "sonner";
import axios from "axios";
import DialogVerifyOTP from "../customs/DialogVerifyOTP";
import { registerByEmail } from "@/api/auth";
import LogoTheme from "../customs/LogoTheme";

interface SignUpError {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export default function FormSignUp() {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<SignUpError>({});
    const [showPass, setShowPass] = useState<{
        password: boolean;
        confirmPassword: boolean;
    }>({
        password: false,
        confirmPassword: false
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [openDialogVerify, setOpenDialogVerify] = useState<boolean>(false);

    async function handleSignUp() {
        const newErrors: SignUpError = {};

        if (!fullName) {
            newErrors.fullName = "Tên tài khoản không được để trống";
        }

        if (!email) {
            newErrors.email = "Email không được để trống";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email không hợp lệ";
        }

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
            const res = await registerByEmail(fullName, email, password);
            if (res.success) {
                setOpenDialogVerify(true)
            }
        } catch (error) {
            let message = "Đăng ký tài khoản thất bại. Vui lòng kiểm tra lại thông tin.";
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
                    Tham gia Zizone và khám phá cách học tiếng Trung hiệu quả mỗi ngày
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="grid">
                    <Label htmlFor="fullName" className={"mb-2"}>Tên tài khoản <span className="text-red-500">*</span></Label>
                    <Input
                        id="fullName"
                        type="text"
                        placeholder="Nhập tên tài khoản"
                        value={fullName}
                        onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        onFocus={() => {
                            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        className={`w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ${errors.fullName ? 'border-red-500 focus-visible:border-red-500' : 'focus-visible:border-input'}`}
                    />
                    <div className={"h-4"}>{errors.fullName && <small className="text-red-500">{errors.fullName}</small>}</div>
                </div>


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

                <div className="flex flex-col gap-3 mt-2">
                    <Button className="w-full" onClick={handleSignUp} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Đăng ký"}
                    </Button>
                </div>
            </div>
            <div className={`text-center text-sm `}>
                Đã có tài khoản?{" "}
                <Link href={PATH.SIGN_IN} className="underline underline-offset-4">
                    Đăng nhập
                </Link>
            </div>

            <DialogVerifyOTP openDialog={openDialogVerify} setOpenDialog={setOpenDialogVerify} email={email} resendOtp={handleSignUp} type="register" />

        </div>
    )
}
