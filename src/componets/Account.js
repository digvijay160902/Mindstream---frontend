import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import Footer from './Footer';
import 'react-toastify/dist/ReactToastify.css';
import UserPost from './UserPost';

export default function Account() {
  const { logout, user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const updatePosts = (deletedPostId) => {
    setPosts(posts.filter(post => post !== deletedPostId));
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/getUser/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserInfo(data.body);
      setPosts(data.body.blogs);
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  return (
    <div>
        <div>
        <div className="min-h-screen bg-gray-200 mt-[44px] font-anotherFont sm:max-w-[100vw]">
      {userInfo && 
        <div className="container mx-auto py-8 px-6">
          <div className="flex items-center justify-between mb-6 ">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {userInfo.username}</h1>
            <button onClick={handleLogout} className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
              Log Out
            </button>
          </div>
          <div className="bg-white shadow-md rounded p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Details</h2>
            <p className="text-gray-600">Email: {userInfo.email}</p>
            <p className="text-gray-600">Comments: {userInfo.Comments ? userInfo.Comments.length : 0}</p>
            <p className="text-gray-600">Likes: {userInfo.likes ? userInfo.likes.length : 0}</p>
          </div>
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Posts</h2>
            <div className=" flex  gap-4 flex-col md:flex-row">
              {posts.map((post) => (
                <UserPost key={post} post_id={post} updatePosts={updatePosts} />
              ))}
            </div>
          </div>
        </div>
      }
      <ToastContainer />
      
        </div>
        <Footer />
        </div>
    </div>
  );
}
