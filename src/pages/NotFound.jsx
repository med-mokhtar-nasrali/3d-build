// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 text-center px-4">
            <h1 className="text-7xl font-extrabold text-black tracking-widest mb-4">
                404
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Oops! The page you're looking for doesn’t exist or has been moved.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="rounded-full border-2 border-black text-black px-6 py-3 font-semibold hover:bg-black hover:text-white transition"
                >
                    ← Go Back
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="rounded-full bg-black text-white px-6 py-3 font-semibold hover:bg-gray-900 transition"
                >
                    Home Page
                </button>
            </div>
            <span className="mt-12 text-gray-400 text-sm">
                &copy; 2025 Building & Architecture
            </span>
        </div>
    );
};

export default NotFound;
