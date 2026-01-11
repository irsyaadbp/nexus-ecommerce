import { HeroBanner } from "../components/Homepage/HeroBanner";

export default function Home() {
    return (
        <main>
            <HeroBanner />
            <div className="container-main section-padding">
                <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
                <p className="text-muted-foreground">Placeholder for featured products section...</p>
            </div>
        </main>
    );
}
