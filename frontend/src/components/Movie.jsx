import {FaHeart,FaRegHeart} from 'react-icons/fa'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import React from 'react'
import {UserAuth} from '../context/AuthContext'
import { db } from '../firebase'
import {arrayUnion,doc,updateDoc} from 'firebase/firestore'

const Movie = ({item}) => {
    const [like,Setlike]=useState()
    const [saved,setSaved]=useState(false)
    const {user} = UserAuth()

    const movieID=doc(db,'users',`${user?.email}`)

    const saveShow= async ()=>{
      if(user?.email) {
        Setlike(!like)
        setSaved(true)
        await updateDoc(movieID,{
          savedShows: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.imglink
          })
        })
      } else {
        alert('Please log in to save a movie!')
      }
    }
  return (
    <Link to='/Play' state={{fileId: item.fileId,img: item.imglink,overview: item.synopsis}}>
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[260px] inline-block relative p-2'>
              <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.imglink}`} alt={item?.title} />
              <div className='absolute w-full h-full left-0 top-0 hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='white-space-normal flex justify-center items-center h-full text-center text-xs md:text-sm font-bold'>{item?.title}</p>
                <p onClick={saveShow}>
                    {like? <FaHeart className='absolute top-4 left-4 text-gray-300 cursor-pointer'/> : <FaRegHeart className='absolute top-4 left-4 text-gray-300 cursor-pointer'/>}
                </p>
              </div>
            </div>
    </Link>
  )
}

export default Movie
