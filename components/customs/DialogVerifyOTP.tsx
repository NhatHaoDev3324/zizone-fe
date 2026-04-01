import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { verifyOtp, verifyOtpForgotPassword } from "@/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";
import { PATH } from "@/config/path";
import { Minus, RefreshCcw, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import LogoTheme from "./LogoTheme";
import { useIsMobile } from "@/hooks/use-mobile";

interface DialogVerifyOTPProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
    email: string;
    resendOtp: () => void;
    type: "register" | "forgot-password";
}

export default function DialogVerifyOTP({ openDialog, setOpenDialog, email, resendOtp, type }: DialogVerifyOTPProps) {

    const [loadingVerify, setLoadingVerify] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [otp, setOtp] = useState<string>('');
    const router = useRouter();

    const isMobile = useIsMobile();

    const verifyOtpAction = async () => {
        if (type === "register") {
            return await verifyOtp(email, otp);
        } else {
            return await verifyOtpForgotPassword(email, otp);
        }
    }

    const handleVerify = async () => {
        setLoadingVerify(true)
        try {
            const res = await verifyOtpAction();
            if (res.success) {
                if (type === "register") {
                    router.push(PATH.SIGN_IN)
                    toast.success("Xác thực tài khoản thành công", {
                        description: "Vui lòng đăng nhập để tiếp tục",
                    })
                } else {
                    router.push(`${PATH.RESET_PASSWORD}?code=${res.token}`)
                    toast.success("Xác thực tài khoản thành công", {
                        description: "Vui lòng nhập mật khẩu mới",
                    })
                }
            }
        } catch (error) {
            let message = "Xác thực tài khoản thất bại. Vui lòng kiểm tra lại thông tin.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            if (!message.includes("wrong OTP.")) {
                setOpenDialog(false)
            }
            toast.error(message);
        } finally {
            setOtp("")
            setLoadingVerify(false)
        }
    }

    useEffect(() => {
        if (!openDialog) return;

        setTimeLeft(60);
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [openDialog]);

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent 
                className="sm:max-w-md pt-8 pb-4 md:pt-10 gap-0"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader className="space-y-2">
                    <div className="flex justify-center">
                        <LogoTheme className="w-16 h-auto" />
                    </div>
                    <div className="space-y-1 text-center">
                        <DialogTitle className="text-xl font-bold tracking-tight">Xác thực tài khoản</DialogTitle>
                        <DialogDescription className="text-sm px-4">
                            Chúng tôi đã gửi mã xác thực đến email của bạn. Vui lòng kiểm tra và nhập mã bên dưới.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center gap-4 mt-4">
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                        autoFocus
                    >
                        <div className="flex items-center gap-2">
                            <InputOTPGroup>
                                <InputOTPSlot index={0} className="size-10 text-lg" />
                                <InputOTPSlot index={1} className="size-10 text-lg" />
                                <InputOTPSlot index={2} className="size-10 text-lg" />
                            </InputOTPGroup>
                            <Minus />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} className="size-10 text-lg" />
                                <InputOTPSlot index={4} className="size-10 text-lg" />
                                <InputOTPSlot index={5} className="size-10 text-lg" />
                            </InputOTPGroup>
                        </div>
                    </InputOTP>

                    <div className="flex flex-col items-center gap-2 mb-2">
                        {!isMobile && (
                            timeLeft > 0 ? (
                                <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
                                    Gửi lại mã mới sau <span className="text-foreground font-bold tabular-nums">{timeLeft} giây</span>
                                </p>
                            ) : (
                                <button
                                    onClick={() => {
                                        setTimeLeft(60)
                                        resendOtp()
                                    }}
                                    className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5"
                                >
                                    <RefreshCcw className="w-3.5 h-3.5" />
                                    Gửi lại mã ngay
                                </button>
                            )
                        )}

                        <p className="text-xs text-muted-foreground italic">
                            * Mã OTP có hiệu lực trong vòng 5 phút
                        </p>
                    </div>
                </div>

                <DialogFooter className="p-2" >
                    <Button className="w-full h-10 transition-all" onClick={handleVerify} disabled={loadingVerify || otp.length < 6}>
                        {loadingVerify ? <span className="flex items-center gap-3"><Loader2 className="w-4 h-4 animate-spin" /> Đang xác thực tài khoản</span> : "Xác nhận tài khoản"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}