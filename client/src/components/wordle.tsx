import React, { useState } from "react";
import { Wgrid } from "./wordGrid";


export const Wordle= ()=>{
  function fetchWord(){
    async function handleWord(){
      try{
        setError(false)
        setLoading(true)
        const res = await fetch(url+'word',{
          method:"GET",
          headers:{
            "authorization":`${localStorage.getItem('token')}`
          },
        })
        const data = await res.json();
        const word = data.word.word;
        if(word){
          setWord(word)
        }
      }
      catch(err:any){
        setLoading(false)
        console.log(err.message)
        setError(true)
      }
    }
    const res = handleWord()
    const long = word.length
    return long
  }

  const [error,setError] = useState(false)
  const[loading,setLoading] = useState(false)
  const [word,setWord]= useState("")
  const url= 'http://localhost:8080/'
  const length = fetchWord()
  return(
      <div className="flex items-center rounded-lg bg-red-600 justify-center min-h-screen mx-auto w-full max-w-5xl">
          <Wgrid length:long/>
      </div>
  )
}