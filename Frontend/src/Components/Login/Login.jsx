import { useState, useContext } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);
  const [error, setError] = useState('');

  const { logInWithEmailPass, logInWithGoogle} = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: (user) => {
      return axios.post('https://node-blogs-lyart.vercel.app/users', { ...user });
    },
  })

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.pass.value;

    logInWithEmailPass(email, pass, navigate);
  };

  const signinWithGoogle = () => {
    logInWithGoogle()
      .then((result) => {
        const name= result.user.displayName
        const email= result.user.email
        const photoUrl= result.user.photoURL
        mutation.mutate({name, email, photoUrl})
        navigate('/');
      })
      .catch((error) => {
        if (error) {
        setError(error.message);}
      });
  };

  return (
    <>
      <Helmet>
        <title>Node - Login</title>
      </Helmet>
      <div className='min-h-[90vh] bg-main flex justify-center items-center p-4'>
        <div className="container bg-white rounded-xl flex flex-col lg:flex-row justify-between w-full lg:w-4/5 h-auto lg:min-h-[70vh] overflow-hidden shadow-lg">
          <div className="w-full lg:w-1/2 flex items-center justify-center bg-black relative h-64 lg:h-auto p-4">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <h1 className="text-white text-5xl lg:text-7xl font-space-4 text-center">
                NODE <br/>
                <span className='text-xl lg:text-2xl'>Welcome Back.</span>
              </h1>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center items-center">
            <h2 className='text-2xl mb-6 font-semibold font-space-7 text-black'>Login</h2>
            
            <form className='space-y-4 w-full max-w-sm' onSubmit={handleLogin}>
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
              <button type='submit' className='w-full py-2 bg-black text-white rounded-md hover:bg-blue-700 transition duration-300'>Login</button>
              <div className='flex items-center my-4'>
                <hr className='flex-grow border-t border-gray-300' />
                <span className='mx-2 text-gray-500'>or</span>
                <hr className='flex-grow border-t border-gray-300' />
              </div>
              <button onClick={signinWithGoogle} type='button' className='w-full py-2 border border-gray-400 rounded-md flex items-center justify-center hover:bg-gray-100 transition duration-300 space-x-3'>
                <FaGoogle />
                <p>Login with Google</p>
              </button>
              {error && <p className='text-red-400 mb-4 text-sm'>{error}</p>}
            </form>
            <div className="mt-6 w-full max-w-sm flex justify-between">
              <p>Dont have an account?</p>
              <Link to="/register" className="text-black border-[1px] px-1 font-space-4 border-black rounded-md hover:shadow-lg shadow-black">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
