import { useState } from 'preact/hooks'
import './app.css'
import Navbar from './components/Navbar/Navbar'
import MovieList from './components/MovieList/MovieList'

export function App() {

  return (
    <>
    <div className='app'>
      <Navbar />
      <MovieList />
    </div> 
    </>
  )
}
