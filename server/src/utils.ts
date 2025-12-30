import express,{Request ,Response ,NextFunction} from 'express'

export function globalCatch(err:unknown, req:Request,res:Response,next:NextFunction){
    return res.status(500).send({
        ok:false,
        msg:"Whoopsie smtn went wrong, we're on this!"
    })
}