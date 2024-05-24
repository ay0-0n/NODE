import { useState, useContext } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [eye, setEye] = useState(false);
    const [error, setError] = useState('');
    const { createUser, profileUpdate } = useContext(AuthContext); 

    const mutation = useMutation({
        mutationFn: (user) => {
            return axios.post('https://node-blogs-lyart.vercel.app/users', user);
        },
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl.value;
        const email = e.target.email.value;
        const pass = e.target.pass.value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        setError('');

        if (!name || !photoUrl || !email || !pass) {
            setError('All fields are required.');
            return;
        }

        if (!regex.test(pass)) {
            setError('Password must have at least 1 lowercase letter, 1 uppercase letter, and length at least 6');
            return;
        }

        try {
            await createUser(email, pass);
            await profileUpdate({
                displayName: name,
                photoURL: photoUrl,
            });
            const obj = {
                name: name,
                email: email,
                photoUrl: photoUrl,
            };
            mutation.mutate(obj);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <Helmet>
                <title>Node - Register</title>
            </Helmet>
            <div className='min-h-[90vh] bg-main flex justify-center items-center p-4'>
                <div className="container bg-white rounded-xl flex flex-col lg:flex-row justify-between w-full lg:w-4/5 h-auto lg:min-h-[70vh] overflow-hidden shadow-lg">
                    <div className="w-full lg:w-1/2 flex items-center justify-center bg-black relative h-64 lg:h-auto p-4">
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <h1 className="text-white text-5xl lg:text-7xl font-space-4 text-center">
                                NODE <br />
                                <span className='text-xl lg:text-2xl'>Get Started.</span>
                            </h1>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center items-center">
                        <h2 className='text-2xl mb-6 font-semibold font-space-7 text-black'>Register</h2>
                        <form className='space-y-2 w-full max-w-sm' onSubmit={handleRegister}>
                            <div>
                                <label className='block mb-1 text-gray-600'>Name</label>
                                <input name='name' type='text' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                            </div>
                            <div>
                                <label className='block mb-1 text-gray-600'>PhotoUrl</label>
                                <input name='photoUrl' type='text' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                            </div>
                            <div>
                                <label className='block mb-1 text-gray-600'>Email</label>
                                <input name='email' type='email' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                            </div>
                            <div>
                                <label className='block mb-1 text-gray-600'>Password</label>
                                <div className="relative">
                                    <input name='pass' type={eye ? "text" : "password"} className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setEye(!eye)}>
                                        {eye ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>
                            </div>
                            {error && <p className='text-red-400 mb-4 text-sm'>{error}</p>}
                            <button type='submit' className='w-full py-2 bg-black text-white rounded-md hover:bg-blue-700 transition duration-300'>Register</button>
                        </form>
                        <div className="mt-6 w-full max-w-sm flex justify-between">
                            <p>Already have an account?</p>
                            <Link to="/login" className="text-black border-[1px] px-1 font-space-4 border-black rounded-md hover:shadow-lg shadow-black">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
