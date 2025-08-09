import React, { useState, useRef } from "react";
import Navbar from "./Navbar";

const videos = [
    { src: "/videos/1.mp4", title: "House 38A", plot: 900, house: 147, price: "SOLD" },
    { src: "/videos/2.mp4", title: "House 38B", plot: 890, house: 168.8, price: "SOLD" },
    { src: "/videos/3.mp4", title: "House 38C", plot: 900, house: 147, price: "360.000 EUR" },
    { src: "/videos/4.mp4", title: "House 38D", plot: 900, house: 147, price: "360.000 EUR" },
    { src: "/videos/5.mp4", title: "House 38E", plot: 900, house: 147, price: "360.000 EUR" },
    { src: "/videos/6.mp4", title: "House 38F", plot: 900, house: 147, price: "360.000 EUR" },
];

export default function FullscreenVideoPlayer() {
    const [current, setCurrent] = React.useState(0);
    const videoRef = React.useRef(null);

    const handleVideoChange = (index) => {
        setCurrent(index);
        videoRef.current.play();
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            <Navbar />
            {/* Video Background */}
            <video
                key={videos[current].src}
                ref={videoRef}
                src={videos[current].src}
                className="w-full h-full object-cover"
                playsInline
                controls={false}
                muted
                autoPlay
            />

            {/* Modern Glass Menu */}
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-72 max-h-[80vh] bg-gradient-to-tr from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-white font-sans flex flex-col">
                <h3 className="text-xs font-semibold uppercase tracking-widest mb-6 select-none text-white/80">
                    Property Selection
                </h3>

                <ul className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                    {videos.map((video, index) => {
                        const isActive = current === index;
                        return (
                            <li
                                key={index}
                                onClick={() => handleVideoChange(index)}
                                className={`cursor-pointer rounded-xl p-4 transition-shadow duration-300 flex flex-col bg-white/10 backdrop-blur-md border border-transparent
                  ${isActive ? "border-white/40 shadow-[0_0_12px_3px_rgba(255,255,255,0.15)] bg-white/20" : "hover:bg-white/20 hover:shadow-md"}
                `}
                                tabIndex={0}
                                onKeyDown={(e) => e.key === "Enter" && handleVideoChange(index)}
                                role="button"
                                aria-pressed={isActive}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <p
                                            className={`font-semibold text-base ${isActive ? "text-white" : "text-white/90"
                                                } relative group`}
                                        >
                                            {video.title.replace("House ", "")}
                                            <span
                                                className={`absolute bottom-0 left-0 h-[2px] w-0 bg-indigo-400 rounded-full transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : ""
                                                    }`}
                                            ></span>
                                        </p>
                                        <p className="text-xs text-white/60 mt-1 select-none">
                                            {video.plot}m² &bull; {video.house}m²
                                        </p>
                                    </div>

                                    <span
                                        className={`text-xs px-3 py-1 rounded-full font-mono select-none ${video.price === "SOLD"
                                            ? "bg-red-600/30 text-red-400 shadow-[0_0_10px_2px_rgba(255,77,77,0.4)]"
                                            : "bg-emerald-600/30 text-emerald-400 shadow-[0_0_10px_2px_rgba(34,197,94,0.4)]"
                                            }`}
                                    >
                                        {video.price.includes("EUR")
                                            ? video.price.split(" ")[0]
                                            : video.price}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                {/* Current Selection Indicator */}
                <div className="mt-6 pt-4 border-t border-white/20 text-white/80 text-xs select-none">
                    <p className="opacity-60">Currently viewing:</p>
                    <p className="text-white font-semibold mt-1">{videos[current].title}</p>
                </div>
            </div>
        </div>
    );
}
