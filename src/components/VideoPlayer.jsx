import React from "react";
import Navbar from "./Navbar";

import { Link } from 'react-router-dom';

import { videos } from "./videosList";

export default function FullscreenVideoPlayer() {
    const [current, setCurrent] = React.useState(0);
    const [activeLayer, setActiveLayer] = React.useState(0);
    const [svgContent, setSvgContent] = React.useState("");
    const [isReversed, setIsReversed] = React.useState(false);

    const v0 = React.useRef(null);
    const v1 = React.useRef(null);

    React.useEffect(() => {
        const el = v0.current;
        if (el) {
            el.src = videos[0].src;
            el.play().catch(() => { });
        }
    }, []);

    React.useEffect(() => {
        const svgUrl = videos[4]?.svgLink;
        if (!svgUrl) return;

        fetch(svgUrl)
            .then((res) => res.text())
            .then((txt) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(txt, "image/svg+xml");
                const svg = doc.documentElement;

                if (!svg.getAttribute("viewBox")) {
                    const w = parseFloat(svg.getAttribute("width")) || 1000;
                    const h = parseFloat(svg.getAttribute("height")) || 1000;
                    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
                }

                svg.removeAttribute("width");
                svg.removeAttribute("height");
                svg.setAttribute("preserveAspectRatio", "xMidYMid slice");

                const normalized = new XMLSerializer().serializeToString(svg);
                setSvgContent(normalized);
            })
            .catch(console.error);
    }, []);

    const playVideo = (url, index, reversed = false) => {
        const nextLayer = activeLayer === 0 ? 1 : 0;
        const showEl = nextLayer === 0 ? v0.current : v1.current;
        const hideEl = activeLayer === 0 ? v0.current : v1.current;

        if (showEl) {
            showEl.oncanplay = () => {
                showEl.currentTime = 0;
                showEl.play().catch(() => { });
                hideEl?.classList.add("opacity-0");
                showEl.classList.remove("opacity-0");
                setActiveLayer(nextLayer);
                setCurrent(index);
                setIsReversed(reversed);
                showEl.oncanplay = null;
            };
            showEl.src = url;
            showEl.load();
        }
    };

    const handleNext = () => {
        if (isReversed) {
            playVideo(videos[current].src, current, false);
        } else {
            const nextIndex = (current + 1) % videos.length;
            playVideo(videos[nextIndex].src, nextIndex, false);
        }
    };

    const handleReversePrev = () => {
        if (!isReversed && videos[current].reverse) {
            playVideo(videos[current].reverse, current, true);
        } else {
            const prevIndex = (current - 1 + videos.length) % videos.length;
            playVideo(videos[prevIndex].src, prevIndex, false);
        }
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            <Navbar playVideo={playVideo} />

            <div className="absolute inset-0">
                <video
                    ref={v0}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200 opacity-100"
                    playsInline
                    muted
                    autoPlay
                    preload="auto"
                />
                <video
                    ref={v1}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200 opacity-0"
                    playsInline
                    muted
                    autoPlay
                    preload="auto"
                />

                {current === 4 && svgContent && (
                    <>
                        {/* Remove pointer-events-none here so clicks are detected */}
                        <div className="absolute inset-0 group overflow-hidden">

<style>{`
  .plan svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .plan svg * {
    fill: transparent !important;
    stroke: transparent !important;
    transition: fill 0.2s ease, stroke 0.2s ease;
    vector-effect: non-scaling-stroke;
    pointer-events: auto;
    cursor: pointer;
  }

  .plan svg *:hover {
    fill: rgba(34, 197, 94, 0.30) !important;
    stroke: #ffffff !important;
    stroke-width: 2 !important;
  }

  .plan svg rect[fill="#fff"],
  .plan svg rect[fill="#ffffff"] {
    fill: transparent !important;
    stroke: transparent !important;
    pointer-events: none;
  }

  .plan svg image,
  .plan svg mask {
    display: none !important;
  }
`}</style>

                            <Link to="/plan" className="absolute inset-0 block">
                                <div
                                    className="plan absolute inset-0 pointer-events-auto cursor-pointer"
                                    dangerouslySetInnerHTML={{ __html: svgContent }}
                                />
                            </Link>
                        </div>

                        {/* Left side details menu with fade-in */}
                        <div
                            className="absolute left-10 z-30 max-w-sm p-8 rounded-2xl text-white shadow-xl
                 opacity-0 animate-fadeIn animate-fill-forwards"
                            style={{
                                minWidth: "320px",
                                top: "80px",
                                backgroundColor: "rgba(0, 0, 0, 0.35)",  // semi-transparent black
                                backdropFilter: "blur(20px)",             // stronger blur effect
                                WebkitBackdropFilter: "blur(20px)",       // Safari support
                            }}
                        >
                            <h2 className="text-3xl font-extrabold mb-6 tracking-wide">{videos[4].title} Details</h2>
                            <p className="mb-3 text-lg leading-relaxed">📍 <strong>Location:</strong> Prime area</p>
                            <p className="mb-3 text-lg leading-relaxed">🏠 <strong>Size:</strong> 250 sqm</p>
                            <p className="mb-3 text-lg leading-relaxed">💰 <strong>Price:</strong> Contact for info</p>
                        </div>

                        <style>{`
                          @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                          }
                          .animate-fadeIn {
                            animation-name: fadeIn;
                            animation-duration: 0.8s;
                            animation-timing-function: ease-in-out;
                          }
                          .animate-fill-forwards {
                            animation-fill-mode: forwards;
                          }
                        `}</style>
                    </>
                )}
            </div>

            {/* Controls unchanged */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                <button
                    onClick={handleReversePrev}
                    aria-label="Previous"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition"
                >
                    {/* Left arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <button
                    onClick={handleNext}
                    aria-label="Next"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition"
                >
                    {/* Right arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
