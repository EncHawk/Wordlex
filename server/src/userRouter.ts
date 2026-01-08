import express from 'express'
import mongoose, { Error } from 'mongoose'
import { globalCatch } from './utils'
import * as zod from 'zod'
import jwt from 'jsonwebtoken'
import {User,Words} from './db'
import type { ZodUndefinedDef } from 'zod/v3'
import { limiter } from './rateLimit'
import dotenv from 'dotenv'
dotenv.config()

// import { data } from './data'
const secret = process.env.jwt_secret || ""
const wordRouter = express.Router()
wordRouter.use(globalCatch)
// wordRouter.use(limiter) for now, until we scale we dont touch this.

interface wordType{
    length:number,
    word:string,
    description:string,
    difficulty:string,
    currentWord:Boolean,
    previousWord:Boolean
}

async function findWord(){
    const word= await Words.aggregate([{
        $sample:{size:1}
    }]);
    return word[0]?? null;
}

async function randomWord() {
  // if a current word already exists, reuse it
  const existing = await Words.findOne({ currentWord: true });
  if (existing) return existing;

  let word = null;

  while (!word) {
    word = await findWord();
  }

  if (word.currentWord || word.previousWord) {
    return null;
  }

  await Words.updateOne(
    { _id: word._id },
    { $set: { currentWord: true, previousWord: true } }
  );

  return word;
}


// const list = words
// const prev = prevUsed

// user signin, exception
wordRouter.get('/status',(req,res)=>{
  // populateDB(data) // use when you need to update smtn
  return res.status(200).send({
    success:true,
    msg:"all systems functional, ready for propulsioon!!"
  })
})

wordRouter.post('/signin',async(req,res)=>{ 
  // const{name,email,password} = req.body
  const input = req.body
  const check = await User.findOne({name:input.name})
  if(check){
    return res.status(403).send({
      success:false,
      msg:"User already exists."
    })
  }
  const userInputValidation = zod.object({
    name:zod.string(),
    email:zod.email({pattern:zod.regexes.rfc5322Email}).min(5,'Too Short')
  })
  try{
    const parseRes = await userInputValidation.parseAsync(input);
    const user = await new User({
        name:input.name,
        email:input.email,
        score:0
    })
    const token = await jwt.sign(input,secret)
    await user.save()
    return res.status(200).send({
      success:true,
      msg:"User added successfully, you will receive an email soon :)",
      token:token
    })
  }
  catch(err:any){
    console.log(err.message)
    return res.status(403).send({
      ok:false,
      msg:"Whoops, something went wrong, try again!",
    })
  }
})

wordRouter.get('/word',async(req,res)=>{
  const jet= req.headers.authorization;
  // console.log(bs)
  // if(!jet){
  //   return res.status(403).send({
  //     ok:false,
  //     message:"Invalid identity, try again."
  // })}

  try{  
    // const verify = jwt.verify(jet,secret)
    // console.log(verify)
    const toSend = await randomWord();
    if(!toSend){
      return res.status(503).send({
        success:false,
        msg:"something went wrong, try again :/"
      })
    }
    else{
      return res.status(200).send({
        success:true,
        msg:"word found successfully, try guessin!",
        word:toSend
      })
    }
  }
  catch(err){
    console.log(err)
    return res.status(403).send({
      success:false,
      msg:"invalid token"
    })
  }
})

wordRouter.post('/leaders',async(req,res)=>{
  const jet= req.headers.authorization;
  if(!jet){
    return res.status(403).send({
      success:false,
      message:"Invalid tsuccessen, try again."
  })}

  try{  
    const verify = jwt.verify(jet,secret)
    const ret = await User.aggregate([
      {
        "$group":{
        _id:"$name",
        score:{$sum:"$score"}
        }
      },
      {
        $sort:{score:-1}
      },
      {
        $limit:50
      }
    ])
    
    return res.status(200).send({
      success:true,
      msg:"Successfully retrieved leaderboard",
      board:ret
    })
  }
  catch(err){
    console.log(err)
    return res.status(403).send({
      success:false,
      msg:"invalid token!"
    })
  }
})

wordRouter.get('/check/',async(req,res)=>{
  const checkword:any= req.query.word
  try{
    const word = await Words.findOne({
      word:checkword.toString()
    })
    if(word){
      return res.status(200).send({
        success:true,
        msg:"word found, render error",
        word:word
      })
    }
    else{
      return res.status(200).send({
        success:true,
        checkword,
        msg:"no word found, continue",
        word:word
      })
    }
  }
  catch(Err:any){
    console.log(Err.message)
    return res.status(503).send({
      success:false,
      msg:"something went wrong, could not fetch."
    })
  }
})

export default wordRouter;