import express from 'express'
import dotenv from 'dotenv'
import * as zod from 'zod'
import bcrypt from 'bcrypt'
import {User} from './db'
import wordRouter from './userRouter'
import {globalCatch} from './utils'
dotenv.config()

// constants definition for future well-being
const app = express();
app.use(express.json());

app.use(globalCatch)
app.listen(process.env.PORT||8080)



app.get('/status',(req,res)=>{
    res.status(200).send({
        ok:true,
        msg:"all systems functional. hit smtn else :)"
    })
})
app.use('/api',wordRouter)
// user gives the name, email and password. 
