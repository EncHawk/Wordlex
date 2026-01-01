import React, { type ReactNode } from 'react'
import { cn } from '../utils'

interface childprops{
    children:React.ReactNode
}
export const Container= ({children}:childprops)=>{
    return (
        <div className={cn(' flex flex-col gap-10 max-w-5xl w-full relative mx-auto py-2 px-2 sm:px-4 md:px-4 md:py-8')}>
            {children}
        </div>
    )
}