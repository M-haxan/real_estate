import React, { useState, useEffect } from 'react';
import { FiSearch, FiMenu, FiX } from "react-icons/fi"; 
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
   const navigate = useNavigate();
   const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
   useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search])

  return (
    <header className='bg-slate-200 shadow-md relative'>
      
      <div className='flex justify-between items-center max-w-6xl mx-auto w-full p-2'>
  
        <Link to="/" className='flex items-center'>
          <img src="Logo.png" className='h-8 sm:h-16 w-auto' alt="Logo" />
          <h1 className='text-slate-700 text-lg sm:text-md font-black ml-2'>
            Real Estate
          </h1>
        </Link>

         <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FiSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='hidden sm:flex gap-4 items-center'>
          <li className='text-slate-700 hover:underline'> <Link to="/">Home</Link> </li>
          <li className='text-slate-700 hover:underline'> <Link to="/about">About</Link> </li>
          {currentUser ? (
            <Link to="/profile">
              <img 
                src={currentUser.avatar }
                alt="profile"
                className='h-9 w-9 rounded-full object-cover'
              />
            </Link>
          ) : (
            <li className='text-slate-700 hover:underline font-bold'> <Link to="/sign-in">Sign in</Link> </li>
          )}
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
          
        
           <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FiSearch className='text-slate-600' />
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
            {currentUser ? (
              <li className='text-slate-700 hover:bg-slate-300 p-2 rounded-md'>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className='flex items-center gap-2'>
                  <img 
                    src={currentUser.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                    alt="profile"
                    className='h-8 w-8 rounded-full object-cover'
                  />
                  <span>Profile</span>
                </Link>
              </li>
            ) : (
              <li className='text-slate-700 hover:bg-slate-300 p-2 rounded-md font-bold'> 
                <Link to="/sign-in" onClick={() => setIsMenuOpen(false)}>Sign in</Link> 
              </li>
            )}
          </ul>
        </div>
      )}

    </header>
  );
}