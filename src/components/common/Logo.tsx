import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/infera_logo.png";

interface LogoProps {
    /** Optional custom width (defaults to 120px) */
    width?: number;
    /** Optional custom height (defaults to 40px) */
    height?: number;
    /** Optional additional CSS classes for the container */
    className?: string;
    /** Whether the logo should be wrapped in a link pointing to the homepage (defaults to true) */
    asLink?: boolean;
}

export default function Logo({
    width = 120,
    height = 40,
    className = "",
    asLink = true,
}: LogoProps) {
    const logoContent = (
        <div className={`flex items-center gap-2 transition-opacity hover:opacity-90 ${className}`}>
            <Image
                src={logo}
                alt="Infera Logo"
                width={width}
                height={height}
                priority // Ensures fast loading since the logo is usually in the header
                className="h-auto w-auto object-contain"
            />
        </div>
    );

    if (asLink) {
        return (
            <Link href="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-primary rounded">
                {logoContent}
            </Link>
        );
    }

    return logoContent;
}