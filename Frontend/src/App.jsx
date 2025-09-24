import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './Pages/Home'
import CreateNote from './Pages/CreateNote'
import Header from './components/Header'
import NoteDetailsPage from './Pages/Notedetails'
import Notedetails from './Pages/Notedetails'


function App() {
  return (
   
   <div data-theme='forest' className='bg-black gap-4'>
    <Header />
    <Routes>
      <Route path='/' element={<Home/>} />
         <Route path='/CreateNote' element={<CreateNote/>} />
          <Route path='/noteDetails/:id' element={<Notedetails/>} />
    </Routes>
   </div>
  )
}

export default App
