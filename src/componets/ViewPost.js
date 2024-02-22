import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { BiLike } from "react-icons/bi";
import Comment from './Comment';
import Footer from './Footer'


function ViewPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [likeButtonDisabled, setLikeButtonDisabled] = useState(false);
  const [loader,setLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/post/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast.error(response.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      }

      const data = await response.json();
      setPost(data.body);

      if ( user && data.body.likes.includes(user._id)) {
       
        setLiked(true);
      }

      setLoader(false);
     
    } catch (err) {

      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleLike = async () => {
    if (!isLoggedIn) {
      toast.error('Login to interact with posts', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  
    // Optimistically update the UI
    setLiked(!liked);
    setPost(prevPost => {
      const updatedPost = { ...prevPost };
      if (liked) {
        updatedPost.likes = updatedPost.likes.filter(userId => userId !== user._id);
      } else {
        updatedPost.likes.push(user._id);
      }
      return updatedPost;
    });
  
    try {
      const token = localStorage.getItem('token');
      const endpoint = liked ? '/likes/unlike' : '/likes/like';
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
        setLiked(!liked);
        setPost(prevPost => {
          const updatedPost = { ...prevPost };
          if (liked) {
            updatedPost.likes.push(user._id);
          } else {
            updatedPost.likes = updatedPost.likes.filter(userId => userId !== user._id);
          }
          return updatedPost;
        });
  
        const data = await response.json();
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      // If request fails, revert the changes
      setLiked(!liked);
      setPost(prevPost => {
        const updatedPost = { ...prevPost };
        if (liked) {
          updatedPost.likes.push(user._id);
        } else {
          updatedPost.likes = updatedPost.likes.filter(userId => userId !== user._id);
        }
        return updatedPost;
      });
  
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const postComment = async () => {
    try {

      if(!isLoggedIn){

        
        toast.error("Login for interaction",
         { position:toast.POSITION.TOP_RIGHT}
        )
        return;
      }
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_id: post._id,
          user_id: user._id,
          data: commentText
        }),
      });

      if (!response.ok) {
        const comment_data = await response.json();
        toast.error(comment_data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {

        toast.success( "comment added successfully",
         {
          position:toast.POSITION.TOP_RIGHT
         }
        )
        closeModal(); 
        fetchPost();
      }
    } catch (err) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };
  
  return (
    <div>
      {loader ? (
        <div className='flex justify-center items-center text-4xl h-[500px]'>
          <div className='loader'></div>
        </div>
      ) : (
        <div>
        <div className="flex justify-center items-center bg-gray-100 mt-[44px] font-anotherFont">
          <div className="w-full max-w-screen-md p-6 bg-white rounded-lg shadow-lg mt-[20px]">
            {post && (
              <div>
                <h1 className="text-2xl md:text-4xl font-semibold text-center mb-4 text-orange-500">{post.title}</h1>
                <div className="flex justify-center mb-4">
                  <img className="h-auto md:h-80 max-w-full" src={post.img} alt={post.title} />
                </div>
                <p className="text-lg leading-relaxed mb-4">{post.body}</p>
                <p className="text-right">- <span className='font-authorFont'>{post.user}</span></p>
                <div className='h-[2px] bg-slate-400 mt-2'></div>
                <div className='flex justify-between pt-4 pb-2'>
                  <div className='flex items-center'>
                    <button onClick={handleLike} disabled={likeButtonDisabled}>
                      <BiLike style={{ color: liked ? 'green' : 'black', fontSize: '1.5rem' }} />
                    </button>
                    {post.likes.length}
                  </div>
                  <div>
                    <button className='bg-blue-500 text-white hover:bg-blue-700 py-2 px-4' onClick={openModal}>Comment</button>
                  </div>
  
                  {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
                      <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-lg font-semibold mb-4">Add a Comment</h2>
                        <textarea
                          value={commentText}
                          onChange={handleCommentChange}
                          className="w-full h-20 px-3 py-2 border rounded-lg mb-4"
                          placeholder="Write your comment here..."
                        />
                        <div className="flex justify-end">
                          <button onClick={closeModal} className="text-gray-500 mr-4">Cancel</button>
                          <button onClick={postComment} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Post</button>
                        </div>
                      </div>
                    </div>
                  )}
  
                </div>
  
                <div className='text-2xl md:text-3xl pb-2'>
                  See Comments
                </div>
  
              </div>
            )}
  
            {post && (
              <div>
               
                <div>
                  {post.comments.map((commentID) => (
                    <Comment key={commentID} commentID={commentID} />
                  ))}
                </div>
              </div>
            )}
  
          </div>          
        </div>

        <div>
              <Footer/>
        </div>
        </div>
        
      )}
      <ToastContainer />
    </div>
  );
  
}

export default ViewPost;
