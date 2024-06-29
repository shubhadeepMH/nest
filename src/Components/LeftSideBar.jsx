import React from 'react'
import logo from '../assets/logo2.png'
import { IoAddCircle } from "react-icons/io5";
import { GiHistogram } from "react-icons/gi";
import {Link} from 'react-router-dom';

let datas = [
    {
        icon: "IoAddCircle",
        text: "Post"
    },
    {
        icon: "GiHistogram",
        text: "Trending"
    },
]

function LeftSideBar({togglePosting,postPossible}) {
    return (
        <div>
            <div className='hidden lg:block  h-screen bg-black w-[20rem] '>
                <div className='flex items-center space-x-1'>
                    <img src={logo} alt="" className='h-[6rem] w-[6rem]' />
                    <h1 className='font-bold text-2xl  p-2 text-white'>3rdoor.com</h1>
                </div>

                <div>
                    <div className='ml-3  '>
                    <a href="/feed#post">
                       {postPossible && <div onClick={()=>togglePosting()} className='flex items-center m-2 space-x-2 p-2 cursor-pointer hover:bg-slate-600 rounded-xl'>
                            <IoAddCircle className='h-[2rem] w-[2rem] text-blue-400 active:scale-105 ' />
                            <h1 className=' text-2xl font-extralight   text-white '>post</h1>
                        </div>}
                        </a>
                        <Link to="/trending">
                        <div className='flex items-center p-2 space-x-2 m-2 cursor-pointer'>
                            <GiHistogram className='h-[2rem] w-[2rem] text-blue-400' />
                            <h1 className=' text-2xl font-extralight   text-white'>trending</h1>
                        </div>
                        </Link>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar
