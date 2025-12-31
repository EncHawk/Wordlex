import express from 'express'

const rec = {
    usr:" "
}
export function limiter (req,res,next){
    const temp = req.headers.authorization || req.body.name
    if(rec.usr === temp){
        return res.status(403).send({
            ok:false,
            msg:"stop spamming!!"
        })
    }
    rec.usr = temp
    next()
    setTimeout(()=>{
        rec.usr=" "
    },5000)
}
