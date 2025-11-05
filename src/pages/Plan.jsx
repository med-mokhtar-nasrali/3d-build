import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import houses from "../data/houses.json"; // Add your JSON "DB" here
import HouseCommentForm from './HouseCommentForm'; // adjust path
import { houseImages } from "../data/houseImages";

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

const floorPlanImages = [
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773534/IMG_8305_hrnzcx.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_83000_jgd2xr.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_8296_j22uz6.jpg",
    "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773537/IMG_8300_jsyi0x.jpg",
];

export default function Plan() {
    
    const navigate = useNavigate();
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [hoveredHouseId, setHoveredHouseId] = useState(null);
    const [roomIndex, setRoomIndex] = useState(0);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [floorIndex, setFloorIndex] = useState(0);
    const [popupSrc, setPopupSrc] = useState(null);

    const currentImage = houseImages.find(
        (img) => img.id === hoveredHouseId
    )?.src;

    const updateCarousel = (type, increment) => {
        if (type === "room") {
            setRoomIndex((prev) => (prev + increment + roomImages.length) % roomImages.length);
        } else if (type === "gallery") {
            setGalleryIndex((prev) => (prev + increment + galleryImages.length) % galleryImages.length);
        } else if (type === "floor") {
            setFloorIndex((prev) => (prev + increment + floorPlanImages.length) % floorPlanImages.length);
        }
    };
        const handleHouseClick = (houseId) => {
  const house = houses.find(h => h.id === houseId);
  if (house && house.state === "actif") {
    console.log("Clicked house:", houseId);
    navigate(`/house/${houseId}`); // WITH HashRouter this is fine
  }
};




    const Title = ({ children }) => (
        <div className="text-center max-w-5xl mx-auto px-4 mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold uppercase leading-tight tracking-widest select-none">
                {children}
            </h1>
            <span className="block h-1 w-20 bg-black mx-auto rounded-full mt-3 transition-all duration-300 hover:w-28"></span>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">
            
            
            {/* Property Planning Section */}
            <section className="py-24 border-b border-gray-300">
                <Title>PROPERTY<br />PLANNING</Title>

                <div className="flex overflow-x-auto gap-10 px-6 max-w-7xl mx-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                    {/* Info Card */}
                    <div className="snap-center flex-shrink-0 bg-white border border-gray-300 rounded-3xl shadow-md p-10 max-w-xs text-center flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Unit 1R</h2>
                            <p className="mb-2 text-lg"><strong>Area:</strong> 546.27 sqft</p>
                            <p className="mb-6 text-lg"><strong>Price:</strong> $1,020,400</p>
                            <div className="space-y-3 text-lg">
                                <p>🛏️ 1 Bed</p>
                                <p>🛁 1 Bath</p>
                                <p>📐 Type: 1BD, Type A, W.B</p>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <button className="px-6 py-3 rounded-full border-2 border-black font-semibold hover:bg-black hover:text-white transition">
                                PDF
                            </button>
                            <button className="px-6 py-3 rounded-full border-2 border-black font-semibold hover:bg-black hover:text-white transition">
                                COMPARE
                            </button>
                            <button className="px-6 py-3 rounded-full border-2 border-black font-semibold hover:bg-black hover:text-white transition">
                                ON 3D
                            </button>
                            <button className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition">
                                CALL BACK
                            </button>
                        </div>
                    </div>

                    {/* Image Box with static image */}
                    <div className="snap-center flex-shrink-0 max-w-md flex flex-col items-center">
                        <img
                            src="https://res.cloudinary.com/dzbmwlwra/image/upload/v1754778241/floor-plan_jvww4l.png"
                            alt="Floor Plan"
                            className="rounded-3xl shadow-lg cursor-pointer hover:scale-[1.03] transition-transform max-w-full"
                        />
                        <div className="mt-6 text-gray-700 text-center space-y-1">
                            <p className="font-semibold">Floor Plan</p>
                            <p>Total area: 546.27 sqft</p>
                            <p>Living area: 491.13 sqft</p>
                        </div>
                    </div>

                    {/* Interior Highlights Card */}
                    <div className="snap-center flex-shrink-0 bg-white border border-gray-300 rounded-3xl shadow-md p-10 max-w-xs text-center">
                        <h2 className="text-3xl font-bold mb-6">Interior Highlights</h2>
                        <p className="mb-3 text-lg">High ceilings</p>
                        <p className="mb-3 text-lg">Smart lighting</p>
                        <p className="text-lg">Luxury wood flooring</p>
                    </div>
                </div>
            </section>


            {/* Room Tour Section */}
            <section className="py-24 border-b border-gray-300">
                <Title>ROOM<br />TOUR</Title>

                <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto px-4">
                    <div
                        className="w-full rounded-3xl overflow-hidden shadow-lg cursor-pointer"
                        onClick={() => setPopupSrc(roomImages[roomIndex])}
                    >
                        <img src={roomImages[roomIndex]} alt="Room Tour" className="w-full object-cover" />
                    </div>

                    <div className="flex gap-8">
                        <button
                            onClick={() => updateCarousel("room", -1)}
                            className="px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition font-semibold"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => updateCarousel("room", 1)}
                            className="px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition font-semibold"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>

            {/* Floor Plan Section */}
            <section className="py-24 border-b border-gray-300">
                <Title>FLOOR<br />PLAN</Title>
                <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto px-4">
                    <div
                        className="w-full rounded-3xl overflow-hidden shadow-lg cursor-pointer"
                        onClick={() => setPopupSrc(floorPlanImages[floorIndex])}
                    >
                        <img
                            src={floorPlanImages[floorIndex]}
                            alt="Floor Plan"
                            className="w-full object-cover"
                        />
                    </div>

                    <div className="flex gap-8">
                        <button
                            onClick={() => updateCarousel("floor", -1)}
                            className="px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition font-semibold"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => updateCarousel("floor", 1)}
                            className="px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition font-semibold"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-24 border-b border-gray-300">
                <Title>GALLERY</Title>

                <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto px-4">
                    <div
                        className="w-full rounded-3xl overflow-hidden shadow-lg cursor-pointer"
                        onClick={() => setPopupSrc(galleryImages[galleryIndex])}
                    >
                        <img src={galleryImages[galleryIndex]} alt="Gallery" className="w-full object-cover" />
                    </div>

                    <div className="flex gap-8">
                        <button
                            onClick={() => updateCarousel("gallery", -1)}
                            className="px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition font-semibold"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => updateCarousel("gallery", 1)}
                            className="px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition font-semibold"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
{/* Houses Section */}
<section className="relative py-16 border-b border-gray-300">
  <Title> CHOOSE YOUR HOUSE </Title>

  {/* Background image */}
<div
  className="relative w-full h-[800px] bg-contain bg-center bg-no-repeat rounded-lg overflow-hidden max-w-7xl mx-auto"
  style={{
    backgroundImage: `url(${
      currentImage ||
      "https://res.cloudinary.com/dzbmwlwra/image/upload/v1762360930/49ba186a-621c-4825-859e-ff097bec92c5_rdji7t.jpg"
    })`,
  }}
>

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/20"></div>

    {/* Buttons container */}
    <div className="absolute top-4 left-0 right-0 flex overflow-x-auto space-x-4 px-4 py-2 flex-nowrap scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {houses
        .filter((house) => house.type === "a") // ✅ only show type "a"
        .map((house) => (
        <button
          key={house.id}
          onClick={() => handleHouseClick(house.id)}
          onMouseEnter={() => setHoveredHouseId(house.id)}
          onMouseLeave={() => setHoveredHouseId(null)}
          disabled={house.state !== "actif"}
          className={`flex-shrink-0 min-w-[80px] border border-black rounded-full px-6 py-2 font-semibold transition backdrop-blur-sm
            ${house.state === "actif"
              ? "hover:bg-black hover:text-white bg-white/80 text-black"
              : "bg-gray-400/70 text-gray-800 cursor-not-allowed"}`}
        >
          {house.number} {house.state !== "actif" ? "(Sold)" : ""}
        </button>
      ))}
    </div>
  </div>
  <br /><br />
</section>





            {/* Popup */}
            {popupSrc && (
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
            )}

            {/* Bottom Navbar */}
<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-full shadow-lg px-4 py-2 flex gap-3 z-50 max-w-md justify-center text-sm">
  <button
    className="bg-black text-white rounded-full px-3 py-1.5 font-medium hover:bg-gray-900 transition"
    onClick={() => alert("Request a callback")}
  >
    CALL BACK
  </button>
  <button
    className="border border-black rounded-full px-3 py-1.5 font-medium hover:bg-black hover:text-white transition"
    onClick={() => alert("Downloading PDF")}
  >
    PDF DOWNLOAD
  </button>
  <button
    className="border border-black rounded-full px-3 py-1.5 font-medium hover:bg-black hover:text-white transition"
    onClick={() => window.history.back()}
  >
    GO BACK
  </button>
</div>

        </div>
    );
}
