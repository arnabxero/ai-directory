'use client'
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const UpdateProfile = ({ userData }) => {
    const [formData, setFormData] = useState({
        ...userData,
        password: '', // Set the password field to an empty string
    });


    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataPayload = {};

        if (formData.username && formData.username.trim() !== '') {
            formDataPayload.username = formData.username;
        }
        if (formData.email && formData.email.trim() !== '') {
            formDataPayload.email = formData.email;
        }
        if (formData.password && formData.password.trim() !== '') {
            formDataPayload.password = formData.password;
        }

        try {
            const response = await fetch('api/updateProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
                },
                body: JSON.stringify(formDataPayload),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log(responseData);
                setResponse(responseData.message);
                if (responseData.newToken) {
                    localStorage.setItem('userToken', responseData.newToken);
                }
                if (responseData.newUserData) {
                    localStorage.setItem('userData', JSON.stringify(responseData.newUserData));
                }

                setTimeout(() => {
                    window.location.href = './';
                }, 300);
            } else {
                console.error('API error:', responseData.message);
                setResponse('An Error Occurred');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setResponse('An Error Occurred');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className='items-center'>
                    <button type="submit" className="bg-blue-700 items-center text-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                        {!loading ? (<>Update Profile</>) : (<><Loader2 className='animate-spin' /></>)}
                    </button>
                </div>

                {response.length > 0 && (
                    <>
                        {response}, Refreshing in 1 second...
                    </>
                )}
            </form>
        </div>
    );
}

export default UpdateProfile;