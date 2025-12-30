import mongoose,{Schema} from "mongoose";
import { required } from "zod/mini";

const conn = mongoose.connect('mongodb://localhost:27017/Wordlex')

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    score:Number
})
const wordsSchema = new Schema({
     length: { type: Number, required: true },
    word: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    currentWord:{type:String,required:true}
})
const previousWordsSchema = new Schema({
    word:{type:String, required:true}
})

export const User = mongoose.model('User', userSchema)
export const Words = mongoose.model('Words', wordsSchema)
export const PreviousWords = mongoose.model('PreviousWords', previousWordsSchema)
// module.exports(User)