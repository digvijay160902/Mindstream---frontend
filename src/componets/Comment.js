import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Comment(props) {
  const commentID = props.commentID;
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  

  const fetchComment = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/getComment/${commentID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comment');
      }

      const data = await response.json();
      setComment(data.body);
      fetchUser(data.body.user); // Call fetchUser with userId after comment is fetched
    } catch (err) {
      toast.error("Something Went Wrong", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/getUser/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch userName');
      }

      const data = await response.json();
      setUserName(data.body.username);
    
    } catch (err) {
      toast.error("Something Went Wrong", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <div>
       {
       
        userName &&
        
          <div className='bg-slate-300 border-2 rounded-[6px] mb-2'>
              <div className =' p-2'>{userName}</div>
              <div className='font-commentFont text-xl pl-5'>{comment.body}</div>
              <div className = 'h-[2px] bg-slate-300 w-full'></div>
          </div>
        
       }
      <ToastContainer />
    </div>
  );
} 
