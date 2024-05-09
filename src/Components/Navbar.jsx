import React from 'react'
import logo from '../assets/logo.png'
// #18366A
function Navbar() {
  return (
    <div className='bg-[#18366A] w-full h-[10rem] md:h-32  md:rounded-t-lg'>
      <div className='flex justify-between items-center md:h-32  md:px-10 h-[10rem]'>
        <div className='flex-shrink-0'>
          <img className='h-10 md:h-[4rem] w-auto md:w-[4rem]' src={logo} alt='logo' />
        </div>
        <div className='flex-grow text-white p-8 '>
          <h2 className='text-xl md:text-5xl font-bold leading-tight'> Nest.com</h2>
          <h3 className='text-[.5rem]  md:text-lg font-bold text-gray-300 '>Express Your Thought Without Any Intervention</h3>
        </div>
        <div className='hidden md:flex gap-10 font-mono mt-2 content-center justify-center items-center'>
          <p className='cursor-pointer text-white hover:text-green-300'>Home</p>
          <p className='cursor-pointer  text-white hover:text-green-300'>Trending</p>
        </div>
      </div>
    </div>

  )
}

export default Navbar
