"use client";

import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ClientAuthButtons() {
    const { user, logout } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="default" className="gap-2 hidden sm:flex">
                <User className="h-4 w-4" />
                <span>...</span>
            </Button>
        );
    }

    if (user) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium hidden sm:inline-block">Hi, {user.name}</span>
                {user.role === 'ADMIN' && (
                    <Link href="/admin">
                        <Button variant="outline" size="sm" className="hidden sm:flex">Admin</Button>
                    </Link>
                )}
                <Button variant="ghost" size="icon" onClick={() => logout()} title="Logout">
                    <LogOut className="h-4 w-4 text-red-500" />
                </Button>
            </div>
        );
    }

    return (
        <Link href="/login">
            <Button variant="default" className="gap-2 hidden sm:flex">
                <User className="h-4 w-4" />
                <span>Login</span>
            </Button>
        </Link>
    );
}
