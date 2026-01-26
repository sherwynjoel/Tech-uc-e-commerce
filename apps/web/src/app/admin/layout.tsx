import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Bell
} from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-muted/20 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10 transition-transform">
                <div className="p-6 border-b border-white/10">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center font-bold">E</div>
                        <span className="text-xl font-bold">ElectroAdmin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin">
                        <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/10 hover:text-white text-slate-300">
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/admin/products">
                        <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/10 hover:text-white text-slate-300">
                            <Package className="h-4 w-4" />
                            Products
                        </Button>
                    </Link>
                    <Link href="/admin/orders">
                        <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/10 hover:text-white text-slate-300">
                            <ShoppingCart className="h-4 w-4" />
                            Orders
                        </Button>
                    </Link>
                    <Link href="/admin/customers">
                        <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/10 hover:text-white text-slate-300">
                            <Users className="h-4 w-4" />
                            Customers
                        </Button>
                    </Link>
                    <Link href="/admin/settings">
                        <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/10 hover:text-white text-slate-300">
                            <Settings className="h-4 w-4" />
                            Settings
                        </Button>
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-red-500/20 hover:text-red-400 text-slate-300">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 flex flex-col">
                {/* Header */}
                <header className="h-16 border-b bg-background flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="font-semibold text-lg">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <Button size="icon" variant="ghost">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold cursor-pointer">
                            A
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
