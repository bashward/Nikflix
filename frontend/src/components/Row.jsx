import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import Movie from './Movie'
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'

const Row = ({title,fetchURL,RowID}) => {

const [movies,Setmovies]=useState([])

useEffect(()=>{
axios.get(fetchURL).then((res)=>{
    Setmovies(res.data)
})
},[fetchURL])

const SlideLeft=()=>{
  var slider=document.getElementById('slider'+ RowID)
  slider.scrollLeft=slider.scrollLeft -700
}

const SlideRight=()=>{
  var slider=document.getElementById('slider'+ RowID)
  slider.scrollLeft=slider.scrollLeft +700
}

  return (
    <>
      <h2 className='text-white font-bold md-text-xl p-4'>{title}</h2>
      <div className='relative flex items-center group'>
      <MdChevronLeft onClick={SlideLeft} className='absolute bg-white left-0 cursor-pointer z-10 rounded-full opacity-50 hidden hover:opacity-100 group-hover:block' size={40}/>
        <div id={'slider'+RowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
         {movies.map((item,id)=>{
            return <Movie item={item} key={id}/>
         })}
        </div>
        <MdChevronRight onClick={SlideRight} className='absolute bg-white right-0 cursor-pointer z-10 rounded-full opacity-50 hidden hover:opacity-100 group-hover:block' size={40}/>
      </div>
    </>
  )
}

export default Row
