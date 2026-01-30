import { Button } from "@/components/ui/button";
import { Mail, Shield } from "lucide-react";

async function getCustomers() {
    try {
        const res = await fetch("http://localhost:4000/auth/users", { cache: "no-store" });
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        return [];
    }
}

export default async function AdminCustomersPage() {
    const customers = await getCustomers();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
                <Button variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" /> Email All
                </Button>
            </div>

            <div className="border rounded-md bg-card">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground border-b">
                        <tr>
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Email</th>
                            <th className="p-4 font-medium">Role</th>
                            <th className="p-4 font-medium">Orders</th>
                            <th className="p-4 font-medium">Joined Date</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-slate-700 dark:text-slate-300">
                        {customers.map((customer: any) => (
                            <tr key={customer.id} className="hover:bg-muted/50">
                                <td className="p-4 font-medium">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                            {customer.name?.charAt(0) || customer.email.charAt(0).toUpperCase()}
                                        </div>
                                        {customer.name || "N/A"}
                                    </div>
                                </td>
                                <td className="p-4">{customer.email}</td>
                                <td className="p-4">
                                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${customer.role === 'ADMIN'
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'bg-green-100 text-green-800'
                                        }`}>
                                        {customer.role === 'ADMIN' && <Shield className="w-3 h-3 mr-1" />}
                                        {customer.role}
                                    </div>
                                </td>
                                <td className="p-4 font-medium">{customer._count?.orders || 0}</td>
                                <td className="p-4 text-muted-foreground">
                                    {new Date(customer.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-right">
                                    <Button variant="ghost" size="sm">View Details</Button>
                                </td>
                            </tr>
                        ))}
                        {customers.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                    No customers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
