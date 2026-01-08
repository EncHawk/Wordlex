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
            <h1 className=' relative text-xl group'>
                <Link to={'/'}>WordLex</Link>
                <span className='bg-transparent absolute bottom-0 left-1/2 h-px w-px 
                group-hover:left-0 group-hover:w-full group-hover:bg-violet-700
                transition-all duration-300'>

                </span>
            </h1>
            <div className='flex items-center justify-center gap-4 px-4 py-px transition-all duration-500'>
                <Link to={'/'}>
                    <button className='cursor-pointer shadow-sm text-shadow-sm bg-violet-500 text-white hover:bg-violet-400 transition duration-150
                    dark:bg-violet-800 dark:text-neutral-300 text-sm border border-black dark:border-neutral-300 border-y-0 rounded-full py-[0.5px] px-1 sm:px-4'>
                        Sign in
                    </button>
                </Link>
                <span onClick={handleThemeChange} className='cursor-pointer' >
                    {dark?<Sun size={18}/>:<Moon size={18}/>}
                </span>
                
            </div>
        </div>
    )
}
