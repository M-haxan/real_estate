import React from 'react'
import { useState } from 'react';
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import Oauth from '../components/Oauth';

import toast from 'react-hot-toast';
export default function Signin() {
  const [formData, setFormData] = useState({});
  const [loadings, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      dispatch(signInStart());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success === false) {
        setLoading(false);
        dispatch(signInFailure(data.message));
        toast.error(data.message);
        return;
      }
      setLoading(false);
      dispatch(signInSuccess(data));
      toast.success("user logged in successfully");
      navigate('/');
    } catch (error) {
      setLoading(false);
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  };
  return (
     <div className="min-h-[calc(100vh-5rem)] bg-slate-100 flex items-center justify-center p-4">
    
          <div className="relative bg-white rounded-[2rem] shadow-lg w-full max-w-sm pt-10 pb-8 px-6 sm:px-10 mt-16">
    
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-5 ">
              <IoPersonCircleSharp className="fa-regular fa-user text-3xl text-gray-400" />
            </div>
    
            <h2 className="text-center text-gray-400 text-2xl font-light tracking-widest mb-8">
              Welcome Back 
            </h2>
            <form onSubmit={handleSubmit} >
    
             
              <div className="flex bg-[#dcdcdc] mb-4  overflow-hidden">
                <div className="bg-[#cccccc] px-4 py-3 flex items-center justify-center">
                  <MdEmail className="text-gray-600" />
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  className="bg-transparent w-full  px-4 py-2 font-bold text-sm text-gray-700 outline-none placeholder-gray-400"
                  id='email'
                  onChange={handleChange}
                  
                />
              </div>
    
    
              <div className="flex bg-[#dcdcdc] mb-4 overflow-hidden">
                <div className="bg-[#cccccc] px-4 py-2 flex items-center justify-center">
                  <RiLockPasswordFill className="text-gray-600" />
                </div>
                <input
                  type="password"
                  placeholder="***********"
                  className="bg-transparent w-full px-4 py-2 text-sm text-gray-700 outline-none placeholder-gray-400"
                  id='password'
                  onChange={handleChange}
                  
                />
              </div>
    
    
              <div className="flex justify-between items-center text-[11px] text-gray-400 mb-6">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-2 accent-gray-500" /> Remember me
                </label>
                <a href="#" className="italic hover:text-gray-600 transition-colors">
                  Forgot Password?
                </a>
              </div>
    
    
              <div className="w-full flex flex-col gap-2">
                <button
                disabled={loadings}
                  type="submit"
                  className="w-full bg-[#3D4A5D] text-white py-2 font-semibold tracking-widest text-sm hover:bg-gray-700 transition-colors"
                >
                  {loadings ? 'Sign in ...' : 'Sign In'}
              
                </button>
              
                <Oauth/>
              </div>
            </form>
          
          </div>
        </div>
  )
}
