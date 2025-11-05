import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Location from './components/Location';
import Technology from './components/Technology';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Plan from './pages/Plan';
import Planb from './pages/Planb';

import AdminPage from "./pages/AdminPage"; 
import Dashboard from "./pages/Dashboard";
import VideoPlayer from './components/VideoPlayer';
import Loader from './components/Loader';
import { videos } from './components/videosList';
import HouseCommentForm from './pages/HouseCommentForm';


function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === "/admin" || location.pathname === "/dashboard"   ;


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
    <div className={hideLayout ? "min-h-screen bg-white flex flex-col items-center justify-center" : "bg-gray-100 min-h-screen flex flex-col"}>
      {!hideLayout && <Navbar />}
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
              // Only allow access if user is logged in
              location.state?.email ? (
                <Dashboard email={location.state.email} />
              ) : (
                <Navigate to="/admin" replace />
              )
            }
          />
          <Route path="/house/:id" element={<HouseCommentForm />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
