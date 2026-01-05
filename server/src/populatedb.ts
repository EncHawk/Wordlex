//NEVER CALL THIS FUNCTION EVER UNTIL NEEDED TO UPDATE THE WORDS.
import mongoose from 'mongoose'
import { Words } from './db'
interface wordType{
    length:number,
    word:string,
    description:string,
    difficulty:string
}
export async function populateDB(words:wordType[]){
    if(words.length>0){
        words.forEach(async(item)=>{
            try{
                const wordt = await new Words({
                    length: item.length,
                    word:item.word.toUpperCase(),
                    description:item.description,
                    difficulty:item.difficulty,
                    currentWord:false,
                    previousWord:false
                })
                wordt.save()
                return "done"
            }
            catch(er){
                console.log(er)
                return "fucked"
            }
        })
    }
}