import React from "react";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black text-gray-400 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8 items-center">

                {/* Left: Brand & Copyright */}
                <div>
                    <h2 className="text-white text-lg font-semibold tracking-wide">
                        Eagle Vision Estate
                    </h2>
                    <p className="text-sm mt-2">
                        &copy; {new Date().getFullYear()} Eagle Vision Estate. All rights reserved.
                    </p>
                </div>

                {/* Right: Links & Socials */}
                <div className="flex flex-col md:items-end gap-4">
                    {/* Quick Links */}
                    <div className="flex gap-6 text-sm">
                        <a href="#about" className="hover:text-white transition-colors">About</a>
                        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-5">
                        <a href="#" className="hover:text-white transition-transform hover:scale-110">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-white transition-transform hover:scale-110">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-white transition-transform hover:scale-110">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="mailto:example@example.com" className="hover:text-white transition-transform hover:scale-110">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
