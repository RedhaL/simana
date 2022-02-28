import React, {useRef} from 'react'

const Login = () => {
  const email = useRef() as React.MutableRefObject<HTMLInputElement>;;
  const password = useRef() as React.MutableRefObject<HTMLInputElement>;;
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("submit", email.current.value, password.current.value)
  };
 
  return (
    <div className='login w-screen h-screen flex justify-center align-center bg-slate-100'>
      <div className="loginWrapper flex flex-row  w-2/3 h-2/3 self-center">
        <form className="loginRight flex flex-col w-1/2 justify-center align-center bg-white" onSubmit={handleSubmit}>
            <input type="email" className="emailInput h-1/6 p-3 m-3 border-2 border-gray-400 rounded-2xl" placeholder="Email" required ref={email} />
            <input type="password" minLength={6} className="passwordInput h-1/6 p-3 m-3 border-2 border-gray-400 rounded-2xl" placeholder='Password' required ref={password} />
            <button className="loginButton h-1/6 p-3 m-3 border-2 bg-blue-500 rounded-2xl text-white font-bold text-xl"><code>Log In</code></button>
            <button className="ForgotButton h-1/6 p-3 m-3 text-blue-500 w-1/2 self-center"><code>Forgot your password?</code></button>

        </form>
      </div>
    </div>
  )
}

export default Login