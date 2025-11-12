import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Location from "./components/Location";
import Technology from "./components/Technology";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Plan from "./pages/Plan";
import Planb from "./pages/Planb";

import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/Dashboard";
import VideoPlayer from "./components/VideoPlayer";
import Loader from "./components/Loader";
import { videos } from "./components/videosList";
import HouseCommentForm from "./pages/HouseCommentForm";
import ChatBot from "./components/ChatBot";
import { ChatProvider } from "./context/ChatContext";
import NotFound from "./pages/NotFound";

/* --- Global simple sound helper (no extra deps) --- */
function GlobalSounds() {
  const okRef = useRef(null);
  const errRef = useRef(null);

  useEffect(() => {
    // Expose a simple global sound API
    window.playUiSound = (type = "ok") => {
      const el = type === "error" ? errRef.current : okRef.current;
      if (!el) return;
      try {
        el.currentTime = 0;
        el.play();
      } catch { }
    };
    return () => {
      if (window.playUiSound) delete window.playUiSound;
    };
  }, []);

  return (
    <>
      {/* Put your mp3 files in public/sounds/ or adjust paths */}
      <audio ref={okRef} preload="auto" src="/sounds/success.mp3" />
      <audio ref={errRef} preload="auto" src="/sounds/error.mp3" />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/admin" || location.pathname === "/dashboard";

  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  // Loader logic only for main page
  useEffect(() => {
    if (hideLayout) return; // skip loader for admin

    const initialVideos = videos.slice(0, 3);
    let loadedCount = 0;

    const preloadVideo = (video) =>
      new Promise((resolve) => {
        const vid = document.createElement("video");
        vid.src = video.src;
        vid.preload = "auto";
        vid.oncanplaythrough = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / initialVideos.length) * 100));
          resolve();
        };
        vid.onerror = resolve;
      });

    Promise.all(initialVideos.map(preloadVideo)).then(() => {
      setTimeout(() => setIsReady(true), 300);
      videos.slice(3).forEach((video) => {
        const bgVid = document.createElement("video");
        bgVid.src = video.src;
        bgVid.preload = "auto";
        bgVid.load();
      });
    });
  }, [hideLayout]);

  if (!isReady && !hideLayout) return <Loader progress={progress} />;

  return (
    <div
      className={
        hideLayout
          ? "min-h-screen bg-white flex flex-col items-center justify-center"
          : "bg-gray-100 min-h-screen flex flex-col"
      }
    >
      {!hideLayout && <Navbar />}

      {/* Toasts available on every route */}
      <ToastContainer
        position="top-center"
        autoClose={2800}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Global sounds  */}
      <GlobalSounds />

      <main className="flex-grow w-full">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <VideoPlayer />
                <Location />
                <Technology />
                <Contact />
                <Projects />
              </>
            }
          />
          <Route path="/plan" element={<Plan />} />
          <Route path="/planb" element={<Planb />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/dashboard"
            element={
              location.state?.email ? (
                <Dashboard email={location.state.email} />
              ) : (
                <Navigate to="/admin" replace />
              )
            }
          />
          <Route path="/house/:id" element={<HouseCommentForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
      {!hideLayout && <ChatBot />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </Router>
  );
}

export default App;
