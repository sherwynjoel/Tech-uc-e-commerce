"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Menu, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientCartBadge } from "@/components/client-cart-badge";
import { ClientAuthButtons } from "@/components/client-auth-buttons";

const categories = [
    "Electronic Components",
    "Sensors",
    "IoT & Wireless",
    "Robotics",
    "Development Boards",
    "Tools & Equipment",
    "Battery & Power",
    "Wire & Cables",
    "3D Printing"
];

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
            {/* Top Bar - Contact & Support */}
            <div className="bg-primary text-primary-foreground py-1 text-xs">
                <div className="container mx-auto flex justify-between px-4">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" /> +91 98765 43210
                        </span>
                        <span>support@electrostore.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/track-order" className="hover:underline">Track Order</Link>
                        <Link href="/help" className="hover:underline">Help Center</Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">E</div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                            ElectroStore
                        </span>
                    </Link>

                    {/* Search Bar - Center */}
                    <form action="/search" className="flex-1 max-w-2xl hidden md:flex items-center relative">
                        <input
                            type="text"
                            name="q"
                            placeholder="Search for components, parts, or brands..."
                            className="w-full pl-4 pr-12 py-2.5 rounded-l-md border border-r-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <Button type="submit" size="icon" className="rounded-l-none rounded-r-md px-6">
                            <Search className="h-5 w-5" />
                        </Button>
                    </form>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-auto">
                        <Button variant="ghost" size="icon" className="hidden sm:flex">
                            <Heart className="h-5 w-5" />
                        </Button>

                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="relative">
                                <ShoppingCart className="h-5 w-5" />
                                <ClientCartBadge />
                            </Button>
                        </Link>

                        <ClientAuthButtons />

                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Category Navigation - Mega Menu Style */}
            <div className="bg-muted/50 border-t hidden md:block">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center gap-8 overflow-x-auto no-scrollbar">
                        <Button variant="ghost" className="font-semibold px-0 hover:bg-transparent text-primary">
                            All Categories <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                        {categories.map((cat) => (
                            <Link
                                key={cat}
                                href={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                                className="text-sm font-medium hover:text-primary whitespace-nowrap py-3 border-b-2 border-transparent hover:border-primary transition-all"
                            >
                                {cat}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}
