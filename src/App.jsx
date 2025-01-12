import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import Profile from './components/Profile';
import AboutUs from './components/AboutUs';
import OutfitImage from './components/OutfitImage';
import OutfitRecommendations from './components/OutfitRecommendations';
import CasualComfort from './outfits/CasualComfort';
import StreetwearChic from './outfits/StreetwearChic';
import FormalElegance from './outfits/FormalElegance';
import OutfitIdeas from './components/OutfitIdeas';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  // State for storing images (with captions) and search query
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Refs for section scrolling (for AboutUs and OutfitIdeas)
  const aboutUsRef = useRef(null);
  const outfitIdeasRef = useRef(null);

  // Function to add images with captions to the global state
  const handleAddImage = (imageData) => {
    setImages((prevImages) => [...prevImages, imageData]);
  };

  // Function to handle scrolling to specific sections
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
        {/* Navbar with search and section navigation */}
        <Navbar
          onExploreClick={handleScrollToOutfitIdeas}
          onAboutClick={handleScrollToAboutUs}
          setSearchQuery={setSearchQuery} 
        />

        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Signup Route */}
          <Route path="/signup" element={<SignUp />} />

          {/* Profile Route where users can upload images with captions */}
          <Route path="/profile" element={<Profile handleAddImage={handleAddImage} />} />

          {/* Gallery Route displaying images based on search query */}
          <Route
            path="/gallery"
            element={<Gallery images={images} searchQuery={searchQuery} />}
          />

          {/* Main Page with Outfit Image and Sections */}
          <Route
            path="/"
            element={
              <>
                {/* Main Section with Outfit Image */}
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

          {/* Outfit Category Pages */}
          <Route
            path="/outfits/casual-comfort"
            element={<CasualComfort searchQuery={searchQuery} />}
          />
          <Route path="/outfits/streetwear-chic" element={<StreetwearChic searchQuery={searchQuery} />} />
          <Route path="/outfits/formal-elegance" element={<FormalElegance searchQuery={searchQuery} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
