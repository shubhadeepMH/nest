import React from 'react'
import { BiImage } from 'react-icons/bi'
import { redirect } from 'react-router-dom'
import { useNavigate, Link } from 'react-router-dom'

function CategorieTile({ name, image, path, boards, tagLine }) {
  let navigate = useNavigate()

  return (
    <div className='hover:scale-100 hover:rounded-md hover:shadow-sm w-[100%] '>
      <div className='bg-white cursor-pointer h-[14rem] md:h-[5rem]  hover:shadow-black p-4  flex items-center justify-between border-t-2 border-gray-300  '>
        <img className='h-14 w-14' src={image} alt='Category' /> {/* Category image */}
        <div className='flex flex-col items-center'>
          <h2 className=' text-[2rem] md:text-[1.2rem] md:font-bold font-extrabold font-mono text-blue-500'>{name}</h2> {/* Category name */}
          <div className='p-2'>
            <p className='text-[3rem] md:text-sm text-gray-500'>{tagLine}</p> {/* Dummy text */}
          </div>
        </div>
        <div className='flex flex-col items-center '>
          <h2 className='text-md text-center font-sans font-semibold border-b border-gray-300 pb-[.1rem]'>Boards</h2> {/* Boards heading */}
          <p className='text-md font-bold text-slate-600 text-center'>{boards.length}</p> {/* Dummy number */}
        </div>
      </div>
      <div className='grid grid-cols-4 p-2 gap-4 justify-center ml-[3rem]'>
        {
          boards.map((board, index) => {
            {/* Sending Data To Next Page */ }
            let dataToSend = { categoryName: name, image, path, boardName: board.boardName }
           let  boardPath= board.boardPath
            return (
              <div key={index} className=''>
                <h2 onClick={() => navigate(`/${path}/${boardPath}`, { state: dataToSend })} className='text-lg  md:text-sm text-blue-800 font-sans underline-offset-1 cursor-pointer underline'>{board.boardName}</h2>
              </div>
            )
          })
        }
      </div>
    </div>

  )
}

export default CategorieTile
