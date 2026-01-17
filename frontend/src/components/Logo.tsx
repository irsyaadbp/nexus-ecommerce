interface LogoProps {
    className?: string;
}

export function Logo({ className = "" }: LogoProps) {
    return (
        <a href="/" className={`nav-logo ${className}`}>
            NEXUS<span className="text-primary">.</span>
        </a>
    );
}
