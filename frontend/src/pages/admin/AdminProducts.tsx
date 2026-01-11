import { Button } from "../../components/ui/button";

export default function AdminProducts() {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Products</h1>
                <Button>Add New Product</Button>
            </div>
            <div className="glass-card overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-muted/50">
                            <th className="p-4 border-b">Product Name</th>
                            <th className="p-4 border-b">Category</th>
                            <th className="p-4 border-b">Price</th>
                            <th className="p-4 border-b">Stock</th>
                            <th className="p-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-4 border-b" colSpan={5}>
                                <p className="text-muted-foreground text-center">No products found. Add your first product!</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
