import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import OutfitImage from './components/OutfitImage';
import OutfitRecommendations from './components/OutfitRecommendations';
import OutfitIdeas from './components/OutfitIdeas';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile'; // Import komponen Profil

function App() {
  const aboutUsRef = useRef(null); // Ref untuk AboutUs section
  const outfitIdeasRef = useRef(null); // Ref untuk OutfitIdeas section

  const handleScrollToAboutUs = () => {
    if (aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToOutfitIdeas = () => {
    if (outfitIdeasRef.current) {
      outfitIdeasRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-blue-100">
        <Navbar onExploreClick={handleScrollToOutfitIdeas} onAboutClick={handleScrollToAboutUs} />

        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Signup Route */}
          <Route path="/signup" element={<SignUp />} />

          {/* Halaman Profil */}
          <Route path="/profile" element={<Profile />} />

          {/* Main Page */}
          <Route
            path="/"
            element={
              <>
                <div className="flex items-center justify-center min-h-screen">
                  <div className="grid grid-cols-2 items-center gap-10 px-6">
                    <OutfitImage />
                  </div>
                </div>

                {/* Outfit Recommendations Section */}
                <div>
                  <OutfitRecommendations onExploreClick={handleScrollToOutfitIdeas} />
                </div>

                {/* Outfit Ideas Section */}
                <div ref={outfitIdeasRef}>
                  <OutfitIdeas />
                </div>

                {/* About Us Section */}
                <div ref={aboutUsRef}>
                  <AboutUs />
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
