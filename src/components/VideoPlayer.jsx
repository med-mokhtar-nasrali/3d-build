import React from "react";
import Navbar from "./Navbar";

const videos = [
    { src: "https://res.cloudinary.com/dzbmwlwra/video/upload/v1754772189/1_v1zsfc.mp4", reverse:"https://res.cloudinary.com/dzbmwlwra/video/upload/v1754771812/RecorderClip_Reverse3_vvupud.mp4",  title: "House 38A", plot: 900, house: 147, price: "SOLD" },
    { src: "https://res.cloudinary.com/dzbmwlwra/video/upload/v1754772183/2_pnvwp9.mp4",reverse:"https://res.cloudinary.com/dzbmwlwra/video/upload/v1754771893/RecorderClip_Reverse4_zbrbui.mp4", title: "House 38B", plot: 890, house: 168.8, price: "SOLD" },
    { src: "https://res.cloudinary.com/dzbmwlwra/video/upload/v1754771772/3_vyidmk.mp4",reverse:"https://res.cloudinary.com/dzbmwlwra/video/upload/v1754771893/RecorderClip_Reverse2_mkvjtq.mp4", title: "House 38C", plot: 900, house: 147, price: "360.000 EUR" },
    { src: "https://res.cloudinary.com/dzbmwlwra/video/upload/v1754771811/4_ukq77s.mp4", reverse:"",title: "House 38D", plot: 900, house: 147, price: "360.000 EUR" },
    { src: "https://res.cloudinary.com/dzbmwlwra/video/upload/v1754833809/LateTransition_qmwchy.mp4", reverse:"https://res.cloudinary.com/dzbmwlwra/video/upload/v1754771890/RecorderClip_262_vt4k2r.mp4", svgLink :"https://res.cloudinary.com/dzbmwlwra/image/upload/v1754778822/Artboard_1_o8pxzr.svg",title: "House 38E", plot: 900, house: 147, price: "360.000 EUR" },
    { src: "https://res.cloudinary.com/dzbmwlwra/video/upload/v1754771941/RecorderClip_260_kgoxot.mp4", reverse:"https://res.cloudinary.com/dzbmwlwra/video/upload/v1754771890/RecorderClip_262_vt4k2r.mp4",title: "House 38E", plot: 900, house: 147, price: "360.000 EUR" },
];

export default function FullscreenVideoPlayer() {
    const [current, setCurrent] = React.useState(0);
    const [activeLayer, setActiveLayer] = React.useState(0); // 0 or 1
    const [svgContent, setSvgContent] = React.useState("");

    const v0 = React.useRef(null);
    const v1 = React.useRef(null);

    // Load first video
    React.useEffect(() => {
        const el = v0.current;
        if (el) {
            el.src = videos[0].src;
            el.play().catch(() => {});
        }
    }, []);

// Fetch SVG for video index 4
    React.useEffect(() => {
        const svgUrl = videos[4]?.svgLink;
        if (!svgUrl) return;

        fetch(svgUrl)
            .then((res) => res.text())
            .then((txt) => {
                // normalize: add viewBox if missing, remove width/height, set slice
                const parser = new DOMParser();
                const doc = parser.parseFromString(txt, "image/svg+xml");
                const svg = doc.documentElement;

                // add viewBox if missing
                if (!svg.getAttribute("viewBox")) {
                    const w = parseFloat(svg.getAttribute("width")) || 1000;
                    const h = parseFloat(svg.getAttribute("height")) || 1000;
                    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
                }

                // remove fixed size so it can scale with CSS
                svg.removeAttribute("width");
                svg.removeAttribute("height");

                // make it behave like object-cover
                svg.setAttribute("preserveAspectRatio", "xMidYMid slice");

                const normalized = new XMLSerializer().serializeToString(svg);
                setSvgContent(normalized);
            })
            .catch(console.error);
    }, []);


    const handleVideoChange = (nextIndex) => {
        const prevIndex = current;
        const goingBackOne = nextIndex === prevIndex - 1;

        const url =
            goingBackOne && videos[nextIndex].reverse
                ? videos[nextIndex].reverse
                : videos[nextIndex].src;

        const nextLayer = activeLayer === 0 ? 1 : 0;
        const showEl = nextLayer === 0 ? v0.current : v1.current;
        const hideEl = activeLayer === 0 ? v0.current : v1.current;

        if (showEl) {
            showEl.oncanplay = () => {
                showEl.currentTime = 0;
                showEl.play().catch(() => {});
                hideEl?.classList.add("opacity-0");
                showEl.classList.remove("opacity-0");
                setActiveLayer(nextLayer);
                setCurrent(nextIndex);
                showEl.oncanplay = null;
            };
            showEl.src = url;
            showEl.load();
        }
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            <Navbar />

            {/* Two stacked videos */}
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
                    <div className="absolute inset-0 group pointer-events-none" style={{ overflow: "hidden" }}>
                        <style>{`
      .plan svg { width:100%; height:100%; display:block; }

      /* default: fully transparent */
      .plan svg * {
        fill: transparent !important;
        stroke: transparent !important;
        transition: fill .2s ease, stroke .2s ease;
        vector-effect: non-scaling-stroke;
      }

      /* on hover (video area), turn green + white outline */
      .group:hover .plan svg * {
        fill: rgba(34, 197, 94, 0.30) !important;
        stroke: #ffffff !important;
        stroke-width: 2 !important;
      }

      /* hide any full-canvas bg in the SVG (if present) */
      .plan svg rect[fill="#fff"], .plan svg rect[fill="#ffffff"] {
        fill: transparent !important; stroke: transparent !important;
      }
      .plan svg image, .plan svg mask { display:none !important; }
    `}</style>

                        <div
                            className="plan absolute inset-0 pointer-events-auto"
                            dangerouslySetInnerHTML={{ __html: svgContent }}
                        />
                    </div>
                )}

            </div>

            {/* Glass menu */}
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
                                className={`cursor-pointer rounded-xl p-4 transition-shadow duration-300 flex flex-col bg-white/10 backdrop-blur-md border border-transparent ${
                                    isActive
                                        ? "border-white/40 shadow-[0_0_12px_3px_rgba(255,255,255,0.15)] bg-white/20"
                                        : "hover:bg-white/20 hover:shadow-md"
                                }`}
                                tabIndex={0}
                                onKeyDown={(e) => e.key === "Enter" && handleVideoChange(index)}
                                role="button"
                                aria-pressed={isActive}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <p
                                            className={`font-semibold text-base ${
                                                isActive ? "text-white" : "text-white/90"
                                            } relative group`}
                                        >
                                            {video.title.replace("House ", "")}
                                            <span
                                                className={`absolute bottom-0 left-0 h-[2px] w-0 bg-indigo-400 rounded-full transition-all duration-300 group-hover:w-full ${
                                                    isActive ? "w-full" : ""
                                                }`}
                                            />
                                        </p>
                                        <p className="text-xs text-white/60 mt-1 select-none">
                                            {video.plot}m² &bull; {video.house}m²
                                        </p>
                                    </div>

                                    <span
                                        className={`text-xs px-3 py-1 rounded-full font-mono select-none ${
                                            video.price === "SOLD"
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

                <div className="mt-6 pt-4 border-t border-white/20 text-white/80 text-xs select-none">
                    <p className="opacity-60">Currently viewing:</p>
                    <p className="text-white font-semibold mt-1">
                        {videos[current].title}
                    </p>
                </div>
            </div>
        </div>
    );
}
