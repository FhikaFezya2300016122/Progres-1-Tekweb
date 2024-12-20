import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = ({ onExploreClick, onAboutClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const username = localStorage.getItem('username'); // Mendapatkan username dari Local Storage
  const navigate = useNavigate(); // Hook untuk navigasi programatis

  // Mengontrol perubahan pada input pencarian
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Menangani pengiriman pencarian
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search for:', searchQuery); // Tambahkan logika pencarian di sini
  };

  // Menangani logout pengguna
  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/'); // Arahkan ke halaman utama setelah logout
  };

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-lg">
      {/* Kiri */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-700 font-medium cursor-pointer">Home</Link> {/* Tautan ke Home */}

        {/* Input Pencarian */}
        <form onSubmit={handleSearchSubmit} className="ml-4 flex">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="border px-6 py-2 rounded-full"
          />
          <button
            type="submit"
            className="bg-red-900 text-white px-4 py-2 rounded-full ml-2"
          >
            Search
          </button>
        </form>
      </div>

      {/* Tengah */}
      <h1 className="text-3xl font-extrabold text-red-900">Dress Up</h1>

      {/* Kanan */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onAboutClick}
          className="font-medium text-gray-700 cursor-pointer"
        >
          About
        </button>
        {username ? (
          <div className="flex items-center space-x-4">
            {/* Tautan ke Halaman Profil */}
            <Link to="/profile">
              <span className="text-gray-700 font-medium cursor-pointer">
                {username}
              </span>
            </Link>
            {/* Tombol Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-900 text-white rounded-full hover:bg-red-700"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            {/* Tautan Login */}
            <Link to="/login">
              <button className="px-4 py-2 bg-red-900 text-white rounded-full hover:bg-red-700">
                Log in
              </button>
            </Link>
            {/* Tautan Signup */}
            <Link to="/signup">
              <button className="px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
