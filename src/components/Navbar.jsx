import React from "react";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Navbar({ playVideo }) {
    return (
        <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center pointer-events-none">

            {/* LEFT SECTION */}
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-lg shadow-md border border-gray-200 rounded-lg px-3 py-2 pointer-events-auto">
                <a href="/" className="font-bold text-lg text-black tracking-tight">Eagle Vision</a>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    {[
                        { label: "Master Plan", path: "/" },
                        { label: "Apartment", path: "/" },
                        { label: "Floor plan", path: "/plan" },
                    ].map((item, index, arr) => (
                        <React.Fragment key={item.label}>
                            <a
                                href={item.path}
                                onClick={item.label === "Apartment" ? (e) => {
                                    e.preventDefault();
                                    playVideo("https://res.cloudinary.com/dzbmwlwra/video/upload/v1754833809/LateTransition_qmwchy.mp4", 4, false);
                                } : undefined}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${index === 0
                                    ? "bg-black text-white shadow"
                                    : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                            >
                                {item.label}
                            </a>
                            {index < arr.length - 1 && <span className="text-gray-400">›</span>}
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