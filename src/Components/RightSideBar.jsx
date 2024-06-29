import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link} from 'react-router-dom';

function RightSideBar() {
  return (
    <div>
      <div className='hidden   h-screen bg-black w-[15rem] lg:flex flex-col items-center  '>
      <Link to='/boards'>
      <div className=" space-x-2 mt-2 cursor-pointer hidden md:flex items-center rounded-lg border border-blue-400 px-3 font-bold text-white">
      <p className="">Go To Boards </p>
      <FaArrowRightLong className="text-white" />
      </div>
      </Link>
        <div className='m-2 p-2'>
        <div className='border-slate-400 h-[8rem] w-[10rem]  p-3 rounded-lg border-2'>
            <p className='text-white text-center'>We are always looking forward to your feedback</p>
        </div>
        </div>

      </div>
    </div>
  )
}

export default RightSideBar
