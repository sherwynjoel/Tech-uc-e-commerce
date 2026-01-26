import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Revenue", value: "$45,231.89", icon: DollarSign, change: "+20.1% from last month", color: "text-green-600" },
                    { label: "Orders", value: "+2350", icon: ShoppingCart, change: "+180.1% from last month", color: "text-blue-600" },
                    { label: "Products in Stock", value: "12,234", icon: Package, change: "+19 new products", color: "text-orange-600" },
                    { label: "Active Now", value: "+573", icon: TrendingUp, change: "+201 since last hour", color: "text-purple-600" },
                ].map((stat, i) => (
                    <div key={i} className="bg-card p-6 rounded-xl border shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs text-muted-foreground mt-1">{stat.change}</div>
                    </div>
                ))}
            </div>

            {/* Recent Orders Placeholder */}
            <div className="bg-card rounded-xl border shadow-sm">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-bold">Recent Orders</h2>
                </div>
                <div className="p-6">
                    <div className="text-sm text-muted-foreground">No recent orders found.</div>
                </div>
            </div>
        </div>
    );
}
