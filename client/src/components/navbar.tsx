import React, { useState } from 'react'

export const Navbar = ()=>{
    const [dark,setDark] = useState(false)
    const handleThemeChange=()=>{
    setDark(!dark)
    const currTheme = document.documentElement.classList.contains('dark')
    ?'light':'dark'
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('TailwindTheme',currTheme)
    }
    return (
        <div className='fixed top-2 sm:top-4 left-1/2 -translate-x-1/2
        flex items-center justify-between gap-5
        w-full max-w-3xl rounded-full px-4 py-3 backdrop-blur-lg dark:text-white text-black'>
            <h1 className=' relative text-md'>
                Wordlex
            </h1>
            <div className='flex items-center gap-4'>
                <button>
                    SignIn
                </button>
                <button onClick={handleThemeChange} className='cursor-pointer' >
                    --theme
                </button>
            </div>
        </div>
    )
}
