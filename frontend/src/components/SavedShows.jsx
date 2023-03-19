import React,{useState,useEffect} from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { UserAuth } from '../context/AuthContext'
import {db} from '../firebase'
import {updateDoc,doc,onSnapshot} from 'firebase/firestore'
import {AiOutlineClose} from 'react-icons/ai'

const SavedShows = () => {
    const [movies,setMovies]=useState([])
    const {user}=UserAuth()

    const SlideLeft=()=>{
  var slider=document.getElementById('slider')
  slider.scrollLeft=slider.scrollLeft -700
}

const SlideRight=()=>{
  var slider=document.getElementById('slider')
  slider.scrollLeft=slider.scrollLeft +700
}

useEffect(()=>{
onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
 setMovies(doc.data()?.savedShows)
})
},[user?.email])

const movieref= doc(db,'users',`${user?.email}`)
const deleteShow = async (passedID) =>{
    try {
        const result = movies.filter((item)=> item.id !== passedID)
        await updateDoc(movieref, {
            savedShows: result,
        })
    } catch (error) {
        console.log(error)
    }
}

  return (
 <>
       <h2 className='text-white font-bold md-text-xl p-4'>My Shows</h2>
      <div className='relative top-[400px] flex items-center group'>
      <MdChevronLeft onClick={SlideLeft} className='absolute bg-white left-0 cursor-pointer z-10 rounded-full opacity-50 hidden hover:opacity-100 group-hover:block' size={40}/>
        <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
         {movies.map((item,id)=>{
           return <div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[260px] inline-block relative p-2'>
              <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
              <div className='absolute w-full h-full left-0 top-0 hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='white-space-normal flex justify-center items-center h-full text-center text-xs md:text-sm font-bold'>{item?.title}</p>
                <p onClick={()=> deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose /></p>
              </div>
            </div>
         })}
        </div>
        <MdChevronRight onClick={SlideRight} className='absolute bg-white right-0 cursor-pointer z-10 rounded-full opacity-50 hidden hover:opacity-100 group-hover:block' size={40}/>
      </div>
 </>
  )
}

export default SavedShows
