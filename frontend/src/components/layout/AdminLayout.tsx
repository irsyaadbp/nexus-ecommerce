import { ChevronLeft, LayoutDashboard, LogOut, Menu, Package, Settings, ShoppingCart, Store, Users, X } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import { useState } from "react";

export function AdminLayout() {
    const location = useLocation();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Produk", path: "/admin/products", icon: Package },
        { name: "Pesanan", path: "/admin/orders", icon: ShoppingCart },
        { name: "Pelanggan", path: "/admin/customers", icon: Users },
        { name: "Pengaturan", path: "/admin/settings", icon: Settings }
    ];

    const isActive = (path: string) => {
        if (path === "/admin") {
            return location.pathname === "/admin";
        }
        return location.pathname.startsWith(path);
    };
    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar - Always visible on desktop */}
            <aside
                className={`fixed left-0 top-0 z-50 h-screen border-r border-border/50 bg-secondary/50 transition-all duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
          ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}
          w-64
        `}
            >
                {/* Sidebar Header */}
                <div className="flex h-16 items-center justify-between border-b border-border/50 px-4">
                    <Link to="/admin" className="flex items-center gap-2">
                        {!sidebarCollapsed ? (
                            <span className="text-xl font-bold text-foreground">
                                NEXUS<span className="text-primary">.</span>
                                <span className="text-xs font-normal text-muted-foreground ml-2">Admin</span>
                            </span>
                        ) : (
                            <span className="text-xl font-bold text-foreground">
                                N<span className="text-primary">.</span>
                            </span>
                        )}
                    </Link>
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-secondary transition-colors"
                    >
                        <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${sidebarCollapsed ? "rotate-180" : ""}`} />
                    </button>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg hover:bg-secondary"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto py-4 px-3">
                    <div className="space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 
                  ${isActive(item.path)
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    }
                  ${sidebarCollapsed ? "lg:justify-center lg:px-2" : ""}
                `}
                                onClick={() => setMobileOpen(false)}
                                title={sidebarCollapsed ? item.name : undefined}
                            >
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                <span className={sidebarCollapsed ? "lg:hidden" : ""}>{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-border/50 space-y-1">
                        <Link
                            to="/"
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200
                ${sidebarCollapsed ? "lg:justify-center lg:px-2" : ""}
              `}
                            title={sidebarCollapsed ? "Lihat Toko" : undefined}
                        >
                            <Store className="h-5 w-5 flex-shrink-0" />
                            <span className={sidebarCollapsed ? "lg:hidden" : ""}>Lihat Toko</span>
                        </Link>

                        <button
                            className={`cursor-pointer flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 w-full
                ${sidebarCollapsed ? "lg:justify-center lg:px-2" : ""}
              `}
                            title={sidebarCollapsed ? "Logout" : undefined}
                        >
                            <LogOut className="h-5 w-5 flex-shrink-0" />
                            <span className={sidebarCollapsed ? "lg:hidden" : ""}>Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
                {/* Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-4 lg:px-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl hover:bg-secondary transition-colors"
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">AD</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}