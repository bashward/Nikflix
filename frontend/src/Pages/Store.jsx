import React, { useState } from 'react'
import axios from 'axios'
import Torrents from '../components/Torrents'

const Store = () => {
 const [list,Setlist]=useState(false)
 const [load,Setload]=useState(false)
 const [query,Setquery]=useState('')
 const [tors,Settors]=useState([])

 const sendQuery=async (e)=>{
  Setload(true)
  Setlist(false)
  e.preventDefault()
  axios.post('http://localhost:3001/',{
    'query': query
  },{
    headers:  {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      responseType: 'json',
  }).then(res=>{
    Settors(res.data)
    Setlist(true)
    Setload(false)
  }).catch(err=>console.log(err))
 }

 const UploadTor=(index)=>{
const torrent=tors[index]
axios.post('http://localhost:3001/upload',torrent,{
  headers:  {
          'Content-Type': 'application/x-www-form-urlencoded',
      }
}).then(res=>{
  console.log(res.data)
})
 } 

  return (
    <>
     <div className='fixed py-28 px-10 w-full h-screen'>
       <div className='text-white font-bold md:text-4xl'>
        <h1>Add Content</h1>
       </div>
       <div className='my-[45px] w-full h-auto text-white inline:block'>
       <form onSubmit={sendQuery}>
       <p>Name:</p>
       <input onChange={(e)=>{Setquery(e.target.value)}} className='p-3 my-2 bg-700 w-[20%] rounded text-black' type="text" placeholder='Name of the show/series' autoComplete='off'/>
       <button className='mx-5 p-3 rounded-md bg-red-700'>Search</button>
        {load? <p>Loading...</p>: null}
       </form>
       </div>
       {list?<> <p className='text-white'>Select your torrent:</p>
       <Torrents torrents={tors} upload={UploadTor} />
       </>
       : null}

     </div>
    </>
  )
}

export default Store
