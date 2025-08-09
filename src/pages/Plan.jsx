import React, { useState } from "react";

const roomImages = [
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773545/4_bk3bvu.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773545/1_wus98m.jpg",
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
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_8299_bhow8o.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773536/IMG_8298_theljb.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773535/IMG_8302_ggtg15.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773535/IMG_8301_hpjjbs.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773534/IMG_8305_hrnzcx.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773534/IMG_8307_rgyqeu.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773533/IMG_8308_lsa1ue.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773533/IMG_8309_eywbcj.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773533/IMG_8310_tzs30c.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773533/IMG_8311_wqqyvc.jpg",


];


export default function Plan() {
    const [roomIndex, setRoomIndex] = useState(0);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [popupSrc, setPopupSrc] = useState(null);

    const updateCarousel = (type, increment) => {
        if (type === "room") {
            setRoomIndex((prev) => (prev + increment + roomImages.length) % roomImages.length);
        } else {
            setGalleryIndex((prev) => (prev + increment + galleryImages.length) % galleryImages.length);
        }
    };

    const Title = ({ children }) => (
        <div className="text-center max-w-4xl mx-auto px-4 mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold uppercase leading-tight tracking-tight select-none">
                {children}
            </h1>
            <span className="block h-1 w-16 bg-black mx-auto rounded-full mt-3 transition-all duration-300 hover:w-24"></span>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">
            {/* Section Title */}
            <section className="py-20 border-b border-gray-300">
                <Title>PROPERTY<br />PLANNING</Title>

                <div className="flex overflow-x-auto gap-10 px-4 max-w-6xl mx-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    {/* Info Card */}
                    <div className="snap-center flex-shrink-0 bg-white border border-gray-300 rounded-2xl shadow-sm p-8 max-w-xs text-center">
                        <h2 className="text-2xl font-semibold mb-4">Unit 1R</h2>
                        <p className="mb-1"><strong>Area:</strong> 546.27 sqft</p>
                        <p className="mb-4"><strong>Price:</strong> $1,020,400</p>
                        <div className="space-y-1 text-lg">
                            <p>🛏️ 1 Bed</p>
                            <p>🛁 1 Bath</p>
                            <p>📐 Type: 1BD, Type A, W.B</p>
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <button className="px-5 py-2 rounded-full border-2 border-black font-semibold hover:bg-black hover:text-white transition">
                                PDF
                            </button>
                            <button className="px-5 py-2 rounded-full border-2 border-black font-semibold hover:bg-black hover:text-white transition">
                                COMPARE
                            </button>
                            <button className="px-5 py-2 rounded-full border-2 border-black font-semibold hover:bg-black hover:text-white transition">
                                ON 3D
                            </button>
                            <button className="px-5 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition">
                                CALL BACK
                            </button>
                        </div>
                    </div>

                    {/* Image Box */}
                    <div className="snap-center flex-shrink-0 max-w-sm flex flex-col items-center">
                        <img
                            src={roomImages[roomIndex]}
                            alt="Floor Plan"
                            onClick={() => setPopupSrc(roomImages[roomIndex])}
                            className="rounded-2xl shadow-md cursor-pointer hover:scale-[1.02] transition-transform max-w-full"
                        />
                        <div className="mt-4 text-gray-600 text-center space-y-1">
                            <p className="font-semibold">1st Floor</p>
                            <p>Total area: 546.27 sqft</p>
                            <p>Living area: 491.13 sqft</p>
                        </div>
                    </div>

                    {/* Interior Highlights Card */}
                    <div className="snap-center flex-shrink-0 bg-white border border-gray-300 rounded-2xl shadow-sm p-8 max-w-xs text-center">
                        <h2 className="text-2xl font-semibold mb-4">Interior Highlights</h2>
                        <p className="mb-2">High ceilings</p>
                        <p className="mb-2">Smart lighting</p>
                        <p>Luxury wood flooring</p>
                    </div>
                </div>
            </section>

            {/* Room Tour Section */}
            <section className="py-20 border-b border-gray-300">
                <Title>ROOM<br />TOUR</Title>

                <div className="flex flex-col items-center gap-6 max-w-xl mx-auto px-4">
                    <div className="w-full rounded-2xl overflow-hidden shadow-md cursor-pointer" onClick={() => setPopupSrc(roomImages[roomIndex])}>
                        <img src={roomImages[roomIndex]} alt="Room Tour" className="w-full object-cover" />
                    </div>

                    <div className="flex gap-6">
                        <button
                            onClick={() => updateCarousel("room", -1)}
                            className="px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition font-semibold"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => updateCarousel("room", 1)}
                            className="px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition font-semibold"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>

            {/* Floor Plan Section */}
            <section className="py-20 border-b border-gray-300">
                <Title>FLOOR<br />PLAN</Title>
                <div className="max-w-lg mx-auto px-4">
                    <img
                        src="/static/assets/floor-plan.png"
                        alt="Full Floor Plan"
                        onClick={() => setPopupSrc("/static/assets/floor-plan.png")}
                        className="rounded-2xl shadow-md cursor-pointer hover:scale-[1.03] transition-transform w-full"
                    />
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-20 border-b border-gray-300">
                <Title>GALLERY</Title>

                <div className="flex flex-col items-center gap-6 max-w-xl mx-auto px-4">
                    <div className="w-full rounded-2xl overflow-hidden shadow-md cursor-pointer" onClick={() => setPopupSrc(galleryImages[galleryIndex])}>
                        <img src={galleryImages[galleryIndex]} alt="Gallery" className="w-full object-cover" />
                    </div>

                    <div className="flex gap-6">
                        <button
                            onClick={() => updateCarousel("gallery", -1)}
                            className="px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition font-semibold"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => updateCarousel("gallery", 1)}
                            className="px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition font-semibold"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>

            {/* Popup */}
            {popupSrc && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 cursor-pointer"
                    onClick={() => setPopupSrc(null)}
                >
                    <img
                        src={popupSrc}
                        alt="Popup"
                        className="max-w-[90%] max-h-[90%] rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={() => setPopupSrc(null)}
                        className="absolute top-8 right-8 text-white text-4xl font-bold cursor-pointer select-none"
                    >
                        &times;
                    </button>
                </div>
            )}

            {/* Bottom Navbar */}
            <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-full shadow-md px-6 py-3 flex gap-5 z-50 max-w-md justify-center">
                <button
                    className="bg-black text-white rounded-full px-5 py-2 font-semibold hover:bg-gray-800 transition"
                    onClick={() => alert("Request a callback")}
                >
                    CALL BACK
                </button>
                <button
                    className="border border-black rounded-full px-5 py-2 font-semibold hover:bg-black hover:text-white transition"
                    onClick={() => alert("Downloading PDF")}
                >
                    PDF DOWNLOAD
                </button>
                <button
                    className="border border-black rounded-full px-5 py-2 font-semibold hover:bg-black hover:text-white transition"
                    onClick={() => window.history.back()}
                >
                    GO BACK
                </button>
            </div>
        </div>
    );
}
