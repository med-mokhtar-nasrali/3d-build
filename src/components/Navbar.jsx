import React, { useState, useEffect } from "react";
import {
    FaHome,
    FaMapMarkerAlt,
    FaDrawPolygon,
    FaCogs,
    FaEnvelope,
    FaBuilding,
    FaBars,
} from "react-icons/fa";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg shadow-md transition-colors duration-500 ${scrolled
                ? "bg-black/90"
                : "bg-black/30"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 flex justify-between items-center h-20">
                <a
                    href="/"
                    className="text-white text-xl font-semibold tracking-widest uppercase hover:text-gray-200 transition duration-300 flex items-center gap-2"
                >
                    KROZ <FaHome />
                </a>

                <div className="hidden md:flex gap-8 items-center">
                    {[
                        { href: "#location", label: "Location", icon: FaMapMarkerAlt },
                        { href: "/plan", label: "Plan", icon: FaDrawPolygon },
                        { href: "#technology", label: "Technology", icon: FaCogs },
                        { href: "#contact", label: "Contact", icon: FaEnvelope },
                        { href: "#projects", label: "Projects", icon: FaBuilding },
                    ].map(({ href, label, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            className="group relative text-white text-sm font-medium uppercase tracking-wider transition duration-300 hover:text-gray-200 flex items-center gap-1"
                        >
                            {label} <Icon className="inline" />
                            <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4 md:hidden">
                    <button className="text-white text-2xl hover:text-gray-200 transition duration-300">
                        <FaBars />
                    </button>
                </div>
            </div>
        </nav>
    );
}
