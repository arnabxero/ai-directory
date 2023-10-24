'use client'
import React, { useState } from 'react';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import jwt from 'jsonwebtoken';

const Login = () => {
    const [isLoading, setLoading] = useState(false);
    const [responseMsg, setResponse] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to show/hide password

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const formDataPayLoad = {
            ...formData,
        };

        try {
            const response = await fetch('api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataPayLoad),
            });

            const responseData = await response.json();

            if (response.ok) {
                setResponse(responseData.message);

                localStorage.setItem('userToken', responseData.token);

                const tempUserData = jwt.decode(responseData.token);

                localStorage.setItem('userData', JSON.stringify(tempUserData));

                setTimeout(() => {
                    window.location.href = './';
                }, 300);

            } else {
                console.error(responseData);
                setResponse(responseData.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setResponse('An Error Occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className='flex flex-col items-center mt-2 text-gray-500'>
                    <a href='./' className='mb-6'>
                        <img src='/logo.png' className='rounded-lg' height={60} width={60} />
                    </a>
                    <h2 className="text-2xl font-semibold text-gray-800 my-4">Log In</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
                                required
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-2 right-2 cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <span>
                                <Loader2 className='animate-spin' />
                            </span>
                        ) : (
                            <span>Login</span>
                        )}
                    </button>

                    {responseMsg.length > 0 && (
                        <div className='text-center m-3 text-sm text-gray-500'>
                            <span> {responseMsg}</span>
                        </div>
                    )}
                    <a href='/signup'>
                        <div className='text-blue-500 mt-4'>
                            Don't have an account? Sign Up
                        </div>
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Login;
