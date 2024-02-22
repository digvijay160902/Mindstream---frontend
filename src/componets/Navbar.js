import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { AuthContext } from '../context/AuthContext';
import { VscAccount } from "react-icons/vsc";
import './Navabar.css';



export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [isMenu, setIsMenu] = useState(false);

    const toggleMenu = () => {
        setIsMenu(!isMenu);
    }

    const closeMenu = () => {
        setIsMenu(false);
    }

    return (
        <div className=' bg-cyan-500 flex justify-between items-center md:h-11 navbar font-anotherFont'>
            <div className='sm:pl-8 md:pl-10'><Link to='/'><span className='font-logo text-orange-200'>Mind<span className='text-violet-700 text-2xl'>Stream</span></span></Link></div>
            <div className={`md:hidden cursor-pointer ${isMenu ? 'sm:hidden' : 'sm:visible'}`} onClick={toggleMenu}>
                <IoMenu />
            </div>
            <ul className={`flex flex-col text-lg md:flex md:flex-row md:gap-10 ${isMenu ? 'lg:hidden' : 'sm:hidden'} mr-4 text-white`}>

                <li className='cursor-pointer hover:underline' onClick={closeMenu}>
                    <Link to='/Home'>Home</Link>
                </li>
                <li className='cursor-pointer hover:underline ' onClick={closeMenu}>
                    <Link to='/About'>About Us</Link>
                </li>
                <li className='cursor-pointer hover:underline' onClick={closeMenu}>
                    <Link to='/Contact'>Contact Us</Link>
                </li>

                {isLoggedIn ?
                    <li className='cursor-pointer hover:underline pt-2 sm:pb-2' onClick={closeMenu}>
                        <Link to='/Account'><VscAccount /></Link>
                    </li>
                    :
                    <li className='cursor-pointer hover:underline' onClick={closeMenu}>
                        <Link to='/signUp'>Sign Up</Link>
                    </li>
                }
                <li className={`cursor:pointer ${isMenu ? 'sm:visible' : 'sm:hidden'}`} onClick={closeMenu}>
                    {<IoMdCloseCircleOutline />}
                </li>

            </ul>
        </div>
    )
}
