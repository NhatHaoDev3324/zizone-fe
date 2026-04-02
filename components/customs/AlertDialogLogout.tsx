import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { PATH } from "@/config/path";

interface AlertDialogLogoutProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AlertDialogLogout = ({ open, setOpen }: AlertDialogLogoutProps) => {
    const { logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        setOpen(false);
        router.push(PATH.HOME);
        logout();
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent >
                <AlertDialogHeader className="text-left">
                    <AlertDialogTitle >Bạn có chắc chắn muốn đăng xuất?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này không thể hoàn tác. Bạn sẽ bị đăng xuất khỏi hệ thống Zizone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout} variant={"destructive"}>Đăng xuất</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default AlertDialogLogout;