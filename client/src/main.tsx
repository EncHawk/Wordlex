import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { ErrorPage } from './components/notFound.tsx'
import { Wordle } from './components/wordle.tsx'

const router = createBrowserRouter([
    {path:"/home",element:<App/>},
    {path:"*",element:<ErrorPage/>},
    {path:"/app",element:<Wordle/>}
]) 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>,
)
