import { Home, InfoIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import { Link, useLocation  } from 'react-router'

const Header = () => {
    const location = useLocation();
   const isCreateNotePage = location.pathname === '/createNote';
    const isDetailPage = location.pathname === '/noteDetails:id';
     const isHomePage = location.pathname === '/';
    
    
  return (
    <nav className='bg-base-300 border-b border-base-content/10 '>
        <div className='mx-auto max-w-6xl p-4'>
            <div className='flex items-center justify-between'>
                <h1  className=' tracking-tight text-primary font-sans justify-center'>
                    <Link to={'/'} className='flex text-3xl'> <Home className='size-8' /> {isHomePage ? 'NoteBoard' : 'Back to HOme'}</Link></h1>
                <div className='flex gap-4 items-center'>
                    {
                        !isCreateNotePage && <Link to={'/createNote'} className='flex gap-0.5 btn btn-primary'>
                    <PlusIcon/> New note
                    </Link>
                    }
                    {/* {
                        !isDetailPage &&<Link to={'/noteDetails:id'} className='flex gap-0.5 btn btn-primary'>
                    <InfoIcon /> Details
                    </Link>
                    } */}
                </div>
            </div>
        </div>
        </nav>
  )
}

export default Header