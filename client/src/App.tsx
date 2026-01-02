import { useEffect, useState } from 'react'
import { Container } from './components/container'
import { Navbar } from './components/navbar'
import { Hero } from './components/hero'


function App() {
  
  const [dark, setDark] = useState(
    document.documentElement.classList.contains('dark')
  )
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


  const grid = dark? '#404040':'#e5e5e5'
  const gradient = dark
  ?`radial-gradient(circle at top, transparent 0%, var(--color-semidark) 80%, var(--color-dark) 100%), 
  radial-gradient(circle at bottom, transparent 80%, var(--color-dark) 100%`
  :`radial-gradient(circle at top, transparent 0%, var(--color-semilight) 80%, var(--color-semilight) 100%),
  radial-gradient(circle at bottom, transparent 80%, var(--color-semilight) 100%`

  return ( // the outer one is the layout!
    <div className=' relative flex flex-col items-center justify-center h-100% 
    w-full min-h-screen dark:bg-black bg-sky-500 dark:text-white pb-1000 dark:selection:bg-neutral-200 dark:selection:text-black
     selection:bg-neutral-500 selection:text-neutral-200'>
      <div 
        style={{
          backgroundImage:`linear-gradient( ${grid} 0.25px, transparent 1px),
          linear-gradient(90deg,${grid} 0.25px, transparent 1px)`,
          backgroundSize:'40px 40px'
        }}
      className='absolute inset-0'></div>
        <Navbar/>
      <Container>
        <div style={{backgroundImage:gradient}} className='absolute inset-0'></div>
        <Hero/>
      </Container>
      <div className=' w-full h-125 flex justify-center items-center mx-auto z-10 px-2 py-8 bg-neutral-100 dark:bg-neutral-900'>
        <div className='grid grid-cols-4 grid-rows-5 gap-4 auto-rows-fr h-100 w-full max-w-3xl'>
          <div className='bg-blue-400 rounded-xl px-6 py-6 col-span-2 row-span-2 
          hover:scale-[1.02] transition-transform duration-300'></div>
          
          <div className='bg-green-400 rounded-xl px-6 py-6 col-span-2 row-span-3
          hover:scale-[1.02] transition-transform duration-300'></div>
          
         
          
          <div className='bg-red-400 rounded-xl px-6 py-6 col-span-2 row-span-3
          hover:scale-[1.02] transition-transform duration-300'></div>
          
          <div className='bg-indigo-400 rounded-xl px-6 py-6 col-span-2 row-span-2
          hover:scale-[1.02] transition-transform duration-300'></div>
        </div>
      </div>
    </div>
  )
}

export default App
