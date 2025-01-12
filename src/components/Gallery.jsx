import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    // Cek status autentikasi
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    // Fetch images
    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get('http://localhost:5000/api/feeds', {
                    params: { query }
                });

                const sortedImages = response.data.sort((a, b) => 
                    new Date(b.uploadedAt) - new Date(a.uploadedAt)
                );

                setImages(sortedImages);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
                setError("Gagal memuat gambar");
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [query]);

    // Fungsi untuk menghapus feed
    const handleDeleteFeed = async (feedId) => {
        try {
            // Konfirmasi sebelum menghapus
            const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus feed ini?');
            
            if (confirmDelete) {
                // Pastikan pengguna sudah login
                if (!user) {
                    alert('Anda harus login untuk menghapus feed');
                    return;
                }

                console.log('Menghapus feed dengan ID:', feedId);

                // Tambahkan konfigurasi axios untuk debugging
                const response = await axios.delete(`http://localhost:5000/api/feeds/${feedId}`, {
                    // Tambahkan header tambahan jika diperlukan
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    // Validasi status untuk menangani berbagai kasus
                    validateStatus: function (status) {
                        return status >= 200 && status < 300; // Default
                    }
                });
                
                // Periksa response
                if (response.status === 200) {
                    // Update state untuk menghapus gambar dari tampilan
                    setImages(prevImages => 
                        prevImages.filter(image => image.id !== feedId)
                    );

                    alert(response.data.message || 'Feed berhasil dihapus');
                } else {
                    // alert('Gagal menghapus feed: ' + response.data.message);
                }
            }
        } catch (error) {
            console.error('Gagal menghapus feed:', error);
            alert('Gagal menghapus feed: ' + 
                (error.response?.data?.message || error.message)
            );
        }
    };

    // Loading state
    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-900"></div>
        </div>
    );

    // Error state
    if (error) return (
        <div className="text-center text-red-600 p-4">
            {error}
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">
                {query ? `Hasil Pencarian: "${query}"` : "Galeri Terbaru"}
            </h2>

            {images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {images.map((image) => (
                        <div 
                            key={image.id} 
                            className="bg-white rounded-lg shadow-md overflow-hidden relative group"
                        >
                            <img
                                src={`http://localhost:5000${image.image}`}
                                alt={image.caption}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-3">
                                <h3 className="font-semibold text-sm">{image.caption}</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-gray-500">
                                        {image.category}
                                    </span>
                                    <div className="flex space-x-1">
                                        {image.tags.map((tag, index) => (
                                            <span 
                                                key={index} 
                                                className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tombol Hapus (Hanya tampil jika user terotentikasi) */}
                            {user && (
                                <button
                                    onClick={() => handleDeleteFeed(image.id)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5" 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor"
                                    >
                                        <path 
                                            fillRule="evenodd" 
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
                                            clipRule="evenodd" 
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-10">
                    Tidak ada gambar yang ditemukan
                </div>
            )}
        </div>
    );
};

export default Gallery;