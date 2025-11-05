import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import users from "../data/users.json"; // Static JSON "DB"

const AdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  if (loggedIn) {
    return <Navigate to="/dashboard" state={{ email }} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-md p-10">
        {/* Branding / Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            BA
          </div>
          <h1 className="text-2xl font-bold mt-4 text-gray-800">
            Architecture Admin
          </h1>
          <p className="text-gray-500 mt-1 text-center">
            Sign in to access your projects dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@architecture.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          &copy; 2025 Building & Architecture Admin
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
