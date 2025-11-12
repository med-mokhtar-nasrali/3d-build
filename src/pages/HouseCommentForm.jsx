import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import commentsData from "../data/comments.json";
import { houseImages } from "../data/houseImages";

let comments = [...commentsData];

const HouseCommentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [request, setRequest] = useState("call");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showImg, setShowImg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      id: comments.length + 1,
      houseId: parseInt(id),
      name,
      phone,
      request,
      text: message,
      date: new Date().toISOString(),
    };

    comments.push(newComment);
    setSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const currentHouseImage = houseImages.find((h) => h.id === parseInt(id))?.src;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl rounded-3xl border border-gray-200 bg-white/95 shadow-xl backdrop-blur">
        {/* Header */}
        <div className="px-6 sm:px-10 pt-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.25em]">
            Request for House #{id}
          </h1>
          <span className="mt-4 mb-6 block h-[3px] w-24 bg-black mx-auto rounded-full" />
        </div>

        {/* House Image Banner */}
        {currentHouseImage && (
          <div className="px-6 sm:px-10">
            <div
              className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-gray-200 shadow-md group cursor-zoom-in"
              onClick={() => setShowImg(true)}
              title="Click to view"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" ? setShowImg(true) : null)}
            >
              <img
                src={currentHouseImage}
                alt={`House ${id}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-3 right-3 text-xs font-semibold px-2 py-1 rounded-full bg-black text-white">
                VIEW
              </span>
            </div>
          </div>
        )}

        <div className="px-6 sm:px-10 pb-8">
          {/* Success */}
          {success ? (
            <div className="mt-8 mb-4 text-center">
              <p className="text-green-600 font-semibold text-lg">
                ✅ Your request has been sent successfully!
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Redirecting to home…
              </p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="mt-8 space-y-7">
              {/* Name */}
              <div className="group relative">
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="peer w-full bg-transparent px-1 py-2 text-base border-b border-gray-300 focus:outline-none focus:border-black transition-colors"
                />
                <span className="pointer-events-none absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 peer-focus:w-full" />
              </div>

              {/* Phone */}
              <div className="group relative">
                <label className="block text-sm font-semibold mb-2">Phone Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="peer w-full bg-transparent px-1 py-2 text-base border-b border-gray-300 focus:outline-none focus:border-black transition-colors"
                />
                <span className="pointer-events-none absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 peer-focus:w-full" />
              </div>

              {/* Request Type */}
              <div className="group relative">
                <label className="block text-sm font-semibold mb-2">Request Type</label>
                <select
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  className="peer w-full bg-transparent px-1 py-2 text-base border-b border-gray-300 focus:outline-none focus:border-black transition-colors"
                >
                  <option value="call">Request a Call</option>
                  <option value="meeting">Request a Meeting</option>
                </select>
                <span className="pointer-events-none absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 peer-focus:w-full" />
              </div>

              {/* Message */}
              <div className="group relative">
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  rows={5}
                  className="peer w-full bg-transparent px-1 py-2 text-base border-b border-gray-300 focus:outline-none focus:border-black transition-colors"
                />
                <span className="pointer-events-none absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 peer-focus:w-full" />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-black text-white py-3 font-semibold tracking-wide hover:bg-gray-900 active:scale-[0.99] transition"
                >
                  Send Request
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="rounded-full border border-black px-5 py-3 font-semibold hover:bg-black hover:text-white transition"
                >
                  Go Back
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {showImg && currentHouseImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowImg(false)}
          />
          <div className="relative">
            <img
              src={currentHouseImage}
              alt={`House ${id}`}
              className="max-w-[95vw] max-h-[85vh] rounded-3xl shadow-2xl"
            />
            <button
              onClick={() => setShowImg(false)}
              className="absolute -top-3 -right-3 sm:top-0 sm:right-0 translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 w-10 h-10 flex items-center justify-center text-white text-2xl font-bold hover:bg-white/15"
              aria-label="Close"
              title="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseCommentForm;
