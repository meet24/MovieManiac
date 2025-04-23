import { useState } from 'preact/hooks'
import './app.css'
import Navbar from './components/Navbar/Navbar'

export function App() {

  return (
    <>
    <div className='app'>
      <Navbar />
      <main>Main content</main>
    </div> 
    </>
  )
}
