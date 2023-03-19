import React, { useEffect, useState } from 'react'
import requests from '../requests'
import { Link } from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'
import { db } from '../firebase'
import {arrayUnion,doc,updateDoc} from 'firebase/firestore'
import axios from 'axios'

const Main = () => {
  const [movies,SetMovies]=useState([]);

  const movie=movies[Math.floor(Math.random()*movies.length)]

  const {user} = UserAuth()

  const movieID=doc(db,'users',`${user?.email}`)
  
  useEffect(()=>{
   axios.get(requests.requestMovies).then((res)=>{
    SetMovies(res.data)
   })
  },[])
 
  const truncateString = (str,num) =>{
    if(str?.length>num){
        return str.slice(0,num) + '...'
    }
    else{
        return str
    }
  }

  const saveShow= async ()=>{
    if(user?.email) {
      await updateDoc(movieID,{
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.imglink
        })
      })
    } else {
      alert('Please log in to save a movie!')
    }
  }

  return (
    <div className='w-full h-[550px] text-white'>
      <div className='w-full h-full'>
      <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
      <img className='w-full h-full object-fit' src={`https://image.tmdb.org/t/p/original/${movie?.imglink}`} alt={movie?.title} />
      <div className='absolute top-[20%] w-full p-4 md:p-8'>
      <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
      <div className='my-4'>
      <Link to='/Play' state={{fileId: movie?.fileId,img: movie?.imglink,overview: movie?.synopsis}}>
        <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5 rounded-md'>Play</button>
      </Link>
        <button onClick={saveShow} className='border text-white border-white py-2 px-5 ml-4 rounded-md'>Watch Later</button>
      </div>
      <p className='text-gray-400 text-sm mb-2'>Released: </p>
      <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncateString(movie?.synopsis,150)}</p>
      </div>
      </div>
    </div>
  )
}

export default Main
