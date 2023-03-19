import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Login = () => {
  const [email,setEmail]=useState('')
  const [error,Seterror]=useState(false)
  const [password,setPassword]=useState('')
  const {user,logIn}=UserAuth()
  const navigate=useNavigate()

  const handleSubmit= async (e)=>{
  e.preventDefault()
  try {
    await logIn(email,password)
    navigate('/')
  } catch (error) {
    console.log(error)
    Seterror(true)
  }
}

  return (
    <div className='w-full h-screen'>
    <img className='hidden sm:block absolute w-full h-full object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/d0a0affb-1c76-4cf0-9d75-eb531f32458c/e81da519-216b-4341-b9e7-92d45398ddc3/IN-en-20221214-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
    <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'>
       <div className='fixed w-full px-4 py-24 z-50'>
         <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
           <div className='max-w-[320px] mx-auto py-16'>
             <h1 className='text-3xl font-bold'>Sign In</h1>
             {error? <p className='p-3 bg-red-400 my-2'>Oops! Wrong E-mail/Password</p>: null}
             <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
               <input onChange={(e)=>{setEmail(e.target.value)}} className='p-3 my-2 bg-700 rounded text-black' type="email" placeholder='Email' autoComplete='email'/>
               <input onChange={(e)=>{setPassword(e.target.value)}} className='p-3 my-2 bg-700 rounded text-black' type="password" placeholder='Password' autoComplete='current-password'/>
               <button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign In</button>
               <div className='flex justify-between items-center text-sm text-gray-600'>
                   <p><input className='mr-2' type="checkbox" />Remember Me</p>
                   <p>Need Help?</p>
               </div>
               <p className='py-8'><span className='text-gray-600'>New to Nikflix? </span><Link to='/signup'>Sign Up</Link></p>
             </form>
           </div>
         </div>
       </div>
    </div>
   </div>
  )
}

export default Login
