import { useState } from 'react'

function App() {
  const url = '/api/'  
  const[loading,setLoading] = useState(false)
  const[response,setResponse] = useState(null)
  const[word,setWord] = useState("")
  const [error,setError] = useState(false)

  async function handleSignin(){
    setLoading(true)
    try{
      const req = await fetch(url+'signin',{
        method:'POST',
        headers:{
          "Content-Type":"application/json",
          
        },
        body:JSON.stringify({name:"pilid",email:"dilipdeepu.r2000@gmail.com"}),
        credentials:'include'
      })
      const data = await req.json()
      if(data.token){
        localStorage.setItem('token',data.token)
      }
      setResponse(data)
      setLoading(false)
    } 
    catch(err){
      setLoading(false)
      console.log(err)
      setError(true)
    }
  }
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

  return (
    <div className='flex gap-5 items-center justify-center h-100% bg-red-100'>
      
    </div>
  )
}

export default App
