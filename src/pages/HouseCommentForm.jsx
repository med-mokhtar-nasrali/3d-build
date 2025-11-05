import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import commentsData from "../data/comments.json";
import { houseImages } from "../data/houseImages"; // your image list

let comments = [...commentsData];

const HouseCommentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [request, setRequest] = useState("call");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

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
      navigate("/"); // redirect after 2s
    }, 2000);
  };

  const currentHouseImage = houseImages.find(h => h.id === parseInt(id))?.src;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl p-8 flex flex-col md:flex-row gap-6">
        
        {/* House image */}
        <div className="flex-1">
          <img
            src={currentHouseImage || "https://res.cloudinary.com/dzbmwlwra/image/upload/v1754773542/IMG_82933_lzkcpn.jpg"}
            alt={`House ${id}`}
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Form */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Request for House #{id}
          </h1>

          {success ? (
            <p className="text-green-600 font-semibold text-center text-lg">
              Your request has been sent successfully!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Request Type</label>
                <select
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-800"
                >
                  <option value="call">Request a Call</option>
                  <option value="meeting">Request a Meeting</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-800"
                  rows={5}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors font-semibold text-lg shadow-lg"
              >
                Send Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseCommentForm;
