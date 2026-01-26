"use client";

import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export function ClientCartBadge() {
    const count = useCartStore((state) => state.count());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                0
            </span>
        );
    }

    return (
        <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
            {count}
        </span>
    );
}
