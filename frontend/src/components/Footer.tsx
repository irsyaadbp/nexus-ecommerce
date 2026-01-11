import { Link } from "react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="lg:col-span-2">
                        <Logo className="mb-4 inline-block text-2xl" />
                        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                            Premium furniture & home decor dengan desain modern dan kualitas terbaik untuk ruangan impian Anda.
                        </p>
                        <div className="mt-6 flex gap-3">

                            <Link target="_blank" to="https://www.instagram.com/">
                                <Button size={'icon'} variant={'secondary'}>
                                    <Instagram className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link target="_blank" to="https://www.facebook.com/">
                                <Button size={'icon'} variant={'secondary'}>
                                    <Facebook className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link target="_blank" to="https://www.twitter.com/">
                                <Button size={'icon'} variant={'secondary'}>
                                    <Twitter className="h-4 w-4" />
                                </Button>
                            </Link>
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