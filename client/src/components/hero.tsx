import react from 'react'

export const Hero= ()=>{
    return(
        <div className='flex max-w-5xl flex-col justify-center items-center gap-10 sm:mt-15 md:mt-20 mb-8 sm:mb-12 md:mb-15'>
            <h1 className='text-3xl sm:text-4xl md:text-6xl font-medium text-center max-w-400'>
                Discover a new word every day <br/> can you guess it though?
            </h1>
            <button className='bg-transparent backdrop-sm border-[0.5px] dark:border-neutral-200 border-neutral-900 px-4 py-px cursor-pointer
                hover:bg-neutral-600/40 dark:hover:bg-neutral-100/40 hover:text-blue-100
            '>
                Try Now!
            </button>
        </div>
    )
}