import React from 'react'
import { Link } from 'react-router-dom'
import SavedShows from '../components/SavedShows'

const Account = () => {
  return (
    <>
    <div className='w-full text-white'>
    <img className='absolute w-full h-[400px] object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/d0a0affb-1c76-4cf0-9d75-eb531f32458c/e81da519-216b-4341-b9e7-92d45398ddc3/IN-en-20221214-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="/" />
    <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]'></div>
    <div className='absolute top-[20%] p-4 md:p-8'>
    <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
    </div>
    </div>
    <SavedShows />
    <div className='relative my-5 w-full h-[50px]'>
     <div className='absolute flex w-[90px] left-6 top-4 p-3 text-white font-bold justify-center align-middle text-2xl'>
      <Link to='/store'>
       <button>Store</button>
      </Link>
     </div>
    </div>
  </>
  )
}

export default Account
