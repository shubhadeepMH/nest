import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { UserOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { LuSendHorizonal } from "react-icons/lu";
import { FaRegComments, FaRegShareSquare } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
function PostModal({name,date,content,title,comments,image,togglePostModal,sharePost,uid}) {
 
    let [comment,setComment]=useState()

    let hideModal=()=>{
        togglePostModal()
    }

    let [replies,setReplies]=useState(comments);

   
    let addComment=(e)=>{
        setComment(e.target.value)
      
    }

    let postComment=async()=>{
        let commentData=comments;
        console.log(commentData)
        let resp = await fetch("https://training-mocha.vercel.app/comment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uniqueId: uid,
                comment
            }),
        })
           
            
            commentData.unshift(comment)
       setReplies(commentData) // Temporarily setting the comment to the array.
        setComment("")
    }

  return (
    <div className='h-[35rem] z-20 w-[50rem] hidden md:block overflow-auto fixed top-[10%] left-[24%] bg-black border border-white rounded-lg  shadow-white shadow-inner '>
        <div className='flex items-center justify-between p-3'>
            <div className='flex space-x-2 items-center'>
                <div className='left flex space-x-2 items-center'>
                    <div className='p-2 h-10 w-10 text-center rounded-full bg-white'>
                        <UserOutlined className="text-lg" />

                    </div>
                    <h2 className='text-white font-bold'>{name}</h2>
                </div>
                <div className='text-blue-400'>
                    {date}
                </div>




            </div>
            <div onClick={hideModal} className='h-10 w-10 rounded-full hover:bg-black flex items-center justify-center'>
            <RxCross2 className='text-white h-8 w-8' />
            </div>
            
        </div>

        {/* Content */}
        <div  className='text-white ml-4 mt-2'>
                <h2 className='font-bold text-xl md:text-md'>{title}</h2>
                <p className="text-lg " >
                  
                    {content}
                    
                </p>
            </div>
            {/* image or video */}
            <div className='p-3 '>
                {
                    image && (image.includes('png') || image.includes('jpeg') || image.includes("jpg")) && <img className='h-[20rem] w-[30rem] m-auto text-center rounded-lg z-0' src={image} />

                }
                {
                    image && image.includes('mp4') && <video muted className='rounded-lg h-[50%] z-0' controls autoPlay src={image} />

                }
            </div>
            <div className=' border-gray-300 border-t flex justify-around items-center mt-2'>
                <div  className='flex items-center space-x-2 p-1'>
                    <FaRegComments className='h-6 w-6 text-blue-600' />
                    <p className='text-blue-600'>{comments?.length}</p>
                </div>
                <div>
                    <FaRegShareSquare onClick={()=>sharePost()} className='h-6 w-6 text-blue-600' />
                </div>

              
            </div>

            <div className='flex items-center p-1'>
                        <input onChange={addComment} value={comment} placeholder=' Add your comment  ' className='bg-black outline-none text-slate-400 w-full border-none p-2 ' />
                     { comment?.length>0 &&  <LuSendHorizonal onClick={postComment} className='text-blue-500 h-6 w-6 cursor-pointer active:scale-110' />}

                    </div>


                    {/* Comments section */}
                    <div>
                        <h1 className='border-b px-3 font-bold border-blue-500 text-white'>
                            Comments
                        </h1>

                        <div>

                            {
                                replies?.map((comment) => {
                                    return (
                                        <div>
                                            <div className='flex items-center space-x-1 p-1'>
                                                <UserOutlined className="text-lg text-blue-600" />
                                                <h2 className='text-white'>Unknown</h2>
                                            </div>
                                            <div className='px-2 mx-1'>
                                                <p className='text-slate-400 font-bold ml-4'>{comment}</p>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
        </div>
  )
}

export default PostModal
