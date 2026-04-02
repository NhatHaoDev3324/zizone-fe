import { redirect } from "next/navigation";
import { PATH } from "@/config/path";

const Page = () => {
    redirect(PATH.ADMIN_DASHBOARD);
};

export default Page;