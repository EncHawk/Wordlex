import express from 'express'
import mongoose from 'mongoose'
// import { data, prevUsed } from './data'
import { globalCatch } from './utils'
import * as zod from 'zod'
import jwt from 'jsonwebtoken'
import {User,Words} from './db'
import type { ZodUndefinedDef } from 'zod/v3'
import { limiter } from './rateLimit'

const wordRouter = express.Router()
const secret:any= "dilip"
wordRouter.use(globalCatch)
wordRouter.use(limiter)

interface wordType{
    length:number,
    word:string,
    description:string,
    difficulty:string
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
wordRouter.post('/signin',async(req,res)=>{ 
  // const{name,email,password} = req.body
  const input = req.body
  const userInputValidation = zod.object({
    name:zod.string().min(5,'Too Short'),
    email:zod.email({pattern:zod.regexes.rfc5322Email})
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
      ok:true,
      msg:"User added successfully, you will receive an email soon :)",
      token:token
    })
  }
  catch(err:any){
    console.log(err)
    return res.status(403).send({
      ok:false,
      msg:"Whoops, something went wrong, try again!",
    })
  }
})

wordRouter.get('/word',async(req,res)=>{
  const jet= req.headers.authorization;
  // console.log(bs)
  if(!jet){
    return res.status(403).send({
      ok:false,
      message:"Invalid identity, try again."
  })}

  try{  
    const verify = jwt.verify(jet,secret)
    console.log(verify)
    const toSend = await randomWord();
    if(!toSend){
      return res.status(503).send({
        ok:false,
        msg:"something went wrong, try again :/"
      })
    }
    else{
      return res.status(200).send({
        ok:true,
        msg:"word found successfully, try guessin!",
        word:toSend
      })
    }
  }
  catch(err){
    console.log(err)
    return res.status(403).send({
      ok:false,
      msg:"invalid token"
    })
  }

})


export default wordRouter;