import React, { useState } from "react";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Navbar({ playVideo }) {
    const [active, setActive] = useState("Master Plan");

    const navItems = [
        { label: "Master Plan", path: "/" },
        { label: "Apartment", path: "/" },
        { label: "Floor plan", path: "/plan" },
    ];

    const handleClick = (item, e) => {
        if (item.label === "Apartment") {
            e.preventDefault(); // prevent navigation only for Apartment
            playVideo("https://res.cloudinary.com/dzbmwlwra/video/upload/v1754833809/LateTransition_qmwchy.mp4", 4, false);
        }
        setActive(item.label); // always update active item
    };

    return (
        <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center pointer-events-none">

            {/* LEFT SECTION */}
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-lg shadow-md border border-gray-200 rounded-lg px-3 py-2 pointer-events-auto">
                <a href="/" className="font-bold text-lg text-black tracking-tight">Eagle Vision</a>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    {navItems.map((item, index) => (
                        <React.Fragment key={item.label}>
                            <Link
                                to={item.path}
                                onClick={(e) => handleClick(item, e)}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${active === item.label
                                        ? "bg-black text-white shadow"
                                        : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                            >
                                {item.label}
                            </Link>
                            {index < navItems.length - 1 && <span className="text-gray-400">›</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-lg shadow-md border border-gray-200 rounded-lg px-3 py-2 pointer-events-auto">
                {/* WhatsApp Call Me */}
                <a
                    href="https://wa.me/21612345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm text-gray-700 font-medium transition"
                >
                    <FaPhone /> Call me
                </a>

                {/* Location Scroll */}
                <a
                    href="#location"
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm text-gray-700 font-medium transition"
                >
                    <FaMapMarkerAlt /> Location
                </a>
            </div>
        </div>
    );
}
