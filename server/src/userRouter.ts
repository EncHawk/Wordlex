import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { data } from './data'
import * as zod from 'zod'

import {User,Words,PreviousWords} from './db'
import type { ZodUndefinedDef } from 'zod/v3'

const wordRouter = express.Router()
const saltRounds = 12;

interface wordType{
    length:number,
    word:string,
    description:string,
    difficulty:string
}


async function populateDB(words:wordType[], modelType:mongoose.Model<wordType>){``
    if(words.length>0){
        words.forEach(async(item)=>{
            try{
                const wordt = await new Words({
                    length: item.length,
                    word:item.word,
                    description:item.description,
                    difficulty:item.difficulty,

                })
                wordt.save()
            }
            catch(er){
                console.log(er)
            }
        })
    }
}
populateDB(data,Words)

// const list = words
// const prev = prevUsed

// user signin, exception
wordRouter.post('/signin',async(req,res)=>{ 
    // const{name,email,password} = req.body
    const input = req.body
    const userInputValidation = zod.object({
        name:zod.string(),
        email:zod.email({pattern:zod.regexes.rfc5322Email}),
        password:zod.string().min(8,'Too Short')

    })
    try{
        const parseRes = await userInputValidation.parseAsync(input);
        const hash = await bcrypt.hash(input.password,saltRounds)
        const user = await new User({
            name:input.name,
            email:input.email,
            password:hash,
            score:0
        })
        user.save()
        return res.status(200).send({
            ok:true,
            msg:"User added successfully, you will receive an email soon :)"
        })
    }
    catch(err){
        console.log(err)
        return res.status(401).send({
            ok:false,
            password:false,
            msg:"invalid input credentials. failed checks."
        })
    }
    
})

wordRouter.get('/word',async(req,res)=>{
    // hit an api endpoint or we retrive the word from the store we create in the database??
    // const n = list.length
    const word= await Words.aggregate([{
        $sample:{size:1}
    }]);
    console.log(word)
    return res.status(200).send({
        ok:true,
        word:word
    })
})


export default wordRouter;