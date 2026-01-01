import React, { type ReactNode } from 'react'
import { cn } from '../utils'

interface childprops{
    children:React.ReactNode
}
export const Container= ({children}:childprops)=>{
    return (
        <div className={cn(' backdrop-blur-[0.5px] flex flex-col justify-center items-center gap-10 h-200 w-full relative mx-auto py-2 px-2 sm:px-4 md:px-4 md:py-8')}>
            {children}
        </div>
    )
}