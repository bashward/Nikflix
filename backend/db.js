const mongoose=require('mongoose')
require('dotenv').config()


const username=process.env.MONGODB_USERNAME
const password=process.env.MONGODB_PASSWORD
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect("mongodb+srv://"+username+":"+password+"@cluster0.ooygbbp.mongodb.net/Nikflix")
}

const movieSchema=new mongoose.Schema({
    title: String,
    imglink: String,
    fileId: String,
    synopsis: String,
})

const showSchema=new mongoose.Schema({
    title: String,
    imglink: String,
    seasons: Number,
    fileId: Array,
    synopsis: String,
})

const movie=new mongoose.model('movie',movieSchema)
const show=new mongoose.model('show',showSchema)

async function newmovie(Movie){
    try {
  const nmovie = await movie.create({
    title: Movie.title,
    imglink: Movie.imglink,
    fileId: Movie.fileId,
    synopsis: Movie.synopsis
  });
  console.log('New movie entry created:', nmovie);
} catch (err) {
  console.log(err);
}
}

async function newseries(Series){
    try{
        const nseries=await show.create({
            title: Series.title,
            imglink: Series.imglink,
            seasons: Series.seasons,
            fileId: Series.episodes,
            synopsis: Series.synopsis
        })
        console.log('New series entry created: ',nseries)
    } catch(err){
        console.log(err)
    }
}

async function getMovies(){
try{
    const movies=await movie.find()
    return movies
} catch(err){
    console.log(err)
}
}

async function getSeries(){
    try{
        const series=await show.find()
        return series
    } catch(err){
        console.log(err)
    }
}

module.exports={newmovie,newseries,getMovies,getSeries}