import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import Footer from './Footer';
import './AddblogSpinner.css'

const Login = () => {
  const { register, handleSubmit ,reset} = useForm();
  const navigate = useNavigate();
   const { setIsLoggedIn ,setUser} = useContext(AuthContext);
  const[loading,setLoading] = useState(false);

  const navigateToSignUP = () => {
    navigate("/signUp");
  };

  const loginUser = async (data) => {
    
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setLoading(false);
      if (!response.ok) {
        // Handle login failure
        const errorData = await response.json();
        toast.error(errorData.message, { position: toast.POSITION.BOTTOM_RIGHT });
        return;
      }
      
      // Assuming the server returns a JSON object with the token and expiration
      const { token, expiresIn , user } = await response.json();
      const userInfo = JSON.stringify(user);
      // Save the token and expiration in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiration',expiresIn);
      localStorage.setItem('user_detail',userInfo);
      setIsLoggedIn(true);
      setUser(JSON.parse(userInfo));
      
      toast.success('Logged in  successful', {
        position: toast.POSITION.TOP_RIGHT,
      });
      // setIsLoggedIn(true);
      setTimeout(() => reset(), 10000);
      navigate("/");
      

    } catch (error) {
      setLoading(false);
      console.error('Error during login:', error);
      // Show an error toast
      toast.error('Login failed. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  
  return (
    <div>

      {
        !loading ? 
        <div>
        <div className="max-w-md mx-auto p-4 mt-14">
      <form
        className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-3 border-black"
        onSubmit={handleSubmit(loginUser)}
      >
        <h2 className="text-2xl font-bold mb-4">Welcome Back !</h2>

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
            Login
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-600">
         Don't have an account?{' '}
          <span
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={navigateToSignUP}>
           Sign Up
          </span>
        </p>
      </form>

      {/* Toast container for notifications */}
      <ToastContainer />
        </div>
        <Footer/>
        </div>
        :
        <div className='flex items-center justify-center h-[500px] mt-[45px]'>
            <div className='loader'></div>
        </div>
      }
      
    </div>
  );
};

export default Login;
