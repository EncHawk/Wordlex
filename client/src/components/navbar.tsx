import React, { useEffect, useState } from 'react'
import{Sun, Moon} from 'lucide-react'
import { Link } from 'react-router-dom'


export const Navbar = ()=>{
    const [scroll,setScroll] = useState(false)
    function handleScroll(){
        setScroll(window.scrollY>50)
    }
    useEffect(()=>{
        window.addEventListener('scroll',handleScroll)
        return ()=>{ window.removeEventListener('scroll',handleScroll)}
    })
    const [dark,setDark] = useState(false)
    const handleThemeChange=()=>{
        setDark(!dark)
        const currTheme = document.documentElement.classList.contains('dark')
        ?'light':'dark'
        document.documentElement.classList.toggle('dark')
        localStorage.setItem('TailwindTheme',currTheme)
    }
    return (
        <div className={`fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-100  flex items-center justify-between gap-5 inset-shadow-lg transition-all delay-100
         border-neutral-700 dark:border-neutral-200 inset-shadow-lg border-x-0 z-100 ${scroll ?'border-[0.5px] backdrop-blur-lg':'border-none'}
         w-full max-w-3xl rounded-full px-4 py-3 dark:text-white text-black mb-20`}>
            <h1 className=' relative text-2xl'>
                Wordlex
            </h1>
            <div className='flex items-center gap-4'>
                <button className='cursor-pointer shadow-sm text-shadow-sm bg-violet-400 text-white hover:bg-violet-500 transition duration-150
                 dark:bg-violet-800 dark:text-neutral-300 border border-black dark:border-neutral-300 border-y-0 rounded-full py-px px-4'>
                    <Link to={'/'}>Sign in</Link>
                </button>
                <button onClick={handleThemeChange} className='cursor-pointer' >
                    {dark?<Sun/>:<Moon/>}
                </button>
                
            </div>
        </div>
    )
}
