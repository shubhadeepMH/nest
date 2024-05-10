import React from 'react'

function Footer() {
  return (
    <div className='bg-gray-100 w-[100%] border-t-2 rounded-t-md '>
        <footer class=" text-gray-600 py-4">
        <div class="container mx-auto flex justify-between items-center px-2">
            <div>
                <a href="https://3rdoor-general.netlify.app/About" class="mr-4 hover:text-gray-400">About</a>
                <a href="https://3rdoor-general.netlify.app/Feedback" class="mr-4 hover:text-gray-400">Feedback</a>
                <a href="https://3rdoor-general.netlify.app/" class="mr-4 hover:text-gray-400">Legal</a>
                <a href=" https://3rdoor-general.netlify.app/Contact" class="hover:text-gray-400">Contact</a>
            </div>
            <div>
                <span class="text-sm">&copy; 2024-2025 3rdoor community support LLC. All rights reserved.</span>
            </div>
        </div>
    </footer>
    </div>
  )
}

export default Footer
