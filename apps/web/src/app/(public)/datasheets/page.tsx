"use client";

import { useState, useEffect } from "react";
import { FileText, Download, Search, Filter, Cpu, Database, Wifi, Box, Wrench, Battery, ArrowRight, ExternalLink } from "lucide-react"; // Using Lucide icons
import { Button } from "@/components/ui/button"; // Assuming UI components exist
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    datasheet?: string;
    image?: string;
    specs?: string; // JSON string
}

const mockDatasheets: Product[] = [
    { id: 101, name: "ESP32-WROOM-32", description: "Wi-Fi + Bluetooth LE Module", category: "IoT & Wireless", datasheet: "/sample-datasheet.pdf" },
    { id: 102, name: "Arduino Uno R3", description: "ATmega328P Development Board", category: "Development Boards", datasheet: "/sample-datasheet.pdf" },
    { id: 103, name: "LM35 Temperature Sensor", description: "Precision Centigrade Temperature Sensor", category: "Sensors", datasheet: "/sample-datasheet.pdf" },
    { id: 104, name: "SG90 Micro Servo", description: "9g Micro Servo Motor", category: "Robotics", datasheet: "/sample-datasheet.pdf" },
    { id: 105, name: "18650 Li-ion Battery", description: "3.7V 2600mAh Rechargeable Cell", category: "Battery & Power", datasheet: "/sample-datasheet.pdf" },
];

export default function DatasheetsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    // Fetch products
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("http://localhost:4000/products");
                if (res.ok) {
                    const data = await res.json();
                    // Filter products that have a datasheet
                    const withDatasheets = data.filter((p: Product) => p.datasheet);

                    // Combine with mock if api is empty or just use mock for demo if needed
                    // For now, if we have real data, use it. If completely empty, show mock.
                    if (withDatasheets.length > 0) {
                        setProducts(withDatasheets);
                    } else {
                        console.log("No datasheets found in API, using mock data for demonstration.");
                        setProducts(mockDatasheets);
                    }
                } else {
                    setProducts(mockDatasheets); // Fallback
                }
            } catch (e) {
                console.error("Failed to fetch products", e);
                setProducts(mockDatasheets); // Fallback
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Header */}
            <section className="bg-slate-900 text-white pt-20 pb-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="container mx-auto max-w-5xl relative z-10 text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold border border-primary/30"
                    >
                        <FileText className="h-4 w-4" /> Technical Resources
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight"
                    >
                        Datasheets & Documentation
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto"
                    >
                        Access technical specifications, pinout diagrams, and user manuals for all our electronic components.
                    </motion.p>
                </div>
            </section>

            <div className="container mx-auto max-w-6xl px-4 -mt-12 relative z-20 pb-20">
                {/* Search & Filter Bar */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col md:flex-row gap-4 items-center mb-8">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search by part number (e.g., ESP32, LM35)..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-0 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`
                            px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border
                            ${selectedCategory === cat
                                        ? "bg-slate-900 text-white border-slate-900 shadow-md"
                                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                    }
                        `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 gap-4">
                    {loading ? (
                        <div className="text-center py-20 text-slate-400">Loading resources...</div>
                    ) : filteredProducts.length > 0 ? (
                        <>
                            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100/50 rounded-lg border border-dashed border-slate-200 mb-2">
                                <div className="col-span-5">Component</div>
                                <div className="col-span-3">Category</div>
                                <div className="col-span-2">Specs</div>
                                <div className="col-span-2 text-right">Action</div>
                            </div>

                            <div className="space-y-4">
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col md:grid md:grid-cols-12 gap-4 items-center"
                                    >
                                        {/* Component Info */}
                                        <div className="col-span-5 flex items-center gap-4 w-full">
                                            <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 flex-shrink-0">
                                                {/* Icon based on category (simple logic) */}
                                                {product.category.includes("Sensor") ? <Wifi className="h-6 w-6" /> :
                                                    product.category.includes("Board") ? <Cpu className="h-6 w-6" /> :
                                                        product.category.includes("Battery") ? <Battery className="h-6 w-6" /> :
                                                            <Box className="h-6 w-6" />
                                                }
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{product.name}</h3>
                                                <p className="text-sm text-slate-500 line-clamp-1">{product.description || "High-performance electronic component"}</p>
                                            </div>
                                        </div>

                                        {/* Category */}
                                        <div className="col-span-3 w-full md:w-auto">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                                {product.category}
                                            </span>
                                        </div>

                                        {/* Specs / Status */}
                                        <div className="col-span-2 w-full md:w-auto">
                                            <span className="text-sm text-slate-500 flex items-center gap-1">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                PDF Available
                                            </span>
                                        </div>

                                        {/* Action */}
                                        <div className="col-span-2 w-full md:w-auto flex justify-end">
                                            <Button size="sm" className="gap-2 bg-slate-900 hover:bg-primary text-white w-full md:w-auto shadow-md">
                                                <Download className="h-3.5 w-3.5" />
                                                <span className="hidden lg:inline">Datasheet</span>
                                                <span className="lg:hidden">Download</span>
                                            </Button>
                                            {/* Link to actual datasheet if exists */}
                                            {/* 
                                    <a href={product.datasheet} target="_blank" rel="noopener noreferrer" className="...">
                                        ...
                                    </a>
                                    */}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <FileText className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">No documents found</h3>
                            <p className="text-slate-500">We couldn't find any datasheets matching "{searchQuery}".</p>
                            <Button
                                variant="link"
                                onClick={() => { setSearchQuery(""); setSelectedCategory("All") }}
                                className="mt-2 text-primary"
                            >
                                Clear filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
