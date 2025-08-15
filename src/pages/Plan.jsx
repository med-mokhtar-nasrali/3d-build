import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Phone, FileText, ArrowLeft, Eye, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

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
];

const floorPlanImages = [
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773534/IMG_8305_hrnzcx.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_83000_jgd2xr.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_8296_j22uz6.jpg",
];

// Custom Next/Prev Buttons
const Arrow = ({ onClick, direction }) => (
    <div
        className={`absolute top-1/2 z-10 -translate-y-1/2 bg-black text-white rounded-full p-3 cursor-pointer hover:bg-gray-800`}
        style={{ [direction === "next" ? "right" : "left"]: "20px" }}
        onClick={onClick}
    >
        {direction === "next" ? "→" : "←"}
    </div>
);

export default function Plan() {
    const [popupSrc, setPopupSrc] = useState(null);
    const [roomIndex, setRoomIndex] = useState(0);
    const [floorIndex, setFloorIndex] = useState(0);
    const [galleryIndex, setGalleryIndex] = useState(0);

    const Title = ({ children }) => (
        <div className="text-center max-w-5xl mx-auto px-4 mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold uppercase leading-tight tracking-widest select-none">
                {children}
            </h1>
            <span className="block h-1 w-20 bg-black mx-auto rounded-full mt-3 transition-all duration-300 hover:w-28"></span>
        </div>
    );

    const renderSlider = (images, activeIndex, setActiveIndex) => {
        const settings = {
            infinite: true,
            centerMode: true,
            centerPadding: "0px",
            slidesToShow: 3,
            autoplay: true,
            autoplaySpeed: 3000,
            nextArrow: <Arrow direction="next" />,
            prevArrow: <Arrow direction="prev" />,
            beforeChange: (current, next) => setActiveIndex(next),
            responsive: [
                { breakpoint: 1024, settings: { slidesToShow: 1, centerPadding: "0px" } },
                { breakpoint: 640, settings: { slidesToShow: 1, centerPadding: "0px" } },
            ],
        };

        return (
            <div className="relative">
                <Slider {...settings}>
                    {images.map((src, i) => (
                        <div key={i} className="px-2">
                            <div
                                className={`cursor-pointer overflow-hidden rounded-3xl shadow-lg transition-transform duration-500 ${i === activeIndex ? "scale-105" : "scale-90 opacity-70"
                                    }`}
                                onClick={() => setPopupSrc(src)}
                            >
                                <img src={src} alt={`Slide ${i + 1}`} className="w-full h-96 object-cover" />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">
            {/* Property Planning Section */}
            <section className="py-10 border-b border-gray-300">
                <Title>
                    PROPERTY PLANNING
                </Title>

                <div className="max-w-7xl mx-auto px-4">
                    {/* Property Header Info */}
                    <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                            <span>HOUSE: 1</span>
                            <span>FLOOR: 22</span>
                            <span>NUMBER: 8</span>
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">AVAILABLE</span>
                        </div>
                        <div className="text-sm text-gray-600">TYPE: 1 BED TYPE A, VAR. 3</div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Left Panel - Property Details */}
                        <div className="lg:col-span-1 space-y-6">
                            <div>
                                <div className="text-4xl font-bold mb-2">1R / 546.27sqft</div>
                                <div className="text-sm text-gray-600 mb-4">$ per sqft 1,868</div>
                                <div className="text-3xl font-bold text-green-600">$ 1,020,400</div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-3 font-semibold hover:bg-gray-100 transition"
                                >
                                    <FileText size={16} /> PDF
                                </button>
                                <button
                                    className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-3 font-semibold hover:bg-gray-100 transition"
                                >
                                    <BarChart3 size={16} /> COMPARE
                                </button>
                                <button
                                    className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-3 font-semibold hover:bg-gray-100 transition"
                                >
                                    <Eye size={16} /> ON 3D
                                </button>
                            </div>

                            {/* Call Back Button */}
                            <button
                                className="w-full bg-black text-white rounded-lg px-4 py-3 font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
                                onClick={() => alert("Request a callback")}
                            >
                                <Phone size={16} /> CALL BACK
                            </button>
                        </div>

                        {/* Center - Floor Plan */}
                        <div className="lg:col-span-2">
                            <div
                                className="bg-white rounded-3xl shadow-lg p-8 cursor-pointer hover:scale-[1.02] transition-transform"
                                onClick={() => setPopupSrc("https://res.cloudinary.com/dzbmwlwra/image/upload/v1754778241/floor-plan_jvww4l.png")}
                            >
                                <img src="https://res.cloudinary.com/dzbmwlwra/image/upload/v1754778241/floor-plan_jvww4l.png" alt="Floor Plan" className="w-full h-auto rounded-2xl" />
                            </div>
                        </div>

                        {/* Right Panel - Floor Info */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl shadow-lg p-6">
                                <h3 className="text-xl font-bold mb-6">1ST FLOOR</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total area:</span>
                                        <span className="font-semibold">546.27 sqft</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Living area:</span>
                                        <span className="font-semibold">491.91 sqft</span>
                                    </div>
                                </div>

                                <button
                                    className="w-full mt-8 bg-black text-white rounded-full px-4 py-3 font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
                                    onClick={() => alert("Request a callback")}
                                >
                                    <Phone size={16} /> CALL BACK
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Additional Property Images */}
                    <div className="mt-16 grid md:grid-cols-3 gap-6">
                        <div
                            className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                            onClick={() => setPopupSrc("https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773545/4_bk3bvu.jpg")}
                        >
                            <img src="https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773545/4_bk3bvu.jpg" alt="Living Room" className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <h4 className="font-semibold">Living Room</h4>
                                <p className="text-sm text-gray-600">Spacious and modern design</p>
                            </div>
                        </div>

                        <div
                            className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                            onClick={() => setPopupSrc("https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773545/1_wus98m.jpg")}
                        >
                            <img src="https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773545/1_wus98m.jpg" alt="Bedroom" className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <h4 className="font-semibold">Bedroom</h4>
                                <p className="text-sm text-gray-600">Comfortable sleeping area</p>
                            </div>
                        </div>

                        <div
                            className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                            onClick={() => setPopupSrc("https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773544/3_mtdj5s.jpg")}
                        >
                            <img src="https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773544/3_mtdj5s.jpg" alt="Kitchen" className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <h4 className="font-semibold">Kitchen</h4>
                                <p className="text-sm text-gray-600">Fully equipped modern kitchen</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Room Tour */}
            <section section className="py-24 border-b border-gray-300" >
                <Title>ROOM TOUR</Title>
                {renderSlider(roomImages, roomIndex, setRoomIndex)}
            </section >

            {/* Floor Plan */}
            <section section className="py-24 border-b border-gray-300" >
                <Title>FLOOR PLAN</Title>
                {renderSlider(floorPlanImages, floorIndex, setFloorIndex)}
            </section >

            {/* Gallery */}
            <section section className="py-24 border-b border-gray-300" >
                <Title>GALLERY</Title>
                {renderSlider(galleryImages, galleryIndex, setGalleryIndex)}
            </section >

            {/* Popup */}
            {
                popupSrc && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 cursor-pointer"
                        onClick={() => setPopupSrc(null)}
                    >
                        <img
                            src={popupSrc}
                            alt="Popup"
                            className="max-w-[90%] max-h-[90%] rounded-3xl shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={() => setPopupSrc(null)}
                            className="absolute top-8 right-8 text-white text-5xl font-bold cursor-pointer select-none"
                            aria-label="Close popup"
                        >
                            &times;
                        </button>
                    </div>
                )
            }

            {/* Bottom Navbar */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-300 rounded-full shadow-lg px-6 py-2 flex gap-4 z-50 max-w-md justify-center">
                <button
                    className="flex items-center gap-2 bg-black text-white rounded-full px-4 py-2 font-semibold hover:bg-gray-900 transition transform hover:scale-105"
                    onClick={() => alert("Request a callback")}
                >
                    <Phone size={16} /> CALL BACK
                </button>

                <button
                    className="flex items-center gap-2 border border-black rounded-full px-4 py-2 font-semibold hover:bg-black hover:text-white transition transform hover:scale-105"
                    onClick={() => alert("Downloading PDF")}
                >
                    <FileText size={16} /> PDF
                </button>

                <button
                    className="flex items-center gap-2 border border-black rounded-full px-4 py-2 font-semibold hover:bg-black hover:text-white transition transform hover:scale-105"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft size={16} /> GO BACK
                </button>
            </div>
        </div >
    );
}