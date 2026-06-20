import React from 'react'
import { useSelector } from 'react-redux'
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri"
import { useRef, useEffect, useState } from 'react'
import { FaCamera } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart, 
  signOutUserSuccess
} from '../redux/user/userSlice'
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  const fileref = useRef(null)
  
  
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
   const [updateSuccess, setUpdateSuccess] = useState(false);
   const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handlefile = () => {
    fileref.current.click()
  }

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    setFileUploadError(false);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "real-estate"); 
    data.append("cloud_name", "dzizbm5s7");   

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.cloudinary.com/v1_1/dzizbm5s7/image/upload", true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setFilePerc(Math.round(progress)); 
        console.log("Upload Progress: ", Math.round(progress) + "%");
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
       
        setFormData({ ...formData, avatar: response.secure_url });
        console.log("Uploaded URL: ", response.secure_url);
      } else {
        setFileUploadError(true);
      }
    };

    xhr.onerror = () => {
      setFileUploadError(true);
    };

    xhr.send(data);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast.error(data.message|| "Something went wrong!" )
        setLoading(false)
        return;
      }
      
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      toast.success("User updated successfully!")
      setLoading(false)
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error(error.message || "Something went wrong!")
      setLoading(false)
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message || "Something went wrong!")
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success("Account deleted successfully!")
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error(error.message || "Something went wrong!")
    }
  
  };
  const handleSignout = async  ()=>{
    try {
      dispatch (signOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
       dispatch(signOutUserFailure(data.message));
       toast.error(data.message)
        return ;
      }
      dispatch(signOutUserSuccess(data)); 
      toast.success(data.message || "Signed out successfully!")

    }catch(err){
      dispatch(signOutUserFailure(err.message));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        
        
        <input 
          type="file" 
          ref={fileref} 
          hidden 
          accept='.jpg,.jpeg,.png' 
          onChange={(e) => setFile(e.target.files[0])} 
        />
        
<div 
    className='relative w-24 h-24 self-center mt-2 cursor-pointer group hover:scale-105 transition-transform duration-300' 
    onClick={handlefile}
    title='Change Profile Picture' 
  >
    
    <img 
      src={formData.avatar || currentUser.avatar} 
      alt="profile" 
      className='rounded-full w-full h-full object-cover border-4 border-white shadow-lg' 
    />
    
   
    <div className='absolute bottom-1 right-1 bg-[#3D4A5D] p-1.5 rounded-full shadow-md border-2 border-white group-hover:bg-gray-700 transition-colors'>
      <FaCamera className="text-white text-sm" />
    </div>
  </div>
        
        
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error Image upload (image must be less than 2 MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

        <div className="flex bg-[#dcdcdc] mb-4 overflow-hidden rounded">
          <div className="bg-[#cccccc] px-4 py-2 flex items-center justify-center rounded">
            <IoPerson className="text-gray-600" />
          </div>
          <input
            type="text"
            placeholder="Username"
            defaultValue={currentUser.username}
            onChange={handleChange}
            className="bg-transparent w-full px-4 py-2 text-sm text-gray-700 outline-none placeholder-gray-400"
            id='username'
          />
        </div>

        <div className="flex bg-[#dcdcdc] mb-4 overflow-hidden rounded">
          <div className="bg-[#cccccc] px-4 py-2 flex items-center justify-center">
            <MdEmail className="text-gray-600" />
          </div>
          <input
            type="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            onChange={handleChange}
            className="bg-transparent w-full px-4 py-2 text-sm text-gray-700 outline-none placeholder-gray-400"
            id='email'
          />
        </div>

        <div className="flex bg-[#dcdcdc] mb-4 overflow-hidden rounded">
          <div className="bg-[#cccccc] px-4 py-2 flex items-center justify-center">
            <RiLockPasswordFill className="text-gray-600" />
          </div>
          <input
            type="password"
            placeholder="***********"
            
            onChange={handleChange}
            className="bg-transparent w-full px-4 py-2 text-sm text-gray-700 outline-none placeholder-gray-400"
            id='password'
          />
        </div>
        <button
        disabled={loading}
          type="submit"
          className=" w-full bg-[#3D4A5D] text-white py-3 font-semibold tracking-widest text-md hover:bg-gray-700 transition-colors rounded"
        >
           {loading ? 'Loading...' : 'Update'}
        </button>
        <Link className='w-full text-center  bg-green-700 text-white py-3 font-semibold tracking-widest text-md hover:bg-gray-700 transition-colors rounded' to={"/create-listing"}>
        Create Listing
        </Link>
      </form>
      
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'
        onClick={handleDeleteUser}
        >Delete account</span>
        <span  className=' text-red-700 cursor-pointer'
        onClick={handleSignout}
        >Sign out</span>
      </div>
    </div>
  )
}