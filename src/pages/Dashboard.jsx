import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import housesData from "../data/houses.json";
import commentsData from "../data/comments.json";

// Simulate DB in memory
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

    // Mark comments as seen
    comments = comments.map((c) =>
      c.houseId === houseId ? { ...c, seen: true } : c
    );
  };

  const toggleHouseState = (houseId) => {
    const updatedHouses = houseList.map((house) => {
      if (house.id === houseId) {
        const newState = house.state === "actif" ? "inactif" : "actif";
        return { ...house, state: newState };
      }
      return house;
    });
    setHouseList(updatedHouses);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {email}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Houses content */}
      <div className="flex-grow p-8 space-y-6">
        {houseList.map((house) => {
          const houseComments = comments.filter((c) => c.houseId === house.id);
          const newCommentsCount = houseComments.filter((c) => !c.seen).length;

          return (
            <div
              key={house.id}
              className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold text-xl">House #{house.number}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    house.state === "actif"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {house.state.toUpperCase()}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                {/* Comments button */}
                <button
                  onClick={() => handleShowComments(house.id)}
                  className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Comments
                  {houseComments.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {houseComments.length}
                    </span>
                  )}
                  {newCommentsCount > 0 && (
                    <span className="absolute -top-1 -left-1 bg-yellow-400 text-black text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      New
                    </span>
                  )}
                </button>

                {/* Toggle switch */}
                <button
                  onClick={() => toggleHouseState(house.id)}
                  className={`w-16 h-8 flex items-center rounded-full px-1 transition-colors ${
                    house.state === "actif" ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                      house.state === "actif" ? "translate-x-8" : "translate-x-0"
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Comments */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-2/3 max-h-[80vh] overflow-y-auto p-6 relative">
            <h3 className="text-2xl font-bold mb-4">
              House #{activeHouseId} Requests
            </h3>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            {selectedHouseComments.length > 0 ? (
              <div className="space-y-4">
                {selectedHouseComments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`border p-4 rounded-lg shadow-sm bg-gray-50 flex justify-between items-start`}
                  >
                    <div>
                      <p>
                        <strong>{comment.name}</strong> ({comment.request})
                        {!comment.seen && (
                          <span className="ml-2 px-1 text-xs bg-yellow-400 text-black rounded">
                            New
                          </span>
                        )}
                      </p>
                      <p>{comment.text}</p>
                      <p className="text-gray-400 text-sm">
                        Phone: {comment.phone}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Date: {new Date(comment.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No requests for this house yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
