import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Location from './components/Location';
import Technology from './components/Technology';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Plan from './pages/plan';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <main className="flex-grow">
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
