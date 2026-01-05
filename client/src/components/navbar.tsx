import { useEffect, useState } from 'react'
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
    }, [])
    
    // Initialize dark state from DOM (which is set in main.tsx)
    const [dark,setDark] = useState(() => {
        return document.documentElement.classList.contains('dark')
    })
    
    // Sync with DOM changes (in case theme changes elsewhere)
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setDark(document.documentElement.classList.contains('dark'))
        })
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })
        return () => observer.disconnect()
    }, [])
    
    const handleThemeChange=()=>{
        const isCurrentlyDark = document.documentElement.classList.contains('dark')
        if (isCurrentlyDark) {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('TailwindTheme', 'light')
            setDark(false)
        } else {
            document.documentElement.classList.add('dark')
            localStorage.setItem('TailwindTheme', 'dark')
            setDark(true)
        }
    }
    return (
        <div className={`fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-100  flex items-center justify-between gap-5 inset-shadow-lg transition-all delay-200
         border-neutral-700 dark:border-neutral-200 inset-shadow-lg border-x-0  ${scroll ?'border-[0.5px] backdrop-blur-lg':'border-none'}
         w-full max-w-3xl rounded-full px-4 py-3 dark:text-white text-black mb-20`}>
            <h1 className=' relative text-3xl'>
                Wordlex
            </h1>
            <div className='flex items-center gap-4 px-4 py-px transition-all duration-500'>
                <button className='cursor-pointer shadow-sm text-shadow-sm bg-violet-400 text-white hover:bg-violet-500 transition duration-150
                 dark:bg-violet-800 dark:text-neutral-300 text-xl border border-black dark:border-neutral-300 border-y-0 rounded-full py-px px-2 sm:px-4'>
                    <Link to={'/'}>Sign in</Link>
                </button>
                <span onClick={handleThemeChange} tabIndex={-1} className='cursor-pointer' >
                    {dark?<Sun/>:<Moon/>}
                </span>
                
            </div>
        </div>
    )
}
