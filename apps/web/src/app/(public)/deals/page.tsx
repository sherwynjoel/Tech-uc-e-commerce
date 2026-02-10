"use client";

import { useState, useEffect } from "react";
import { Zap, Timer, Tag, Percent, ArrowRight, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
}

interface DealProduct extends Product {
    discountPercent: number;
    dealPrice: number;
    endTime: number; // timestamp
}

export default function DealsPage() {
    const [deals, setDeals] = useState<DealProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDeals() {
            try {
                const res = await fetch("http://localhost:4000/products");
                if (res.ok) {
                    const products = await res.json();
                    // Transform products into deals
                    const activeDeals = products.slice(0, 8).map((p: any) => {
                        const discount = Math.floor(Math.random() * (50 - 10 + 1)) + 10; // 10-50% off
                        const originalPrice = parseFloat(p.price);
                        return {
                            ...p,
                            price: originalPrice,
                            discountPercent: discount,
                            dealPrice: originalPrice * (1 - discount / 100),
                            endTime: Date.now() + Math.random() * 86400000 // Random end time within 24h
                        };
                    });
                    setDeals(activeDeals);
                }
            } catch (e) {
                console.error("Failed to fetch deals", e);
            } finally {
                setLoading(false);
            }
        }
        fetchDeals();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Hero Header */}
            <section className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white py-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="container mx-auto max-w-6xl relative z-10 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-white/30 shadow-lg"
                    >
                        <Zap className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                        <span className="font-bold tracking-wider uppercase">Flash Sale Live</span>
                    </motion.div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-5xl md:text-7xl font-black mb-6 drop-shadow-lg"
                    >
                        MEGADEALS
                    </motion.h1>
                    <p className="text-xl md:text-2xl font-medium text-white/90 max-w-2xl mx-auto mb-8">
                        Up to <span className="font-black text-yellow-300 text-3xl">50% OFF</span> on top electronics. Limited time offers - grab them before they're gone!
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm font-bold uppercase tracking-widest">
                        <div className="bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
                            <Timer className="h-4 w-4" /> Ends in: 12h 45m 30s
                        </div>
                        <div className="bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
                            <Tag className="h-4 w-4" /> Free Shipping on Orders ₹999+
                        </div>
                    </div>
                </div>
            </section>

            {/* Deals Grid */}
            <div className="container mx-auto max-w-7xl px-4 py-12 -mt-10 relative z-20">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white rounded-2xl h-96 animate-pulse shadow-sm"></div>
                        ))}
                    </div>
                ) : deals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {deals.map((deal) => (
                            <DealCard key={deal.id} deal={deal} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900">No active deals right now.</h3>
                        <p className="text-slate-500">Check back later for new offers!</p>
                    </div>
                )}
            </div>

            {/* Newsletter / Notifications */}
            <section className="container mx-auto max-w-4xl px-4 pb-20">
                <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Never Miss a Drop</h2>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">Get notified about upcoming flash sales and exclusive discounts straight to your inbox.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <Button size="lg" className="rounded-xl px-8 font-bold bg-primary hover:bg-primary/90">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>
            </section>
        </div>
    );
}

function DealCard({ deal }: { deal: DealProduct }) {
    const timeLeft = Math.max(0, deal.endTime - Date.now());
    // Simple mock time left display logic could go here, but for static build we skip dynamic interval for simplicity or add one later.

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative flex flex-col"
        >
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                <span className="bg-red-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded shadow-sm">
                    {deal.discountPercent}% OFF
                </span>
                <span className="bg-yellow-400 text-black text-[10px] font-black uppercase px-2 py-1 rounded shadow-sm flex items-center gap-1">
                    <Timer className="h-3 w-3" /> Limited
                </span>
            </div>

            <div className="relative aspect-square bg-slate-50 p-6 group-hover:bg-slate-100 transition-colors">
                {deal.image ? (
                    <Image
                        src={deal.image.startsWith('http') ? deal.image : `http://localhost:4000${deal.image}`}
                        alt={deal.name}
                        fill
                        className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-300">No Image</div>
                )}
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs text-slate-400 font-bold uppercase mb-1">{deal.category}</div>
                <Link href={`/products/${deal.id}`} className="block mb-2">
                    <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2" title={deal.name}>{deal.name}</h3>
                </Link>

                <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-end gap-2 mb-3">
                        <div className="text-2xl font-black text-red-600">
                            ₹{deal.dealPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-sm text-slate-400 font-medium line-through mb-1">
                            ₹{deal.price.toLocaleString()}
                        </div>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4 overflow-hidden">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                        <span>Sold: {Math.floor(Math.random() * 50) + 10}%</span>
                        <span className="text-red-500">Fast Selling!</span>
                    </div>

                    <Button className="w-full rounded-xl font-bold bg-slate-900 hover:bg-primary gap-2 shadow-lg hover:shadow-primary/25">
                        <ShoppingCart className="h-4 w-4" /> Claim Deal
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
