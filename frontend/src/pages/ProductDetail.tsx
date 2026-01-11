import { useParams } from "react-router";

export default function ProductDetail() {
    const { slug } = useParams<{ slug: string }>();

    return (
        <div className="container-main section-padding">
            <h1 className="text-4xl font-bold mb-8">Product: {slug}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center">
                    <p className="text-muted-foreground">Product Image Placeholder</p>
                </div>
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Product Title</h2>
                    <p className="text-3xl font-bold text-primary">$99.99</p>
                    <p className="text-muted-foreground">Detailed description placeholder...</p>
                </div>
            </div>
        </div>
    );
}
