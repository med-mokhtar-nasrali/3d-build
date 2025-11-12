import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import houses from "../data/houses.json"; // Your JSON "DB"
import HouseCommentForm from "./HouseCommentForm"; // path unchanged
import { houseImages } from "../data/houseImages";

const roomImages = [
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773545/1_wus98m.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773545/4_bk3bvu.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773541/5_rxamyg.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773544/3_mtdj5s.jpg",
];

const galleryImages = [
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773542/IMG_82933_lzkcpn.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773542/IMG_8294_wu2emy.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_8295_cumyls.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_83000_jgd2xr.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_8297_h1mpgd.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_8300_jsyi0x.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_8299_bhow8o.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_8296_j22uz6.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773536/IMG_8298_theljb.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773535/IMG_8302_ggtg15.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773535/IMG_8301_hpjjbs.jpg",
];

const floorPlanImages = [
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773534/IMG_8305_hrnzcx.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_83000_jgd2xr.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_8296_j22uz6.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_8300_jsyi0x.jpg",
];

export default function Plan() {
    const navigate = useNavigate();
    const [hoveredHouseId, setHoveredHouseId] = useState(null);
    const [roomIndex, setRoomIndex] = useState(0);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [floorIndex, setFloorIndex] = useState(0);
    const [popupSrc, setPopupSrc] = useState(null);

    // Slider state for “Choose Your House”
    const activeHouses = useMemo(() => houses.filter((h) => h.type === "a"), []);
    const [currentIdx, setCurrentIdx] = useState(
        Math.max(0, activeHouses.findIndex((h) => h.state === "actif"))
    );

    // Keyboard nav for house slider
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight") nextHouse();
            if (e.key === "ArrowLeft") prevHouse();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [currentIdx, activeHouses.length]);

    const prevHouse = () =>
        setCurrentIdx((i) => (i - 1 + activeHouses.length) % activeHouses.length);
    const nextHouse = () =>
        setCurrentIdx((i) => (i + 1) % activeHouses.length);

    const currentActiveId =
        hoveredHouseId ??
        (activeHouses[currentIdx] ? activeHouses[currentIdx].id : null);

    const currentImage =
        houseImages.find((img) => img.id === currentActiveId)?.src ??
        "https://res.cloudinary.com/dzbmwlwra/image/upload/v1762360930/49ba186a-621c-4825-859e-ff097bec92c5_rdji7t.jpg";

    const updateCarousel = (type, increment) => {
        if (type === "room") {
            setRoomIndex((p) => (p + increment + roomImages.length) % roomImages.length);
        } else if (type === "gallery") {
            setGalleryIndex((p) => (p + increment + galleryImages.length) % galleryImages.length);
        } else if (type === "floor") {
            setFloorIndex((p) => (p + increment + floorPlanImages.length) % floorPlanImages.length);
        }
    };

    const handleHouseClick = (houseId) => {
        const house = houses.find((h) => h.id === houseId);
        if (house && house.state === "actif") navigate(`/house/${houseId}`);
    };

    const Title = ({ children }) => (
        <div className="text-center max-w-5xl mx-auto px-4 mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold uppercase leading-tight tracking-[0.2em]">
                {children}
            </h1>
            <span className="block h-[3px] w-28 bg-black mx-auto rounded-full mt-4" />
        </div>
    );

    // Click-to-open modal for Section backgrounds
    const Section = ({ title, images, index, setIndex }) => (
        <section className="relative w-full min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh] border-b flex items-center justify-center">
            {/* Clickable background */}
            <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover cursor-zoom-in"
                style={{ backgroundImage: `url(${images[index]})` }}
                onClick={() => setPopupSrc(images[index])}
                title="Click to view"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />

            <h2 className="absolute top-6 w-full text-center text-3xl sm:text-5xl font-extrabold text-white z-10 tracking-widest drop-shadow">
                {title}
            </h2>

            <button
                onClick={() => setIndex((p) => (p - 1 + images.length) % images.length)}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white text-2xl sm:text-3xl font-bold
                 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full p-2 sm:p-3 ring-1 ring-white/30 z-10"
                aria-label="Previous"
            >
                &#8592;
            </button>
            <button
                onClick={() => setIndex((p) => (p + 1) % images.length)}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white text-2xl sm:text-3xl font-bold
                 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full p-2 sm:p-3 ring-1 ring-white/30 z-10"
                aria-label="Next"
            >
                &#8594;
            </button>
        </section>
    );

    return (
        <div className="min-h-screen text-gray-900 bg-gradient-to-b from-white to-gray-50">
            {/* PROPERTY PLANNING — wider & horizontal cards */}
            <section className="py-20 sm:py-24 border-b border-gray-200">
                <Title>
                    PROPERTY
                    <br />
                    PLANNING
                </Title>

                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* 3-column horizontal layout (no scroll), responsive stack on mobile */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Info Card */}
                        <div className="bg-white/95 border border-gray-200 rounded-3xl shadow-lg p-8 sm:p-10 flex flex-col justify-between backdrop-blur">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6">Unit 1R</h2>
                                <div className="grid grid-cols-1 gap-2 text-base sm:text-lg">
                                    <p>
                                        <strong>Area:</strong> 546.27 sqft
                                    </p>
                                    <p>
                                        <strong>Price:</strong> $1,020,400
                                    </p>
                                    <div className="mt-4 space-y-2 sm:space-y-3">
                                        <p>🛏️ 1 Bed</p>
                                        <p>🛁 1 Bath</p>
                                        <p>📐 Type: 1BD, Type A, W.B</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-3">
                                <button className="px-4 py-2.5 rounded-full border-2 border-black font-semibold hover:bg-black hover:text-white transition">
                                    PDF
                                </button>
                                <button className="px-4 py-2.5 rounded-full border-2 border-black font-semibold hover:bg-black hover:text-white transition">
                                    COMPARE
                                </button>
                                <button className="px-4 py-2.5 rounded-full border-2 border-black font-semibold hover:bg-black hover:text-white transition col-span-2">
                                    ON 3D
                                </button>
                                <button className="px-4 py-2.5 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition col-span-2">
                                    CALL BACK
                                </button>
                            </div>
                        </div>

                        {/* Floor Plan Image  */}
                        <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-white/60 backdrop-blur flex flex-col">
                            <div
                                className="relative w-full aspect-[4/3] bg-center bg-cover cursor-pointer group"
                                style={{
                                    backgroundImage:
                                        "url(https://res.cloudinary.com/dzbmwlwra/image/upload/v1754778241/floor-plan_jvww4l.png)",
                                }}
                                onClick={() =>
                                    setPopupSrc(
                                        "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754778241/floor-plan_jvww4l.png"
                                    )
                                }
                                title="Click to view"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="absolute bottom-3 right-3 text-xs font-semibold px-2 py-1 rounded-full bg-black text-white">
                                    VIEW
                                </span>
                            </div>
                            <div className="p-6 text-center text-gray-700 space-y-1">
                                <p className="font-semibold">Floor Plan</p>
                                <p>Total area: 546.27 sqft</p>
                                <p>Living area: 491.13 sqft</p>
                            </div>
                        </div>

                        {/* Interior Highlights */}
                        <div className="bg-white/95 border border-gray-200 rounded-3xl shadow-lg p-8 sm:p-10 text-center backdrop-blur">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Interior Highlights</h2>
                            <ul className="space-y-3 text-base sm:text-lg">
                                <li>High ceilings</li>
                                <li>Smart lighting</li>
                                <li>Luxury wood flooring</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Section title="ROOM TOUR" images={roomImages} index={roomIndex} setIndex={setRoomIndex} />
            <br />
            <Section title="FLOOR PLAN" images={floorPlanImages} index={floorIndex} setIndex={setFloorIndex} />
            <br />
            <Section title="GALLERY" images={galleryImages} index={galleryIndex} setIndex={setGalleryIndex} />
            <br />

            {/* CHOOSE YOUR HOUSE  */}
            <section className="relative w-full min-h-[72vh] md:min-h-[80vh] lg:min-h-[88vh] flex flex-col items-center justify-start gap-6 sm:gap-8">
                <Title>CHOOSE YOUR HOUSE</Title>

                <div className="w-full max-w-7xl px-4">
                    {/* Show all chips, same order as JSON, no scrolling */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2 py-2 mb-4">
                        {activeHouses.map((house, i) => {
                            const isActive = house.id === currentActiveId;
                            const isSold = house.state !== "actif";
                            return (
                                <button
                                    key={house.id}
                                    onClick={() => {
                                        setCurrentIdx(i);        // keeps original order index
                                        handleHouseClick(house.id);
                                    }}
                                    onMouseEnter={() => setHoveredHouseId(house.id)}
                                    onMouseLeave={() => setHoveredHouseId(null)}
                                    disabled={isSold}
                                    className={[
                                        "rounded-full px-5 py-2 font-semibold transition text-sm sm:text-base",
                                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60",
                                        isSold
                                            ? "bg-red-600 text-white border border-red-700 cursor-not-allowed"
                                            : "bg-green-600 text-white border border-green-700 hover:bg-green-700",
                                        isActive ? "scale-105 ring-2 ring-offset-2 ring-black" : "",
                                    ].join(" ")}
                                    title={isSold ? "Sold" : "Available"}
                                >
                                    {house.number} {isSold ? "(Sold)" : ""}
                                </button>
                            );
                        })}
                    </div>

                    {/* Optional: progress dots can remain, but they aren't needed without a slider */}
                    <div className="flex justify-center gap-2 mb-2">
                        {activeHouses.map((_, i) => (
                            <span
                                key={i}
                                className={`h-1.5 w-6 rounded-full transition-all ${i === currentIdx ? "bg-black w-8" : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>


                {/* Big hero image (click to modal) */}
                <div className="relative w-full flex-1 rounded-2xl overflow-hidden max-w-7xl shadow-2xl">
                    <div
                        key={currentImage}
                        className="absolute inset-0 bg-center bg-cover will-change-transform animate-[fadeIn_420ms_ease] md:scale-[1.02] cursor-zoom-in"
                        style={{ backgroundImage: `url(${currentImage})` }}
                        onClick={() => setPopupSrc(currentImage)}
                        title="Click to view"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent pointer-events-none" />

                    {/* Overlay arrows on big image */}
                    <button
                        onClick={prevHouse}
                        aria-label="Previous House"
                        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white text-xl sm:text-2xl font-bold
                       bg-black/30 hover:bg-black/50 backdrop-blur rounded-full p-2 sm:p-3 ring-1 ring-white/20"
                    >
                        &#8592;
                    </button>
                    <button
                        onClick={nextHouse}
                        aria-label="Next House"
                        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white text-xl sm:text-2xl font-bold
                       bg-black/30 hover:bg-black/50 backdrop-blur rounded-full p-2 sm:p-3 ring-1 ring-white/20"
                    >
                        &#8594;
                    </button>
                </div>
            </section>

            <br />
            <br />

            {/* Modal */}
            {popupSrc && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 cursor-pointer p-4"
                    onClick={() => setPopupSrc(null)}
                >
                    <img
                        src={popupSrc}
                        alt="Popup"
                        className="max-w-[95vw] max-h-[85vh] rounded-3xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={() => setPopupSrc(null)}
                        className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white text-3xl sm:text-5xl font-bold select-none"
                        aria-label="Close popup"
                    >
                        &times;
                    </button>
                </div>
            )}

            {/* Bottom Navbar */}
            <div
                className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/95 border border-gray-200 rounded-2xl shadow-lg
                   px-3 py-2 sm:px-4 sm:py-2.5 flex gap-2 sm:gap-3 z-50 max-w-[95vw] sm:max-w-md w-[95vw] sm:w-auto backdrop-blur"
                style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
            >
                <button
                    className="bg-black text-white rounded-full px-3 py-1.5 sm:px-3.5 sm:py-1.5 font-medium hover:bg-gray-900 transition whitespace-nowrap"
                    onClick={() => alert("Request a callback")}
                >
                    CALL BACK
                </button>
                <button
                    className="border border-black rounded-full px-3 py-1.5 sm:px-3.5 sm:py-1.5 font-medium hover:bg-black hover:text-white transition whitespace-nowrap"
                    onClick={() => alert("Downloading PDF")}
                >
                    PDF DOWNLOAD
                </button>
                <button
                    className="border border-black rounded-full px-3 py-1.5 sm:px-3.5 sm:py-1.5 font-medium hover:bg-black hover:text-white transition whitespace-nowrap"
                    onClick={() => window.history.back()}
                >
                    GO BACK
                </button>
            </div>

            {/* tiny keyframes + hide scrollbar util */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.02); }
          to   { opacity: 1; transform: scale(1); }
        }
        /* Hide scrollbar while keeping scroll/drag */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
}
