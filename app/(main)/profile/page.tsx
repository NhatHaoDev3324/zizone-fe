"use client"
import Image from "next/image"
import { useAuthStore } from "@/store/authStore"
import { Camera, Edit, Eye, Lock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { formatDateTime } from "@/utils/formatTime"

const streakData = [
    { day: "Thứ 2", isActive: true, date: "2026-03-30" },
    { day: "Thứ 3", isActive: true, date: "2026-03-31" },
    { day: "Thứ 4", isActive: true, date: "2026-04-01" },
    { day: "Thứ 5", isActive: false, date: "2026-04-02" },
    { day: "Thứ 6", isActive: false, date: "2026-04-03" },
    { day: "Thứ 7", isActive: false, date: "2026-04-04" },
    { day: "Chủ Nhật", isActive: false, date: "2026-04-05" },
]

const Page = () => {
    const { userID, avatar, userName, email, provider, createdAt } = useAuthStore()
    return (
        <div className="min-h-full grid grid-cols-2 gap-2">
            <div className="col-span-1 rounded-xl flex flex-col gap-2">
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl">
                    <div className="relative">
                        <Image src={avatar || "/images/profile.png"} loading="eager" alt="Profile" width={60} height={60} className="rounded-full" />
                        <button className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <Camera className="w-4 h-4 text-primary-foreground" />
                        </button>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-black">{userName}</h1>
                            <button className="cursor-pointer text-black">
                                <Edit className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 bg-white rounded-xl pt-2 pb-4">
                    <span className="text-black font-semibold px-4">Thay đổi mật khẩu</span>
                    <hr className="border-border" />
                    <form action="" className="flex flex-col gap-2 px-4">
                        <div className="relative space-y-1">
                            <Label className="text-black" htmlFor="oldPassword">Mật khẩu cũ</Label>
                            <div className="flex flex-col gap-1">
                                <div className="relative">
                                    <Input type="password" id="oldPassword" className="pr-10 bg-white border-slate-200 text-black focus-visible:ring-1" />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                                        <Eye className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>
                                <p className="text-xs text-red-500">Mật khẩu cũ không chính xác</p>
                            </div>
                        </div>
                        <div className="relative space-y-1">
                            <Label className="text-black" htmlFor="newPassword">Mật khẩu mới</Label>
                            <div className="flex flex-col gap-1">
                                <div className="relative">
                                    <Input type="password" id="newPassword" className="pr-10 bg-white border-slate-200 text-black focus-visible:ring-1" />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                                        <Eye className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>
                                <p className="text-xs text-red-500">Mật khẩu mới không chính xác</p>
                            </div>
                        </div>
                        <div className="relative space-y-1">
                            <Label className="text-black" htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                            <div className="flex flex-col gap-1">
                                <div className="relative">
                                    <Input type="password" id="confirmPassword" className="pr-10 bg-white border-slate-200 text-black focus-visible:ring-1" />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                                        <Eye className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>
                                <p className="text-xs text-red-500">Xác nhận mật khẩu không chính xác</p>
                            </div>
                        </div>
                    </form>
                    <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-xl mx-4">Thay đổi</button>
                </div>
                <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-sm border border-orange-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Image src="/icon/fire.png" alt="Fire" width={48} height={48} className="object-contain" />
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 leading-tight">Streak hàng tuần</h3>
                                <p className="text-sm text-slate-500">Duy trì thói quen để nâng cao thành tích!</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-orange-500">3</span>
                                <span className="text-sm font-bold text-orange-400 uppercase tracking-wider">Ngày</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-12">
                        {streakData.map((item, index) => (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <div className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${item.isActive
                                    ? 'bg-linear-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-200'
                                    : 'bg-slate-100 border-2 border-dashed border-slate-200'
                                    }`}>
                                    {item.isActive ? (
                                        <Image src="/icon/fire.png" alt="Active" width={22} height={22} className="brightness-0 invert drop-shadow-md" />
                                    ) : (
                                        <span className="text-slate-300 font-bold text-sm tracking-tighter">{index + 1}</span>
                                    )}
                                </div>
                                <span className={`text-xs font-semibold uppercase tracking-tight ${item.isActive ? 'text-orange-600' : 'text-slate-400'}`}>
                                    {item.day}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-100 rounded-xl py-2 px-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Đang hoạt động
                        </div>
                        <button className="text-xs font-bold text-zizone-main-third-color transition-all cursor-pointer">
                            Xem lịch sử →
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
                <div className="flex flex-col gap-2 bg-white rounded-xl pt-2 pb-4">
                    <span className="text-black font-semibold px-4">Thông tin tài khoản</span>
                    <hr className="border-border" />
                    <div className="flex flex-col gap-2 px-4">
                        <Label className="text-black">Email</Label>
                        <Input type="email" id="email" value={email} disabled className="bg-white border-slate-200 text-black disabled:opacity-100 cursor-not-allowed" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 px-4">
                        <div className="flex flex-col gap-2">
                            <Label className="text-black">Tên tài khoản</Label>
                            <Input type="text" id="name" value={userName} disabled className="bg-white border-slate-200 text-black disabled:opacity-100 cursor-not-allowed" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-black">ID</Label>
                            <Input type="text" id="id" value={userID} disabled className="bg-white border-slate-200 text-black disabled:opacity-100 cursor-not-allowed" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-black">Đăng ký với</Label>
                            <Input type="text" id="reg_name" value={provider} disabled className="bg-white border-slate-200 text-black disabled:opacity-100 cursor-not-allowed" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-black">Ngày tham gia</Label>
                            <Input type="text" id="created_at" value={formatDateTime(createdAt)} disabled className="bg-white border-slate-200 text-black disabled:opacity-100 cursor-not-allowed" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 bg-white rounded-xl pt-2 pb-4">
                    <span className="text-black font-semibold px-4">Thành tích học tập</span>
                    <hr className="border-border" />
                    <div className="grid grid-cols-2 gap-3 px-4 py-2">
                        {[
                            { title: "Gấu rất rảnh", desc: "7 ngày đăng nhập liên tục", progress: 5, total: 7, color: "bg-blue-50" },
                            { title: "Gấu chăm chỉ", desc: "30 ngày đăng nhập liên tục", progress: 5, total: 30, color: "bg-orange-50" },
                            { title: "Gấu gương mẫu", desc: "3 tháng đăng nhập liên tục", progress: 5, total: 90, color: "bg-yellow-50" },
                            { title: "Gấu kiên trì", desc: "6 tháng đăng nhập liên tục", progress: 5, total: 180, color: "bg-green-50" },
                            { title: "Gấu cần cù", desc: "9 tháng đăng nhập liên tục", progress: 5, total: 270, color: "bg-green-50" },
                            { title: "Gấu máy móc", desc: "1 năm đăng nhập liên tục", progress: 5, total: 365, color: "bg-purple-50" },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col gap-3 p-2 rounded-xl border border-border transition-all group">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center border border-white shadow-sm overflow-hidden`}>
                                            <Image src={`/icon/gau.png`} alt="Icon" width={40} height={40} className="object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-800 leading-tight">{item.title}</span>
                                            <span className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.desc}</span>
                                        </div>
                                    </div>
                                    <div className="p-2 bg-white rounded-full border border-muted">
                                        <Lock className="size-4 text-muted-foreground" />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2 items-center px-2">
                                    <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-slate-100">
                                        <div
                                            className="h-full bg-linear-to-r from-orange-400 to-orange-500 transition-all duration-1000 shadow-[0_0_8px_rgba(249,95,3,0.3)]"
                                            style={{ width: `${(item.progress / item.total) * 100}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <span className="text-[10px] font-bold text-slate-400 tracking-tighter">
                                            {item.progress}/{item.total}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page