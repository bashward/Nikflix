const express=require('express')
const axios=require('axios')
const rarbg=require('rarbg-api')
require('dotenv').config()
const {newmovie,newseries,getMovies,getSeries}=require('./db')
const app=express()

app.use(express.urlencoded({extended: true}))
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.post('/',(req,res)=>{
const query=req.body.query

    rarbg.search(query,{
        category: null,
        limit: 10,
        sort: 'seeders',
        min_seeders: 5,
        min_leechers: null,
        format: 'json_extended',
        ranked: null,
    }).then(data =>{
        console.log(data)
        res.send(data)
    }).catch(err=>console.log(err))

})

app.post('/upload',(req,res)=>{

const torrent=req.body
    
const m=torrent.download
const tmdb=torrent.episode_info.themoviedb
let details

async function getDetails(){
  try {
    details=await axios.get('https://api.themoviedb.org/3/movie/'+tmdb+'?api_key='+process.env.API_KEY+'&language=en-US')
    return details
  } catch (error) {
    console.log(err)
  }
}

getDetails().then(details=>{
  console.log(details)

//MULTIUP
  async function getParams() {
    const params = {
      userID: '',
      magnet: m,
      reqURL: ''
    }
  
    try {
      const loginResponse = await axios.post('https://multiup.org/api/login', {
        username: process.env.MULTIUP_USERNAME,
        password: process.env.MULTIUP_PASSWORD
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      params.userID = loginResponse.data.user;
    } catch (err) {
      console.log(err);
    }
  
    try {
      const serverResponse = await axios.get('https://multiup.org/api/get-fastest-server');
      const URL=serverResponse.data.server
      params.reqURL = URL.slice(0,32)+'torrent.php';
    } catch (err) {
      console.log(err);
    }
  
    return params;
  }
  
  getParams().then(params => {
    //console.log(params.reqURL)
    axios.post(params.reqURL,{
    'user': params.userID,
    'magnet': params.magnet,
    'name': details.data.original_title,
    'archive': false,
    'no-seed': true,
    'rename': false,
    'files[]':false,
    'host2': true
},{
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(res=>{
    console.log(res)
   
  if(torrent.category.toLowerCase().includes('movies')){

    const movie={
      title: details.data.original_title,
      imglink: details.data.backdrop_path,
      fileId: '',
      synopsis: details.data.overview
    }

    async function movieEntry(){
      try{
        await newmovie(movie)
      }catch(err){
        console.log(err)
      }
    }
    movieEntry()
  }

  else{
    const show={
      title: details.data.original_name,
      imglink: details.data.backdrop_path,
      seasons: details.data.number_of_seasons,
      episodes: [],
      synopsis: details.data.overview
    }

    async function showEntry(){
      try{
        await newseries(show)
      }catch(err){
        console.log(err)
      }
    }
    showEntry()
  }

}).catch(err=>console.log(err))
});
})
})

app.get('/movies',(req,res)=>{
  async function Getmovies(){
    const movies=await getMovies()
    res.send(movies)
  }
Getmovies()
})

app.get('/series',(req,res)=>{
  async function Getseries(){
    const series=await getSeries()
    res.send(series)
  }
  Getseries()
})



app.listen(3001,()=>{
    console.log('Server is running')
})
