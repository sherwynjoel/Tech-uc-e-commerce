import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "lucide-react"; // Wait, Badge is usually a component but I'll use simple span for now

async function getOrders() {
    try {
        const res = await fetch("http://localhost:4000/orders", { cache: "no-store" });
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        return [];
    }
}

export default async function AdminOrdersPage() {
    const orders = await getOrders();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
            </div>

            <div className="border rounded-md bg-card">
                {orders.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">No orders found.</div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted text-muted-foreground border-b">
                            <tr>
                                <th className="p-4 font-medium">Order ID</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Customer</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Total</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {orders.map((order: any) => (
                                <tr key={order.id} className="hover:bg-muted/50">
                                    <td className="p-4 font-medium">#{order.id.toString().padStart(5, '0')}</td>
                                    <td className="p-4 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4">{order.user?.email || "Guest"}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                            order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 font-medium">₹{Number(order.total).toFixed(2)}</td>
                                    <td className="p-4 text-right">
                                        <Link href={`/admin/orders/${order.id}`}>
                                            <Button variant="outline" size="sm">Manage</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
