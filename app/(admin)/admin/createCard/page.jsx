'use client'
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import jwt from 'jsonwebtoken';

const Signup = () => {
    const [isLoading, setLoading] = useState(false);
    const [responseMsg, setResponse] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        thumbnail: '',
        tags: [], // Initialize as an empty array
        summary: '',
        siteurl: '',
    });

    const [thumbnailURL, setThumbnailURL] = useState(''); // New state variable for image URL

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTagsChange = (e) => {
        const tags = e.target.value.split(',');
        setFormData({ ...formData, tags });
    };

    const handleImageUpload = async (e) => {
        const imageObject = e.target.files[0];
        const formData = new FormData();
        formData.append('image', imageObject);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=6df06469fa4212805a486b5af0d39c6c`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                console.log(data.data.url);
                setThumbnailURL(data.data.url); // Update the thumbnail URL state
            }
        } catch (error) {
            console.error('An error occurred during image upload:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataPayload = {
            ...formData,
            thumbnail: thumbnailURL, // Use the thumbnail URL from the state
        };

        console.log(formDataPayload);
        // Rest of your submit code remains the same

        try {
            const response = await fetch('/api/createCard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('userToken'),
                },
                body: JSON.stringify(formDataPayload),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log(responseData);
                setResponse(responseData.message);

                setTimeout(() => {
                    window.location.reload();
                }, 300);

            } else {
                console.log(responseData);
                setResponse(responseData.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setResponse('An Error Occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let decoded = jwt.decode(localStorage.getItem('userToken'));

        if (!decoded || decoded.role !== 'admin') {
            window.location.href = './';
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="text-center mt-2 text-gray-500">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Tool</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="tags">
                            Tags (Comma-separated)
                        </label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags.join(',')}
                            onChange={handleTagsChange}
                            className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="summary">
                            Summary
                        </label>
                        <textarea
                            id="summary"
                            name="summary"
                            value={formData.summary}
                            onChange={handleChange}
                            className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="thumbnail">
                            Thumbnail (Image-URL)
                        </label>
                        <input
                            type="text"
                            id="thumbnail"
                            name="thumbnail"
                            value={formData.thumbnail}
                            onChange={handleChange}
                            className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="image">
                            Or Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImageUpload}
                            className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
                        />
                        <p className='text-xs text-gray-500'>{thumbnailURL && (thumbnailURL)}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="siteurl">
                            Site URL
                        </label>
                        <input
                            type="text"
                            id="siteurl"
                            name="siteurl"
                            value={formData.siteurl}
                            onChange={handleChange}
                            className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover-bg-blue-600 transition duration-300 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <span>
                                <Loader2 className="animate-spin" />
                            </span>
                        ) : (
                            <span>Submit</span>
                        )}
                    </button>

                    {responseMsg.length > 0 && (
                        <div className="text-center m-3 text-sm text-gray-500">
                            <span> {responseMsg}</span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Signup;
