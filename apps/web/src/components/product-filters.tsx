"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const categories = [
    "Development Boards",
    "Sensors",
    "Robotics",
    "IoT & Wireless",
    "Tools",
    "Components"
];

const priceRanges = [
    { label: "Under ₹500", min: 0, max: 500 },
    { label: "₹500 - ₹2000", min: 500, max: 2000 },
    { label: "₹2000 - ₹5000", min: 2000, max: 5000 },
    { label: "Over ₹5000", min: 5000, max: undefined },
];

export function ProductFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("category");
    const currentMin = searchParams.get("minPrice");
    const currentMax = searchParams.get("maxPrice");

    const [min, setMin] = useState(currentMin || "");
    const [max, setMax] = useState(currentMax || "");

    const updateFilter = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/products?${params.toString()}`);
    };

    const applyPrice = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (min) params.set("minPrice", min); else params.delete("minPrice");
        if (max) params.set("maxPrice", max); else params.delete("maxPrice");
        router.push(`/products?${params.toString()}`);
    };

    const clearFilters = () => {
        router.push("/products");
        setMin("");
        setMax("");
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                    {categories.map(cat => (
                        <div
                            key={cat}
                            className={`text-sm cursor-pointer hover:text-primary ${currentCategory === cat ? "font-bold text-primary" : "text-muted-foreground"}`}
                            onClick={() => updateFilter("category", currentCategory === cat ? null : cat)}
                        >
                            {cat}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-2 mb-4">
                    {priceRanges.map(range => (
                        <div
                            key={range.label}
                            className="text-sm cursor-pointer text-muted-foreground hover:text-primary"
                            onClick={() => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.set("minPrice", range.min.toString());
                                if (range.max) params.set("maxPrice", range.max.toString());
                                else params.delete("maxPrice");
                                router.push(`/products?${params.toString()}`);
                            }}
                        >
                            {range.label}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 items-center mb-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={min}
                        onChange={e => setMin(e.target.value)}
                        className="w-full border rounded p-1 text-sm"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={max}
                        onChange={e => setMax(e.target.value)}
                        className="w-full border rounded p-1 text-sm"
                    />
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={applyPrice}>Apply</Button>
            </div>

            {(currentCategory || currentMin || currentMax) && (
                <Button variant="secondary" size="sm" className="w-full" onClick={clearFilters}>
                    Clear Filters
                </Button>
            )}
        </div>
    );
}
