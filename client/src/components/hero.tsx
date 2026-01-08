import react from 'react'
import { Link } from 'react-router-dom'

export const Hero= ()=>{
    return(
        <div className='flex max-w-5xl flex-col justify-center items-center py-8 px-4 gap-10 sm:mt-15 md:mt-20 mb-8 sm:mb-12 md:mb-15 z-100000 transition-all duration-500'>
            <h1 className='text-3xl sm:text-4xl lg:text-6xl  font-medium font-spec text-center max-w-400 bg-clip-text 
                bg-linear-to-b from-neutral-800 to-neutral-700
                dark:bg-linear-to-b dark:from-neutral-200 dark:to-neutral-500 text-transparent py-4 appear-top tracking-wide
            '>
                <span className='text-transparent font-inter bg-clip-text dark:bg-white bg-neutral-900 px-1'>Discover </span>
                a new word every day, <br/> can you guess it though?
            </h1>
            <Link to={"/app"}>
                <button className='bg-transparent backdrop-sm border-[0.5px] dark:border-neutral-200 border-neutral-900 px-4 py-px cursor-pointer
                    hover:border-violet-800 text-sm appear-top
                '>
                Try Now!
                </button>
            </Link>
        </div>
    )
}