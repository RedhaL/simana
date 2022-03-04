import { NextPage } from 'next'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import { signupCall } from '../apiCalls';

const Register: NextPage = () => {
  const username = useRef() as React.MutableRefObject<HTMLInputElement>;
  const email = useRef() as React.MutableRefObject<HTMLInputElement>;
  const password = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordAgain = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match.")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      signupCall(user
      );
    }
    console.log(email.current.value)
  };


  return (
    <div className='register w-screen h-screen flex justify-center align-center bg-slate-100'>
      <div className="registerWrapper flex flex-row  w-2/3 h-2/3 self-center">
        <form className="registerRight flex flex-col w-1/2 justify-center align-center bg-white" onSubmit={handleSubmit}>
          <input type="text" className="usernameInput h-1/6 p-3 m-3 border-2 border-gray-400 rounded-2xl" required placeholder='Username' ref={username} />
          <input type="email" className="emailInput h-1/6 p-3 m-3 border-2 border-gray-400 rounded-2xl" required placeholder="Email" ref={email} />
          <input type="password" className="passwordInput h-1/6 p-3 m-3 border-2 border-gray-400 rounded-2xl" required placeholder='Password' ref={password} />
          <input type="password" className="passwordAgainInput h-1/6 p-3 m-3 border-2 border-gray-400 rounded-2xl" required placeholder='Password Again' ref={passwordAgain} />
          <button type="submit" className="signUp h-1/6 p-3 m-3 border-2 bg-blue-500 rounded-2xl text-white font-bold text-xl">Sign Up</button>
          <Link to="/login" className='h-1/6 w-1/2 self-center'>
            <button className="register p-3 m-3 border-2 bg-green-500 rounded-2xl text-xl text-white">Log into Account</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Register