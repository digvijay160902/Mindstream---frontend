import React from 'react';
import { Link } from 'react-router-dom';
import main from '../images/background.jpg';

export default function Main() {
  
  return (
    <div  style={{
     
      backgroundImage: `url(${main})`,
      backgroundSize: 'cover',
      width:'100vw',
      height:'calc(100vh - 44px)',
      }} 
      className='flex flex-col   justify-center items-center gap-10  md:max-h-screen  md:mt-[44px]'
    >
  
      <div className='text-white  text-2xl md:text-4xl text-bold  font-custom w-8/12'>
          {`Transform ideas into conversations. Blog your heart out, 
          receive appreciation through likes, and dive into discussions with a community 
          that values your voice`}
      </div>
      <div className='flex flex-row gap-10'>
      <Link to='/Home' className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        Explore
      </Link>

      <Link to='/login' className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        Login
      </Link>

      </div>
       
    </div>
  );
}
