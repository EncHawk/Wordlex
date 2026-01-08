import express from 'express'
// import dotenv from 'dotenv'
import * as zod from 'zod'
// import {User} from './db'
import wordRouter from './userRouter'
import {globalCatch} from './utils'
import cors from 'cors'
// dotenv.config()

// constants definition for future well-being
const app = express();
app.use(express.json());
app.use(cors({
    origin:"https://wordlex-two.vercel.app/",
    credentials:true
}))
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
