import { Button } from "../../components/ui/button";

export default function AdminProducts() {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Products</h1>
                <Button>Add New Product</Button>
            </div>
            <div className="glass-card overflow-hidden">

            </div>
        </div>
    );
}
