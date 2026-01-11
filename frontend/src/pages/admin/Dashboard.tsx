export default function Dashboard() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold">Total Products</h3>
                    <p className="text-4xl font-bold text-primary mt-2">128</p>
                </div>
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold">Total Orders</h3>
                    <p className="text-4xl font-bold text-primary mt-2">45</p>
                </div>
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold">Total Users</h3>
                    <p className="text-4xl font-bold text-primary mt-2">1.2k</p>
                </div>
            </div>
        </div>
    );
}
