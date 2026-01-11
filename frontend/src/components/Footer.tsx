import { Link } from "react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="lg:col-span-2">
                        <Link to="/" className="nav-logo mb-4 inline-block text-2xl">
                            NEXUS<span className="text-primary">.</span>
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                            Premium furniture & home decor dengan desain modern dan kualitas terbaik untuk ruangan impian Anda.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <a href="#" className="btn-icon btn-secondary">
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a href="#" className="btn-icon btn-secondary">
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a href="#" className="btn-icon btn-secondary">
                                <Twitter className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-title">Belanja</h4>
                        <ul className="footer-links">
                            <li><Link to="/products" className="footer-link">Semua Produk</Link></li>
                            <li><Link to="/products?category=furniture" className="footer-link">Furniture</Link></li>
                            <li><Link to="/products?category=lighting" className="footer-link">Lighting</Link></li>
                            <li><Link to="/products?category=dekorasi" className="footer-link">Dekorasi</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-title">Bantuan</h4>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">FAQ</a></li>
                            <li><a href="#" className="footer-link">Pengiriman</a></li>
                            <li><a href="#" className="footer-link">Pengembalian</a></li>
                            <li><a href="#" className="footer-link">Hubungi Kami</a></li>
                        </ul>
                    </div>


                </div>

            </div>
        </footer>
    );
}