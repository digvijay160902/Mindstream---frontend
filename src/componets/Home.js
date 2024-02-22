import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link ,Navigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import 'toast' from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Post from './Post';
import './ShareButton.css'
import Footer from './Footer';
import './HomepageLoader.css'

export default function Home() {

  const[posts,setPosts]=useState([]);
  const[isLoader,setIsLoader]=useState(false);
 
  const fetchPosts =  async () =>{

    try{
      setIsLoader(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/Posts`,

      {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      );

      setIsLoader(false);
      
      if (response.ok) {
        const responseData = await response.json();
        setPosts(responseData.body);
       
      } else {
        console.error(`Failed to fetch data. Status: ${response.status}`);
      }

    }
    catch(err){
        console.log("Error while fetching the data");
        

        toast.error('unable to fetch the post, Please try later', {
          position: toast.POSITION.TOP_RIGHT,
        });
    }
  }

  useEffect( ()=>{
      fetchPosts();
  },[]);

  return (

    
    <div className="">

      {
        isLoader ?
        
       <div className='flex justify-center items-center h-[450px]'>
            <div className = 'loader'>
          </div>
       </div>
        :
        <div className='relative'>
            <div className='fixed top-[300px] left-[100px] z-10 sm:top-[200px] sm:left-[20px]'>
            <Link to="/Addblog" className='circular-link-button '>
              <div className='pt-8'>
                  <p>Write Your</p>
                  <p className=''>Blog</p>
              </div>
            </Link>
            </div>

            <div className=' mt-[44px] w-9/12 mx-auto flex justify-evenly pt-4 flex-wrap md:'>
          {
            posts.map((post) => (
                <Post key={post._id} post={post}/>
            ))
            
          }
            </div>

            <Footer/>
        </div>
        

      }

       
      
      <ToastContainer /> 
    </div>
  )
}
