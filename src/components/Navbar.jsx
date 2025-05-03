import React from 'react'

const Navbar = () => {
  return (
    <div className='h-24 w-full bg-gray-800 '>
        <nav className="bg-slate-900 p-4 text-white flex justify-between items-center">
            <div className="text-lg font-bold">Weather App</div>
            <div className="space-x-4">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/favorites" className="hover:text-gray-300">Favorites</a>
            </div>
        </nav>
        <div className="text-white">
             reprehenderit dolore ex officiis!
        </div>
    </div>
  )
}

export default Navbar