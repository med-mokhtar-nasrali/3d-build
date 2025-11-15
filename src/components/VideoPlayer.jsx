import React from "react";
import Navbar from "./Navbar";
import { videos } from "./videosList";

export default function FullscreenVideoPlayer() {
    const [current, setCurrent] = React.useState(0);
    const [activeLayer, setActiveLayer] = React.useState(0);
    const [isReversed, setIsReversed] = React.useState(false);
    const [isInterior, setIsInterior] = React.useState(false);

    const v0 = React.useRef(null);
    const v1 = React.useRef(null);

    const INTERIOR_VIDEO = "https://res.cloudinary.com/dzbmwlwra/video/upload/f_auto,q_auto,vc_auto/v1762343546/1105_pyem6p.mp4";

    React.useEffect(() => {
        const el = v0.current;
        if (el) {
            el.src = videos[0].src;
            el.play().catch(() => { });
        }
    }, []);

    // 🎥 Core video logic
    const playVideo = (url, index, reversed = false, isInteriorVideo = false) => {
        const nextLayer = activeLayer === 0 ? 1 : 0;
        const showEl = nextLayer === 0 ? v0.current : v1.current;
        const hideEl = activeLayer === 0 ? v0.current : v1.current;

        if (showEl) {
            showEl.oncanplay = () => {
                showEl.currentTime = 0;
                showEl.play().catch(() => { });
                hideEl?.classList.add("opacity-0");
                showEl.classList.remove("opacity-0");

                showEl.classList.add("transition-opacity", "duration-700");
                hideEl?.classList.add("transition-opacity", "duration-700");

                setActiveLayer(nextLayer);
                setCurrent(index);
                setIsReversed(reversed);
                setIsInterior(isInteriorVideo);
                showEl.oncanplay = null;
            };

            // 🎬 When video ends
            showEl.onended = () => {
                if (isInteriorVideo) {
                    // 🏠 When interior finishes, go back to last exterior
                    const lastIndex = videos.length - 1;
                    setIsInterior(false);
                    playVideo(videos[lastIndex].src, lastIndex, false, false);
                } else if (index === videos.length - 1) {
                    // ⏸ Pause on final frame of exterior
                    showEl.pause();
                    showEl.currentTime = showEl.duration - 0.05;
                }
            };

            showEl.src = url;
            showEl.load();
        }
    };

    // ▶️ Controls
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

    const handleRestart = () => {
        setIsInterior(false);
        playVideo(videos[0].src, 0, false);
    };

    const handleGoToInterior = () => {
        setIsInterior(true);
        playVideo(INTERIOR_VIDEO, current, false, true);
    };

    const handleBackToExterior = () => {
        setIsInterior(false);
        playVideo(videos[0].src, 0, false);
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            <Navbar playVideo={playVideo} />

            {/* --- Video Layers --- */}
            <div className="absolute inset-0">
                <video
                    ref={v0}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-100"
                    playsInline
                    muted={!isInterior}
                    autoPlay
                    preload="auto"
                />
                <video
                    ref={v1}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0"
                    playsInline
                    muted={!isInterior}
                    autoPlay
                    preload="auto"
                />
            </div>


            {/* --- Controls --- */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-30">
                {!isInterior ? (
                    <>
                        {/* Previous */}
                        <button
                            disabled={true}
                            onClick={handleReversePrev}
                            aria-label="Previous"
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        {/* Next or Final Options */}
                        {current < videos.length - 1 ? (
                            <button
                                onClick={handleNext}
                                aria-label="Next"
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        ) : (
                            <>
                                {/* Restart */}
                                <button
                                    onClick={handleRestart}
                                    aria-label="Restart"
                                    className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium hover:bg-white/30 transition"
                                >
                                    🔁 Restart
                                </button>

                                {/* Go to Interior */}
                                <button
                                    onClick={handleGoToInterior}
                                    aria-label="Go to Interior"
                                    className="px-5 py-2 rounded-full bg-green-500/80 backdrop-blur-md text-white text-sm font-medium hover:bg-green-600 transition"
                                >
                                    🏠 Go to Interior
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    // 🏠 Interior mode — show only Back button
                    <button
                        onClick={handleBackToExterior}
                        aria-label="Back"
                        className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium hover:bg-white/30 transition"
                    >
                        ⬅️ Back to Exterior
                    </button>
                )}
            </div>
        </div>
    );
}
