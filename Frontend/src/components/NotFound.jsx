import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-7'>
        <div className='items-center flex flex-col gap-2'>
             <Notebook className='size-14  hover:text-green-700 transition-all duration-200 text-green-300' />
        <p className='text-2xl text-[#f5f5f5] hover:text-[#999]'>No note yet!</p>
        </div>
       <div className='flex items-center flex-col gap-2'>
        <p className='flex text-center'>Ready to create your thoughts? Create your first thought to get <br/> started on your journey</p>
        <Link to={'/createNote'}>
        <button  className='btn btn-primary'>Create Note</button>
        </Link>
       </div>
    </div>
  )
}

export default NotFound