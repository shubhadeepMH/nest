import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';



function Note() {
    const [visible,setVisible]=useState(true)
    const handlePopUp=()=>{
        
        setVisible(false)
       
    }
  return (
    <>
  {visible && <div className='bg-[#18366A] h-[30rem] md:h-[17rem] p-4 md:p-8 my-4 rounded-lg border-4 border-red-500 border-opacity-50 relative'>
    <div className='border-4 border-green-500 border-opacity-50 rounded-lg p-4 md:p-8'>
      <IoMdClose onClick={handlePopUp} className='text-white absolute top-0 right-0 m-4  cursor-pointer' /> {/* Cross icon */}
      <p className='text-white text-[3rem] md:text-xl h-[100%] font-serif'>
        “<strong className='text-orange-500 font-bold text-[2rem]'>3rdoor</strong> is a platform promoting anonymous, unrestricted speech without registration. Users select a category, join or create boards, and freely share thoughts without judgment. Anonymity ensures privacy and fosters open dialogue, valuing content over identity. Nest invites users to explore and contribute to diverse discussions, emphasizing the importance of every voice in a supportive community.”
      </p>
    </div>
  </div>}
  </>
  
  )
}

export default Note
