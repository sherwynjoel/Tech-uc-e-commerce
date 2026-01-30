"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductActionsProps {
    productId: number;
}

export function ProductActions({ productId }: ProductActionsProps) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await fetch(`http://localhost:4000/products/${productId}`, { method: "DELETE" });
            router.refresh();
        } catch (e) {
            alert("Failed to delete");
        }
    };

    return (
        <div className="flex justify-end gap-2">
            <Link href={`/admin/products/${productId}/edit`}>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600">
                    <Edit className="h-4 w-4" />
                </Button>
            </Link>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    )
}
