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


  const grid = dark? '#404040':'white'
  const gradient = dark
  ?`radial-gradient(circle at top, transparent 0%, var(--color-semidark) 80%, var(--color-dark) 100%), 
  radial-gradient(circle at bottom, transparent 70%, var(--color-dark) 100%`
  :`radial-gradient(circle at top, transparent 0%, var(--color-semilight) 90%, var(--color-light) 100%),
  radial-gradient(circle at bottom, transparent 70%, var(--color-semilight) 100%`

  return ( // the outer one is the layout!
    <div className=' relative flex flex-col gap-5 h-100% 
    w-full min-h-screen dark:bg-black bg-blue-500 dark:text-white'>
      <div 
        style={{
          backgroundImage:`linear-gradient( ${grid} 0.25px, transparent 1px),
          linear-gradient(90deg,${grid} 0.25px, transparent 1px)`,
          backgroundSize:'50px 50px'
        }}
      className='absolute inset-0'></div>
      <div style={{backgroundImage:gradient}} className='absolute inset-0'></div>
      <Container>
        <Navbar/>
        <Hero/>
      </Container>
    </div>
  )
}

export default App
