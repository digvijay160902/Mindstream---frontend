import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { GoArrowLeft } from "react-icons/go";
import { AuthContext } from '../context/AuthContext';
import './AddblogSpinner.css'
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const Addblog = () => {
  const { user,isLoggedIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isSpinner, setIsSpinner] = useState(false);

  const addblog = async (data) => {

    if(!isLoggedIn){
      toast.error("Log in to add your post",{
        position:toast.POSITION.TOP_RIGHT
      })
      return;
    }
    setIsSpinner(true);
    

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('body', data.body);
    formData.append('user', user.username);
    formData.append('img', data.img[0]);
    formData.append('user_id', user._id);

    try {
      const token = localStorage.getItem('token');
      console.log("token ",token);
      const savedUserResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/createPost`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!savedUserResponse.ok) {
        const errorData = await savedUserResponse.json();
        toast.error(errorData.message, { position: toast.POSITION.BOTTOM_RIGHT });
        navigate("/login");
        return;
      }

      const newPostData = await savedUserResponse.json();
      setIsSpinner(false);

      toast.success(newPostData.message, {
        position: toast.POSITION.TOP_RIGHT,
      });


      navigate("/Home");
    } catch (error) {
      toast.error('Error creating post. Please try again.', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div>
      {isSpinner ? (
        <div className=' w-[100vw] h-[100vh] flex  flex-col justify-center items-center gap-3'>
          <h2 className='text-3xl'>Uploading Your Blog...</h2>
          <div className='loader'></div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto p-4 max-h-screen overflow-y-visible mt-5">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline mt-5 mb-2">
            <Link to="/Home" className="flex items-center text-white">
              <GoArrowLeft className="mr-1 text-2xl font-bold" />
              Back
            </Link>
          </button>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-solid border-2 border-black"
            onSubmit={handleSubmit(addblog)}
          >
            <h2 className='font-custom text-orange-600 text-3xl font-bold pb-3 text-center'>
              Write Your Blog
            </h2>
            <div className="mb-4">
              <label className=" block text-indigo-600 text-md font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Enter title"
                {...register('title')}
              />
            </div>
            <div className="mb-4">
              <label className="block text-indigo-600 text-md font-bold mb-2" htmlFor="body">
                Description of the blog
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="body"
                placeholder="Enter description"
                {...register('body')}
              />
            </div>
            <div className="mb-4">
              <label className="block  text-indigo-600 text-md font-bold mb-2" htmlFor="img">
                Upload Image
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="img"
                type="file"
                accept="image/*"
                {...register('img', { required: 'Image is required' })}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Addblog;
