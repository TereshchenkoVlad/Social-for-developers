import React from 'react'
import './App.css'
import { Navbar } from './components/layout/Navbar'
import { Landing } from './components/layout/Landing'

const App = () => (
   <div className='app'>
      <Navbar />
      <Landing />
   </div>
)

export default App
