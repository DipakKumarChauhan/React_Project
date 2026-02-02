import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  console.log(import.meta.env.VITE_APPWRITE_URL);

  return (
    <>
     <h1 className='bg-red-500'> Blog App in React </h1>
    </>
  )
}

export default App
