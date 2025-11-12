import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import housesData from "../data/houses.json";
import commentsData from "../data/comments.json";

// Simulated in-memory DB
let houses = [...housesData];
let comments = [...commentsData];

const Dashboard = ({ email }) => {
  const navigate = useNavigate();
  const [houseList, setHouseList] = useState(houses);
  const [selectedHouseComments, setSelectedHouseComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeHouseId, setActiveHouseId] = useState(null);

  const handleLogout = () => {
    navigate("/admin", { replace: true });
  };

  const handleShowComments = (houseId) => {
    const houseComments = comments.filter((c) => c.houseId === houseId);
    setSelectedHouseComments(houseComments);
    setShowModal(true);
    setActiveHouseId(houseId);

    // mark seen
    comments = comments.map((c) =>
      c.houseId === houseId ? { ...c, seen: true } : c
    );
  };

  const toggleHouseState = (houseId) => {
    const updated = houseList.map((h) =>
      h.id === houseId ? { ...h, state: h.state === "actif" ? "inactif" : "actif" } : h
    );
    setHouseList(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="rounded-full border border-black px-4 py-2 font-semibold hover:bg-black hover:text-white transition"
              aria-label="Go back to site"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-[0.2em]">
                Dashboard
              </h1>
              <p className="text-gray-600 text-sm mt-1">Welcome, {email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full border border-black px-4 py-2 font-semibold hover:bg-black hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-widest">
            Houses
          </h2>
          <span className="block h-[3px] w-24 bg-black rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {houseList.map((house) => {
            const houseComments = comments.filter((c) => c.houseId === house.id);
            const newCommentsCount = houseComments.filter((c) => !c.seen).length;

            return (
              <div
                key={house.id}
                className="group bg-white/95 border border-gray-200 rounded-3xl shadow-sm hover:shadow-xl transition-shadow p-6 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold">
                      House <span className="tracking-wider">#{house.number}</span>
                    </h3>
                    <span
                      className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-xs font-semibold
                      ${house.state === "actif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${house.state === "actif" ? "bg-green-600" : "bg-red-600"
                          }`}
                      />
                      {house.state.toUpperCase()}
                    </span>
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() => toggleHouseState(house.id)}
                    className={`relative inline-flex items-center h-9 w-18 rounded-full p-1 transition-colors
                    ${house.state === "actif" ? "bg-green-500" : "bg-gray-400"}`}
                    aria-label="Toggle house state"
                  >
                    <span
                      className={`inline-block h-7 w-7 rounded-full bg-white shadow-md transform transition-transform
                      ${house.state === "actif" ? "translate-x-9" : "translate-x-0"}`}
                    />
                  </button>
                </div>

                <div className="my-5 h-px bg-gray-200" />

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleShowComments(house.id)}
                    className="relative rounded-full border border-black px-5 py-2 font-semibold hover:bg-black hover:text-white transition"
                  >
                    Comments
                    {houseComments.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {houseComments.length}
                      </span>
                    )}
                    {newCommentsCount > 0 && (
                      <span className="absolute -top-1 -left-1 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </button>

                  <div className="text-sm text-gray-500">
                    ID: <span className="font-mono">{house.id}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Comments Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white/95 backdrop-blur border border-gray-200 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-widest">
                House #{activeHouseId} Requests
              </h3>
              <button
                className="rounded-full border border-black w-9 h-9 flex items-center justify-center text-lg font-bold hover:bg-black hover:text-white transition"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              {selectedHouseComments.length > 0 ? (
                <div className="space-y-4">
                  {selectedHouseComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border border-gray-200 bg-gray-50 rounded-2xl p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-semibold">
                          {comment.name}{" "}
                          <span className="text-gray-500">({comment.request})</span>
                        </p>
                        {!comment.seen && (
                          <span className="px-2 py-0.5 text-xs bg-yellow-400 text-black rounded-full font-bold">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="mt-2">{comment.text}</p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500">
                        <p>
                          Phone: <span className="font-mono">{comment.phone}</span>
                        </p>
                        <p>
                          Date:{" "}
                          <span className="font-mono">
                            {new Date(comment.date).toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-10">
                  No requests for this house yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
