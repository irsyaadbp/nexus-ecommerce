import { Link, useLocation } from "react-router";
import { ShoppingBag, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const Header = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Beranda", path: "/" },
        { name: "Produk", path: "/products" },
        { name: "Tentang", path: "/about" },
        { name: "Kontak", path: "/contact" }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="nav-header">
            <div className="nav-container">
                <Logo />

                <nav className="nav-links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${isActive(link.path) ? "nav-link-active" : ""}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="nav-icons">
                    <Button size="icon" variant={'ghost'} aria-label="Wishlist">
                        <Heart className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant={'ghost'} aria-label="Cart">
                        <ShoppingBag className="h-5 w-5" />

                    </Button>
                    <Button>
                        Login/Register
                    </Button>
                    <Button
                        size="icon"
                        variant={'ghost'}
                        className="nav-icon-btn md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
                    <nav className="container-main flex flex-col py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`py-3 text-base font-medium transition-colors ${isActive(link.path) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/admin"
                            className="py-3 text-base font-medium text-muted-foreground hover:text-foreground"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Admin Dashboard
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
