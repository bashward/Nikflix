import React, { useState } from 'react'

const Torrents = ({torrents, upload}) => {

const [val,Setval]=useState(0)

const handlechange=(e)=>{
  e.preventDefault()
  Setval(e.target.value)
}

  return (<>
    <div className='my-3 w-full'>
      <select value={val} onChange={handlechange} className="w-[75%] p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">    
               {torrents.map((torrent,index)=>{
                return <option key={index} value={index}>{torrent.title}</option>
               })}
            </select>
    </div>
    <button onClick={()=>{upload(val)}} className='my-5 p-3 rounded-md text-white bg-red-700'>Upload</button>
    </>
  )
}

export default Torrents
