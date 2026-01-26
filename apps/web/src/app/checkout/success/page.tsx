"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Package } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    return (
        <div className="text-center space-y-6 max-w-md w-full">
            <div className="flex justify-center">
                <CheckCircle className="h-24 w-24 text-green-500" />
            </div>

            <h1 className="text-4xl font-bold text-foreground">Order Confirmed!</h1>

            <p className="text-lg text-muted-foreground">
                Thank you for your purchase. We have received your order and are getting it ready for shipment.
            </p>

            <div className="bg-card p-6 rounded-xl border space-y-2">
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Order ID</div>
                <div className="text-3xl font-mono font-bold">#{orderId?.toString().padStart(6, '0')}</div>
            </div>

            <div className="flex flex-col gap-3">
                <Link href="/">
                    <Button size="lg" className="w-full">Continue Shopping</Button>
                </Link>
                <Link href="/track-order">
                    <Button variant="outline" className="w-full gap-2 block bg-white border border-gray-300">
                        <Package className="h-4 w-4" /> Track Order
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/10 p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
