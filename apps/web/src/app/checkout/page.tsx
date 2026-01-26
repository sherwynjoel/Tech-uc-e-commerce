"use client";

import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

import { useAuthStore } from "@/lib/auth-store";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCartStore();
    const { user } = useAuthStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        paymentMethod: "cod" // Default to Cash on Delivery
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert("Please login to place an order");
            router.push("/login");
            return;
        }

        setLoading(true);

        const orderData = {
            items: items.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            })),
            total: total(),
            userId: user.id, // Real user ID
            address: {
                street: formData.address,
                city: formData.city,
                zip: formData.zip
            }
        };

        try {
            const res = await fetch("http://localhost:4000/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            if (res.ok) {
                const order = await res.json();
                clearCart();
                router.push(`/checkout/success?orderId=${order.id}`);
            } else {
                const err = await res.json();
                alert(`Order Failed: ${err.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to place order. Check network connection.");
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <Link href="/" className="text-primary mt-4 hover:underline">Continue Shopping</Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-muted/10 pb-20">
            <div className="container mx-auto px-4 py-8">
                <Link href="/cart" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
                    <ArrowLeft className="h-4 w-4" /> Back to Cart
                </Link>

                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Form */}
                    <form onSubmit={handlePlaceOrder} className="space-y-8">
                        <div className="bg-card p-6 rounded-xl border shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">First Name</label>
                                    <input required name="firstName" className="w-full border rounded-md p-2 bg-background" onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Last Name</label>
                                    <input required name="lastName" className="w-full border rounded-md p-2 bg-background" onChange={handleChange} />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-sm font-medium mb-1 block">Email Address</label>
                                    <input required name="email" type="email" className="w-full border rounded-md p-2 bg-background" onChange={handleChange} />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-sm font-medium mb-1 block">Street Address</label>
                                    <input required name="address" className="w-full border rounded-md p-2 bg-background" onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">City</label>
                                    <input required name="city" className="w-full border rounded-md p-2 bg-background" onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">ZIP Code</label>
                                    <input required name="zip" className="w-full border rounded-md p-2 bg-background" onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-card p-6 rounded-xl border shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                                    <input type="radio" name="paymentMethod" value="card" disabled />
                                    <span className="font-medium text-muted-foreground">Credit/Debit Card (Coming Soon)</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer bg-primary/5 ring-1 ring-primary/20">
                                    <input type="radio" name="paymentMethod" value="cod" defaultChecked />
                                    <span className="font-medium">Cash on Delivery (COD)</span>
                                </label>
                            </div>
                        </div>

                        <Button type="submit" size="lg" className="w-full text-lg" disabled={loading}>
                            {loading ? "Processing..." : `Place Order ($${(total() * 1.18).toFixed(2)})`}
                        </Button>
                    </form>

                    {/* Right: Order Summary */}
                    <div>
                        <div className="bg-card p-6 rounded-xl border shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold mb-4">Your Order</h2>
                            <div className="divide-y max-h-80 overflow-y-auto pr-2 mb-4">
                                {items.map((item) => (
                                    <div key={item.id} className="py-3 flex gap-3">
                                        <div className="relative h-12 w-12 bg-white border rounded flex-shrink-0">
                                            {item.image && <Image src={item.image} alt={item.name} fill className="object-contain p-1" />}
                                            <span className="absolute -top-2 -right-2 bg-slate-700 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium truncate">{item.name}</div>
                                            <div className="text-sm text-muted-foreground">${item.price} each</div>
                                        </div>
                                        <div className="font-bold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-4 border-t">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${total().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax (18%)</span>
                                    <span>${(total() * 0.18).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-primary">${(total() * 1.18).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
