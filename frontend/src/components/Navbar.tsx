import { Link, useLocation } from "react-router";
import {
    ShoppingBag,
    Heart,
    Menu,
    X,
    UserIcon,
    SettingsIcon,
    LogOutIcon,
    LayoutDashboard,
    ShoppingBasket,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { useAuth } from "@/hooks/useAuth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";
import { useAnalytic } from "@/hooks/useAnalytic";

export function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();

    const log = useAnalytic();

    const navLinks = [
        { name: "Beranda", path: "/" },
        { name: "Produk", path: "/products" },
        { name: "Tentang", path: "/about" },
        { name: "Kontak", path: "/contact" },
    ];

    const listItems = [
        {
            icon: UserIcon,
            property: "Profile",
            admin: false,
            onClick: () => navigate("/profile"),
        },
        {
            icon: ShoppingBasket,
            property: "My Orders",
            admin: false,
            onClick: () => navigate("/orders"),
        },
        {
            icon: LayoutDashboard,
            property: "Go to Dashboard",
            admin: true,
            onClick: () => navigate("/admin"),
        },
        {
            icon: SettingsIcon,
            property: "Settings",
            admin: false,
            onClick: () => navigate("/settings"),
        },
        {
            icon: LogOutIcon,
            property: "Sign Out",
            admin: false,
            onClick: () => logout.mutate(),
        },
    ].filter((item) => !item.admin || user?.role === "ADMIN");

    const isActive = (path: string) => location.pathname === path;

    useEffect(() => {
        log.identify();
    }, []);

    return (
        <header className="nav-header">
            <div className="nav-container">
                <Logo />

                <nav className="nav-links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${isActive(link.path) ? "nav-link-active" : ""
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="nav-icons">
                    <Button size="icon" variant={"secondary"} aria-label="Wishlist">
                        <Heart className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant={"secondary"} aria-label="Cart">
                        <ShoppingBag className="h-5 w-5" />
                    </Button>
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="overflow-hidden rounded-full"
                                >
                                    <img
                                        src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
                                        alt={user?.username}
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    {listItems.map((item, index) => (
                                        <DropdownMenuItem
                                            key={index}
                                            className="hover:!bg-secondary cursor-pointer flex items-center gap-2"
                                            onClick={item.onClick}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span className="text-popover-foreground">
                                                {item.property}
                                            </span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link to="/login">
                            <Button className="hidden lg:block">Login/Register</Button>
                        </Link>
                    )}
                    <Button
                        size="icon"
                        variant={"ghost"}
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        {isMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
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
                                className={`py-3 text-base font-medium transition-colors ${isActive(link.path)
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {!isAuthenticated && (
                            <Link
                                to="/login"
                                className="w-full"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Button className="mt-6 w-full">Login/Register</Button>
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
