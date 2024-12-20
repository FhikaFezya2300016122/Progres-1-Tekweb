import React, { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("feed"); // Menyimpan tab yang aktif (Feed atau Like)
  const [feeds, setFeeds] = useState([]); // State untuk foto di feed
  const [newFeedPhoto, setNewFeedPhoto] = useState(null);

  const [profilePhoto, setProfilePhoto] = useState(null); // State untuk foto profil
  const [username, setUsername] = useState(localStorage.getItem("username") || "rubbyssunn");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false); // State dialog Edit Profil

  // Handler untuk memilih foto baru di Feed
  const handleNewFeedChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFeedPhoto(URL.createObjectURL(file));
    }
  };

  // Handler untuk menambahkan foto ke Feed
  const handleAddFeed = () => {
    if (newFeedPhoto) {
      setFeeds([...feeds, newFeedPhoto]);
      setNewFeedPhoto(null);
    }
  };

  // Handler untuk memilih foto profil
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  // Handler untuk menyimpan perubahan Edit Profil
  const handleSaveProfile = () => {
    localStorage.setItem("username", username);
    setIsEditProfileOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Foto Profil */}
      <div className="flex flex-col items-center space-y-2 mb-6">
        <label htmlFor="uploadProfilePhoto" className="cursor-pointer">
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-800 overflow-hidden">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              "S"
            )}
          </div>
        </label>
        <input
          id="uploadProfilePhoto"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfilePhotoChange}
        />
        <h1 className="text-2xl font-bold text-gray-900">{username}</h1>
      </div>

      {/* Tombol Edit Profil */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setIsEditProfileOpen(true)}
          className="bg-gray-200 px-4 py-2 rounded-full text-gray-800 hover:bg-gray-300"
        >
          Edit profil
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-8 border-b border-gray-300 mb-4">
        <button
          className={`pb-2 ${activeTab === "feed" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
          onClick={() => setActiveTab("feed")}
        >
          Feed
        </button>
        <button
          className={`pb-2 ${activeTab === "like" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
          onClick={() => setActiveTab("like")}
        >
          Like
        </button>
      </div>

      {/* Konten Tab */}
      <div className="w-full text-center text-gray-500">
        {activeTab === "feed" ? (
          <div>
            {/* Galeri Feed */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {feeds.length > 0 ? (
                feeds.map((feed, index) => (
                  <img
                    key={index}
                    src={feed}
                    alt={`Feed ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                ))
              ) : (
                <p>Tidak ada foto di Feed.</p>
              )}
            </div>

            {/* Tambahkan Foto */}
            <div className="mt-6">
              <label
                htmlFor="uploadFeed"
                className="w-12 h-12 flex items-center justify-center bg-gray-300 text-gray-600 rounded-full text-2xl cursor-pointer hover:bg-gray-400"
              >
                +
              </label>
              <input
                id="uploadFeed"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleNewFeedChange}
              />
              {newFeedPhoto && (
                <div className="mt-4">
                  <img
                    src={newFeedPhoto}
                    alt="New Feed"
                    className="w-32 h-32 object-cover rounded-lg mx-auto mb-2"
                  />
                  <button
                    onClick={handleAddFeed}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Tambahkan ke Feed
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Tidak ada foto di Like.</p>
        )}
      </div>

      {/* Modal Edit Profil */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Profil</h2>
            <label className="block mb-2 text-gray-700">
              Ganti Foto Profil
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
                className="mt-2"
              />
            </label>
            <label className="block mb-4 text-gray-700">
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg mt-2"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
