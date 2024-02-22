import React from 'react'
import { Link } from 'react-router-dom'
import { BsLinkedin } from "react-icons/bs";
import { ImGithub } from "react-icons/im";
import { FaTelegram } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";


export default function Footer() {
  return (
    <div className='bg-[#29347a] text-white md:h-[300px]'>
        <div className=' sm:ml-[40px]  pt-10 pb-8  md:flex justify-evenly '>
        <div className='sm:pb-2'>
            <div className='text-3xl pb-3'>MindStream</div>
            <div>Platform to Share Your Thoughts</div>
        </div>
        
        <div className=' md:flex md:gap-[80px]'>
            <div>
                <div className='text-2xl md:pb-3 sm:pb-4 '>SERVICES</div>
                <div className='sm:pb-4'>
                    <div>Privacy Policy</div>
                    <div>Terms of use</div>
                </div>
            </div>
            <div className="sm:pb-4">
                <div className='text-2xl pb-3 sm:pb-4 '>
                    MENU
                </div>
                <div className='flex flex-col'>
                    <Link to='/Home'>Home</Link>
                    <Link to='/About'>About Us</Link>
                    <Link to='/Contact'>Contact US</Link>
                    <Link to='/signUp'>Sign UP</Link>
                </div>
            </div>
            <div className="w-[1px] h-full bg-stone-200">  

            </div>
        </div>

        <div>
            <div className='text-2xl pb-3'>GET IN TOUCH</div>
            <div>EMAIL :- digvijay16@gmail.com</div>
            <div className='flex gap-3 pt-3 '>
                <a href="https://www.linkedin.com/in/digvijay-kalokhe-b975442ab/"><div className='text-2xl'><BsLinkedin /></div></a>
                <a href="https://github.com/digvijay160902/"><div className='text-2xl'><ImGithub /></div></a>
                <a href="https://telegram.org/"><div className='text-2xl'><FaTelegram /></div></a>
                <a href="https://discord.com/"><div className='text-2xl'><BsDiscord /></div></a>
            </div>
        </div>
        </div>

        <div className='px-8  flex flex-col gap-4'>
            <div className='w-full h-[1px] bg-slate-200'></div>
            <div className='text-center'>© 2024 MindStream. All content rights reserved.</div>
        </div>
    </div>
    
  )
}
