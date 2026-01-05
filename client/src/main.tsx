import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { ErrorPage } from './components/notFound.tsx'
import Wordle  from './components/wordle.tsx'

// Initialize dark mode from localStorage or default to dark
const savedTheme = localStorage.getItem('TailwindTheme')
if (savedTheme === 'light') {
  document.documentElement.classList.remove('dark')
} else {
  // Default to dark mode
  document.documentElement.classList.add('dark')
  localStorage.setItem('TailwindTheme', 'dark')
}

const router = createBrowserRouter([
    {path:"/",element:<App/>},
    {path:"*",element:<ErrorPage/>},
    {path:"/app",element:<Wordle/>}
]) 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>,
)
