import React, { useState } from 'react';
import { FiSearch, FiMenu, FiX } from "react-icons/fi"; // FiMenu (Hamburger) aur FiX (Close) add kiye hain
import { Link } from 'react-router-dom';

export default function Header() {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='bg-slate-200 shadow-md relative'>
      
      <div className='flex justify-between items-center max-w-6xl mx-auto w-full p-2'>
  
        <Link to="/" className='flex items-center'>
          <img src="Logo.png" className='h-8 sm:h-16 w-auto' alt="Logo" />
          <h1 className='text-slate-700 text-lg sm:text-md font-black ml-2'>
            Real Estate
          </h1>
        </Link>

        <form className='hidden sm:flex bg-slate-100 rounded-lg p-2 items-center'>
          <input 
            type="text" 
            placeholder="Search..." 
            className='bg-transparent border-none focus:outline-none w-64 px-2' 
          />
          <button type="submit">
            <FiSearch className='text-slate-900' />
          </button>
        </form>
        <ul className='hidden sm:flex gap-4 items-center'>
          <li className='text-slate-700 hover:underline'> <Link to="/">Home</Link> </li>
          <li className='text-slate-700 hover:underline'> <Link to="/about">About</Link> </li>
          <li className='text-slate-700 hover:underline font-bold'> <Link to="/sign-in">Sign in</Link> </li>
        </ul>
        <div className='sm:hidden flex items-center'>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className='text-slate-700 text-2xl focus:outline-none'
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

      </div>
      {isMenuOpen && (
        <div className='sm:hidden absolute top-full left-0 w-full bg-slate-200 border-t border-slate-300 shadow-lg p-4 z-50'>
          
        
          <form className='bg-slate-100 rounded-lg p-2 flex items-center w-full mb-4'>
            <input 
              type="text" 
              placeholder="Search properties..." 
              className='bg-transparent border-none focus:outline-none w-full px-2' 
            />
            <button type="submit">
              <FiSearch className='text-slate-900' />
            </button>
          </form>

          
          <ul className='flex flex-col gap-4'>
            {/* onClick par menu close ho jayega taa ke naye page par menu band rahay */}
            <li className='text-slate-700 hover:bg-slate-300 p-2 rounded-md'> 
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link> 
            </li>
            <li className='text-slate-700 hover:bg-slate-300 p-2 rounded-md'> 
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link> 
            </li>
            <li className='text-slate-700 hover:bg-slate-300 p-2 rounded-md font-bold'> 
              <Link to="/sign-in" onClick={() => setIsMenuOpen(false)}>Sign in</Link> 
            </li>
          </ul>
        </div>
      )}

    </header>
  );
}