import React from 'react'
import { useLocation } from 'react-router-dom'
import Player from '../components/Plyr'

const Play = () => {
  
  const location=useLocation()
 
  const fileId=location.state.fileId
  const image=location.state.img
  const synopsis=location.state.overview

  return (

<div className="relative">
  <div className="absolute inset-0 z-[-1]">
    <img
      src={`https://image.tmdb.org/t/p/original/${image}`}
      alt="Background"
      className="object-cover w-full h-full"
      style={{ filter: "blur(10px)" }}
    />
    <div className="absolute inset-0 bg-gray-900 opacity-20 backdrop-filter backdrop-blur-lg"></div>
  </div>
  <div className="relative z-10">
    <div className="max-w-screen-lg mx-auto pt-20">
      <Player source={`http://127.0.0.1:9001/${fileId}`} />
    </div>
    <div className="max-w-screen-lg mx-auto py-8">
      <h2 className="text-white font-bold text-3xl mb-4">Synopsis</h2>
      <p className="text-white text-lg">{synopsis}</p>
    </div>
  </div>
  
</div>

  )
}

export default Play