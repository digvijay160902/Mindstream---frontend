import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function UserPost(props) {
  const { post_id, updatePosts } = props;
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
    showPost();
  }, []);

  const showPost = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/post/${post_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      if (!response.ok) {
        console.log("error is ", response.message);
        return;
      }

      const data = await response.json();
      setPost(data.body);
      console.log(post);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deletePost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/deletePost`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId: post_id,
          userId: user._id,
        }),
      });

      if (!response.ok) {
        console.log("error is ", response.message);
        return;
      }

      console.log("post deleted successfully");
      updatePosts(post_id); // Update posts in the Account component
    } catch (err) {
      console.log("could not delete the post");
    }
  }

  if (!post) {
    return null;
  }

  return (
    <div>
      <div className='w-[200px] md:w-[330px] flex flex-col gap-2 border-2 p-3 mb-4 rounded-md shadow-xl bg-white'>
        <img className="h-[200px] md:h-[250px] rounded" src={post.img} alt="" />
        <div className='font-anotherFont'>
          <p className='md:h-[48px]'>{post.title}</p>
          <div className='bg-slate-300 h-[2px]'></div>
        </div>
        <div className='flex items-center justify-between p-2'>
          <div>
            <Link to={`/post/${post._id}`} className="bg-blue-500 hover:bg-blue-700
             text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline 
             mt-5 mb-2">View</Link>
          </div>
          <div>
            <button onClick={deletePost} className="bg-red-500
             hover:bg-red-700 text-white font-bold py-2 px-4 focus:outline-none 
             focus:shadow-outline mt-5 mb-2">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
