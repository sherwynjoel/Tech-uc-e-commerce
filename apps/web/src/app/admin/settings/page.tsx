"use client";

import { Button } from "@/components/ui/button";
import { Save, Lock, Bell, Globe } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <Button className="gap-2">
                    <Save className="h-4 w-4" /> Save Changes
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* General Settings */}
                <div className="p-6 bg-card border rounded-xl shadow-sm space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b">
                        <Globe className="h-5 w-5 text-blue-500" />
                        <h3 className="font-semibold text-lg">General Information</h3>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Store Name</label>
                        <input
                            type="text"
                            defaultValue="Tech uc"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Support Email</label>
                        <input
                            type="email"
                            defaultValue="support@techuc.com"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Currency</label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            <option>INR (₹)</option>
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                        </select>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="p-6 bg-card border rounded-xl shadow-sm space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b">
                        <Lock className="h-5 w-5 text-red-500" />
                        <h3 className="font-semibold text-lg">Security</h3>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Admin Password</h4>
                        <p className="text-xs text-muted-foreground mb-3">Last changed: 30 days ago</p>
                        <Button variant="outline" size="sm" className="w-full">Change Password</Button>
                    </div>

                    <div className="flex items-center justify-between p-2">
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium">Two-Factor Authentication</label>
                            <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <div className="h-6 w-11 bg-slate-200 rounded-full relative cursor-pointer">
                            <div className="h-5 w-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="p-6 bg-card border rounded-xl shadow-sm space-y-4 md:col-span-2">
                    <div className="flex items-center gap-2 pb-2 border-b">
                        <Bell className="h-5 w-5 text-yellow-500" />
                        <h3 className="font-semibold text-lg">Notifications</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium">Order Confirmation</label>
                                <p className="text-xs text-muted-foreground">Receive email when a new order is placed</p>
                            </div>
                            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium">Low Stock Alerts</label>
                                <p className="text-xs text-muted-foreground">Get notified when products are running low</p>
                            </div>
                            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium">New User Registration</label>
                                <p className="text-xs text-muted-foreground">Receive email when a new customer registers</p>
                            </div>
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
