import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Profile = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();

    // Handle image selection
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        
        if (selectedFile) {
            setImage(selectedFile);
            
            // Buat preview gambar
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Pastikan gambar dipilih
        if (!image) {
            alert('Pilih gambar terlebih dahulu');
            return;
        }

        // Pastikan pengguna sudah login
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert('Anda harus login untuk mengunggah');
            return;
        }

        // Buat FormData
        const formData = new FormData();
        formData.append('image', image);
        formData.append('caption', caption);
        formData.append('category', category);
        formData.append('tags', tags);

        try {
            const response = await axios.post('http://localhost:5000/api/addFeed', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert(response.data.message);
            navigate('/gallery'); // Redirect to gallery after successful upload
        } catch (error) {
            console.error('Gagal mengunggah feed:', error);
            alert('Gagal mengunggah feed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-red-900">Unggah Feed Baru</h2>
                    <p className="text-gray-600 mt-2">Bagikan momen fashionmu</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Upload Image */}
                    <div className="flex flex-col items-center">
                        <label 
                            htmlFor="imageUpload" 
                            className="w-full h-48 border-2 border-dashed border-red-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-400 transition duration-300"
                        >
                            {preview ? (
                                <img 
                                    src={preview} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <div className="text-center">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-12 w-12 mx-auto text-red-900" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                        />
                                    </svg>
                                    <p className="mt-2 text-gray-600">Pilih Gambar</p>
                                </div>
                            )}
                            <input 
                                id="imageUpload"
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                className="hidden" 
                                required 
                            />
                        </label>
                    </div>

                    {/* Caption Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5 text-gray-400" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4 6h16M4 10h16M4 14h16M4 18h16" 
                                />
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            value={caption} 
                            onChange={(e) => setCaption(e.target.value)} 
                            placeholder="Caption"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
                        />
                    </div>

                    {/* Category Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5 text-gray-400" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" 
                                />
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)} 
                            placeholder="Kategori"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
                        />
                    </div>

                    {/* Tags Input */}
                    <div className="relative"> <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5 text-gray-400" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" 
                                />
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            value={tags} 
                            onChange={(e) => setTags(e.target.value)} 
                            placeholder="Tags (pisahkan dengan koma)"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-red-900 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
                    >
                        Unggah Feed
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;