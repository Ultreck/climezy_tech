import React from 'react'
import SearchLocation from './SearchLocation'

const Navbar = () => {
  return (
    <div className='h-24 w-full bg-slate-900 '>
        <nav className="bg-slate-900 w-5xl mx-auto p-4 text-white flex justify-between items-center">
            <div className="text-lg font-bold">Weather App</div>
            <div className="text">
                <SearchLocation/>
            </div>
            <div className="space-x-4">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/favorites" className="hover:text-gray-300">Favorites</a>
            </div>
        </nav>
        <div className="text-white bg-gray-800">
             reprehenderit dolore ex officiis!
        </div>
    </div>
  )
}

export default Navbar