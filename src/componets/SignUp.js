import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const Signup = () => {
  const { register, handleSubmit ,reset } = useForm();
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const signUpUser = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        // Handle signup failure
        const errorData = await response.json();
        console.error('Signup error:', errorData); // Add this line for debugging
        toast.error(errorData.message, { position: toast.POSITION.BOTTOM_RIGHT });
        return;
      }
  
      // Signup successful
      const successData = await response.json();
      console.log('Signup success:', successData); // Add this line for debugging
      toast.success(successData.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
  
      // Redirect to login page
      setTimeout(() => reset(), 10000);
       navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      // Show an error toast
      toast.error('Signup failed. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className='' >
      
      <div className="max-w-md mx-auto p-4 mt-14 ">
      <form
        className=" bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(signUpUser)}
      >
        <h2 className="text-2xl font-bold mb-4 ">Create Your Account</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
            {...register('username')}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email')}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register('password')}
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <span
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={navigateToLogin}
          >
            Log in
          </span>
        </p>
      </form>
      </div>

      <Footer/>
      <ToastContainer />
    </div>
  );
};

export default Signup;
