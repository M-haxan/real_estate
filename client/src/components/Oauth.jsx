import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firbase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
export default function Oauth() {
     const dispatch = useDispatch();
  const navigate = useNavigate();
    const handleGoogleClick = async () => {

        try{
            const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');

        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <button
        onClick={handleGoogleClick}
            type="button"
            className="w-full bg-[#BC2727] text-white py-2 font-semibold tracking-widest text-sm hover:bg-gray-700 transition-colors"
        >
            Continue with Google
        </button>
    )
}
