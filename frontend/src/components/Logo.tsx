import { Link } from "react-router";

interface LogoProps {
    className?: string;
}

export function Logo({ className = "" }: LogoProps) {
    return (
        <Link to="/" className={`nav-logo ${className}`}>
            NEXUS<span className="text-primary">.</span>
        </Link>
    );
}
