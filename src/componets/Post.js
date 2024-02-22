import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiLike } from "react-icons/bi";
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export default function Post(props) {
  const { post } = props;
  const [isHovered, setIsHovered] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [liked, setLiked] = useState(user && post.likes.includes(user._id));
  const [likeButtonDisabled, setLikeButtonDisabled] = useState(false);

  useEffect(() => {
    // Reset liked state when user logs out
    if (!isLoggedIn) {
      setLiked(false);
    }
  }, [isLoggedIn]);

  const handleLike = async () => {
    if (!isLoggedIn) {
      toast.error('Login to interact with posts', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    // Disable the like button to prevent multiple requests
    setLikeButtonDisabled(true);

    // Optimistically update the UI
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount(prevCount => (newLikedState ? prevCount + 1 : prevCount - 1));

    try {
      const token = localStorage.getItem('token');
      const endpoint = newLikedState ? '/likes/like' : '/likes/unlike';
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_id: post._id,
          user_id: user._id,
        }),
      });

      if (!response.ok) {
        // If request fails, revert the changes
        setLiked(liked);
        setLikeCount(prevCount => (newLikedState ? prevCount - 1 : prevCount + 1));

        const errorData = await response.json();
        toast.error(errorData.error || 'Something went wrong', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      // If request fails, revert the changes
      setLiked(liked);
      setLikeCount(prevCount => (newLikedState ? prevCount - 1 : prevCount + 1));

      console.error('Error:', error);
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      // Enable the like button again after request completes
      setLikeButtonDisabled(false);
    }
  };

  return (
    <div>
      <div
        className={`w-[330px] flex flex-col gap-2 border-2 p-3 mb-4 rounded-md shadow-xl bg-white 
        ${isHovered ? 'hover:scale-100 md:hover:scale-105' : 
        'hover:shadow-md transition-transform transition-timing-smooth'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img className="h-[250px] rounded" src={post.img} alt="" />
        <div className='font-anotherFont'>
          <p className='md:h-[48px]'>{post.title}</p>
          <div className='bg-slate-300 h-[2px]'></div>
        </div>
        <div className='flex items-center justify-between p-2'>
          <div className='flex items-center'>
            <button onClick={handleLike} disabled={likeButtonDisabled}>
              <BiLike style={{ color: liked ? 'green' : 'black', fontSize: '1.5rem' }} />
            </button>
            {likeCount}
          </div>
          <div>
            <Link to={`/post/${post._id}`} className="bg-blue-500 hover:bg-blue-700
             text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline 
             mt-5 mb-2">View</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
