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
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
}

const AlertDialogLogout = ({ openDialog, setOpenDialog }: AlertDialogLogoutProps) => {
    const { logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        setOpenDialog(false);
        router.push(PATH.SIGN_IN);
        logout();
    };

    return (
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogContent>
                <AlertDialogHeader className="text-left">
                    <AlertDialogTitle>Bạn có chắc chắn muốn đăng xuất?</AlertDialogTitle>
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