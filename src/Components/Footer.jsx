import React from 'react'

function Footer() {
  return (
    <div className='bg-black relative bottom-0 w-[100%] border-t-2 rounded-t-md '>
        <footer className=" text-gray-600 py-4">
        <div className="container mx-auto md:flex justify-between items-center px-2">
            <div className='text-center'>
                <a href="https://3rdoor-general.netlify.app/About" class="mr-4 hover:text-white">About</a>
                <a href="https://3rdoor-general.netlify.app/Feedback" class="mr-4 hover:text-white">Feedback</a>
                <a href="https://3rdoor-general.netlify.app/" class="mr-4 hover:text-white">Legal</a>
                <a href=" https://3rdoor-general.netlify.app/Contact" class="hover:text-white">Contact</a>
            </div>
            <div>
                <span className="text-sm">&copy; 2024-2025 3rdoor community support LLC. All rights reserved.</span>
            </div>
        </div>
    </footer>
    </div>
  )
}

export default Footer
