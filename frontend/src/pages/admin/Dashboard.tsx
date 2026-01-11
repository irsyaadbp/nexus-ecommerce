import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/formatPrice";
import { ArrowUpRight, DollarSign, Package, ShoppingCart, TrendingDown, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router";

const stats = [
    {
        title: "Total Pendapatan",
        value: formatPrice(45750000),
        change: "+12.5%",
        changeType: "positive" as const,
        icon: DollarSign
    },
    {
        title: "Total Pesanan",
        value: "156",
        change: "+8.2%",
        changeType: "positive" as const,
        icon: ShoppingCart
    },
    {
        title: "Total Produk",
        value: "48",
        change: "+3",
        changeType: "positive" as const,
        icon: Package
    },
    {
        title: "Pelanggan Baru",
        value: "32",
        change: "-2.1%",
        changeType: "negative" as const,
        icon: Users
    }
];

const recentOrders = [
    { id: "ORD-001", customer: "Andi Saputra", total: 2500000, status: "completed", date: "2024-01-15" },
    { id: "ORD-002", customer: "Budi Setiawan", total: 1750000, status: "processing", date: "2024-01-15" },
    { id: "ORD-003", customer: "Citra Dewi", total: 3200000, status: "pending", date: "2024-01-14" },
    { id: "ORD-004", customer: "Diana Putri", total: 950000, status: "completed", date: "2024-01-14" },
    { id: "ORD-005", customer: "Eko Prasetyo", total: 4100000, status: "processing", date: "2024-01-13" }
];

const topProducts = [
    { name: "Sofa 3 Seater Premium", sales: 24, revenue: 204000000 },
    { name: "Kursi Kayu Minimalis", sales: 18, revenue: 22500000 },
    { name: "Meja Kopi Marmer", sales: 15, revenue: 41250000 },
    { name: "Lampu Meja Nordic", sales: 12, revenue: 5400000 }
];


export default function Dashboard() {

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-green-500 text-white">Selesai</Badge>;
            case "processing":
                return <Badge className="bg-yellow-500 text-white">Diproses</Badge>;
            case "pending":
                return <Badge className="bg-gray-500 text-white">Menunggu</Badge>;
            default:
                return <Badge className="bg-gray-500 text-white">{status}</Badge>;
        }
    };
    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, index) => (
                    <div key={index} className="stats-card animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                        <div className="flex items-center justify-between">
                            <span className="stats-card-title">{stat.title}</span>
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <stat.icon className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                        <div className="stats-card-value">{stat.value}</div>
                        <div className={`stats-card-change ${stat.changeType === "positive" ? "stats-card-change-positive" : "stats-card-change-negative"
                            }`}>
                            {stat.changeType === "positive" ? (
                                <TrendingUp className="h-3 w-3 inline mr-1" />
                            ) : (
                                <TrendingDown className="h-3 w-3 inline mr-1" />
                            )}
                            {stat.change} dari bulan lalu
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                <div className="data-table-wrapper">
                    <div className="p-4 border-b border-border/50 flex items-center justify-between">
                        <h2 className="font-semibold text-foreground">Pesanan Terbaru</h2>
                        <Link to="/admin/orders" className="text-sm text-primary hover:underline flex items-center gap-1">
                            Lihat Semua <ArrowUpRight className="h-3 w-3" />
                        </Link>
                    </div>
                    <table className="data-table">
                        <thead className="data-table-header">
                            <tr>
                                <th className="data-table-header-cell">ID</th>
                                <th className="data-table-header-cell">Pelanggan</th>
                                <th className="data-table-header-cell">Total</th>
                                <th className="data-table-header-cell">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="data-table-row">
                                    <td className="data-table-cell font-medium">{order.id}</td>
                                    <td className="data-table-cell">{order.customer}</td>
                                    <td className="data-table-cell">{formatPrice(order.total)}</td>
                                    <td className="data-table-cell">{getStatusBadge(order.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="data-table-wrapper">
                    <div className="p-4 border-b border-border/50 flex items-center justify-between">
                        <h2 className="font-semibold text-foreground">Produk Terlaris</h2>
                        <Link to="/admin/products" className="text-sm text-primary hover:underline flex items-center gap-1">
                            Lihat Semua <ArrowUpRight className="h-3 w-3" />
                        </Link>
                    </div>
                    <table className="data-table">
                        <thead className="data-table-header">
                            <tr>
                                <th className="data-table-header-cell">Produk</th>
                                <th className="data-table-header-cell">Terjual</th>
                                <th className="data-table-header-cell">Pendapatan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topProducts.map((product, index) => (
                                <tr key={index} className="data-table-row">
                                    <td className="data-table-cell font-medium">{product.name}</td>
                                    <td className="data-table-cell">{product.sales}</td>
                                    <td className="data-table-cell text-primary">{formatPrice(product.revenue)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
