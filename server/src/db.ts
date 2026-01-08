import mongoose,{Schema} from "mongoose";
import dotenv from 'dotenv'
dotenv.config
const str = process.env.mongo_server || ""
const conn = mongoose.connect(str)

const userSchema = new Schema({
    name:{type:String, unique:true},
    email:{type:String, unique:true},
    password:String,
    score:Number
})
const wordsSchema = new Schema({
    length: { type: Number, required: true },
    word: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    currentWord:{type:Boolean,required:true},
    previousWord:{type:Boolean,required:true}
})
export const User = mongoose.model('User', userSchema)
export const Words = mongoose.model('Words', wordsSchema)
// module.exports(User)