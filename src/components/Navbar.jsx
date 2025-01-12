import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Pastikan import dari konfigurasi Firebase
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = ({ onExploreClick, onAboutClick, setSearchQuery }) => {
    const [searchQuery, setSearchQueryLocal] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Observer untuk status autentikasi
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    // Handles changes to the search input
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQueryLocal(query);
        if (setSearchQuery) {
            setSearchQuery(query);
        }
    };

    // Handles submission of the search form
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = searchQuery.toLowerCase().trim();

        // Pengecekan kategori spesifik
        if (query.includes('casual comfort') || 
            (query.includes('casual') && query.includes('comfort'))) {
            navigate('/outfits/casual-comfort');
        } else if (query.includes('formal') || 
                   query.includes('elegance') || 
                   query.includes('professional')) {
            navigate('/outfits/formal-elegance');
        } else if (query.includes('streetwear') || 
                   query.includes('chic') || 
                   query.includes('urban')) {
            navigate('/outfits/streetwear-chic');
        } else {
            navigate('/gallery');
        }
    };

    // Handles logout functionality
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    return (
        <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-lg relative">
            {/* Left Section: Search */}
            <div className="flex items-center space-x-6 w-full sm:w-auto">
                <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="border px-6 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-900 w-full sm:w-48"
                    />
                    <button
                        type="submit"
                        className="bg-red-900 text-white px-4 py-2 rounded-full ml-2 hover:bg-red-700"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/*  Logo */}
            <div className="flex justify-center sm:flex-1">
                <h1
                    className="text-3xl font-extrabold text-red-900 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    Dress Up
                </h1>
            </div>

            {/* Right Section: Menu / Authentication */}
            <div className="hidden md:flex items-center space-x-4">
                {/* About Button */}
                <button
                    onClick={onAboutClick}
                    className="font-medium text-gray-700 cursor-pointer hover:text-red-900"
                >
                    About
                </button>

                {/* Conditional Rendering based on Authentication */}
                {user ? (
                    <div className="flex items-center space-x-4">
                        <Link 
                            to="/profile" 
                            className="flex items-center space-x-2"
                        >
                            <span className="text-gray-700 font-medium hover:text-red-900">
                                {user.displayName || user.email}
                            </span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-900 text-white rounded-full hover:bg-red-700"
                        >
                            Log out
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link to="/login">
                            <button className="px-4 py-2 bg-red-900 text-white rounded-full hover:bg-red-700">
                                Log in
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300">
                                Sign up
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Hamburger Menu for Small Screens */}
            <div className="md:hidden flex items-center relative">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-700 text-2xl focus:outline-none"
                >
                    &#9776;
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <div
                        className="absolute top-16 right-0 bg-white shadow-lg rounded-lg z-50 w-48 flex flex-col space-y-2 p-4"
                        style={{ transition: 'all 0.3s ease-in-out' }}
                    >
                        <Link
                            to="/"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>

                        {user ? (
                            <>
                                <Link>
                                    <span>{user.displayName || user.email}</span>
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-700"
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red- 700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/signup"
                                    className="block px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;