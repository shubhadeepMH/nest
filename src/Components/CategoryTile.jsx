import React from 'react'
import { BiImage } from 'react-icons/bi'
import { redirect } from 'react-router-dom'
import { useNavigate, Link } from 'react-router-dom'

function CategorieTile({ name, image, path, boards, tagLine ,categoryIndex,categoryLength}) {
  let navigate = useNavigate()

  return (
    <div className='hover:scale-100 hover:rounded-md hover:shadow-sm w-[100%] bg-black'>
      <div className='bg-black cursor-pointer h-[14rem] md:h-[5rem]  hover:shadow-black p-4  flex items-center justify-between border-t-2 border-gray-300  '>
        <img className='h-14 w-14' src={image} alt='Category' /> {/* Category image */}
        <div className='flex flex-col items-center'>
          <h2 className=' text-[2rem] md:text-[1.2rem] md:font-bold font-extrabold font-mono text-white'>{name}</h2> {/* Category name */}
          <div className='p-2'>
            <p className=' text-white text-center'>{tagLine}</p> {/* Dummy text */}
          </div>
        </div>
        <div className='flex flex-col items-center '>
          <h2 className='text-md text-white text-center font-sans font-semibold border-b border-gray-300 pb-[.1rem]'>Boards</h2> {/* Boards heading */}
          <p className='text-md font-bold text-slate-600 text-center'>{boards.length}</p> {/* Dummy number */}
        </div>
      </div>
      <div className='flex  flex-wrap justify-between p-2'>
        {
          boards.map((board, index) => {
            {/* Sending Data To Next Page */ }
            let dataToSend = { categoryName: name, image, path, boardName: board.boardName,tagLine }
           let  boardPath= board.boardPath
            return (
              categoryIndex!=categoryLength-1?( <div key={index} className=''>
                <h2 onClick={() => navigate(`/${path}/${boardPath}`, { state: dataToSend })} className=' font-bold md:text-sm text-white font-sans underline-offset-1 cursor-pointer underline'>{board.boardName}</h2>
              </div>):(
                <div key={index} className=''>
                <h2 onClick={() => navigate(`/special/${path}/${boardPath}`, { state: dataToSend })} className='text-lg font-bold md:text-sm text-white font-sans underline-offset-1 cursor-pointer underline'>{board.boardName}</h2>
              </div>
              )
            )
          })
        }
      </div>
    </div>

  )
}

export default CategorieTile
