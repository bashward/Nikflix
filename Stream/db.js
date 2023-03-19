const mongoose=require('mongoose')
require('dotenv').config()


const username=process.env.MONGODB_USERNAME
const password=process.env.MONGODB_PASSWORD
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect("mongodb+srv://"+username+":"+password+"@cluster0.ooygbbp.mongodb.net/Nikflix")
}

const gdriveSchema=new mongoose.Schema({
    access_token: String,
    scope: String,
    expiry_date: String,
    refresh_token: String,
})


const gdrive=new mongoose.model('gdrive',gdriveSchema)


async function newToken(gcreds){
try {
    const token=await gdrive.find()
    const updateToken=await gdrive.findOneAndUpdate(token[0]._id,gcreds)
    return updateToken
} catch (err) {
    console.log(err)
}

//     try {
//   const nmovie = await movie.create({
//     title: Movie.title,
//     imglink: Movie.imglink,
//     fileId: Movie.fileId,
//     synopsis: Movie.synopsis
//   });
//   console.log('New movie entry created:', nmovie);
// } catch (err) {
//   console.log(err);
// }
}

async function getToken(){
try{
    const gcreds=await gdrive.find()
    return gcreds[0]
} catch(err){
    console.log(err)
}
}



module.exports={newToken,getToken}