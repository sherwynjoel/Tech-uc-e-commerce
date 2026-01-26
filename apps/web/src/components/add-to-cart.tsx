"use client";

import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
// import { toast } from "sonner";

export function AddToCartButton({ product, size = "default" }: { product: any, size?: "default" | "sm" | "lg" | "icon" }) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        // Simple feedback since we don't have toast set up yet
        // alert("Added to cart!"); 
        // Actually let's just animate or rely on cart badge update
    };

    if (size === "icon") {
        return (
            <Button size="icon" className="rounded-full h-8 w-8" onClick={handleAdd}>
                <ShoppingCart className="h-4 w-4" />
            </Button>
        );
    }

    return (
        <Button size={size} className="flex-1 gap-2 text-lg" onClick={handleAdd}>
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
        </Button>
    );
}
