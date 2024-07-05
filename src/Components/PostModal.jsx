import React, { useState, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { UserOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { LuSendHorizonal } from "react-icons/lu";
import { FaRegComments, FaRegShareSquare } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import formattedDateTime from '../Utils/DateFormatter';
function PostModal({ uid, togglePostModal,sharePost }) {

    let [comment, setComment] = useState()
    let [postData, setPostData] = useState()
    let [date,setDate]=useState()




    let hideModal = () => {
        togglePostModal()
    }

    let sharePosts=()=>{
            sharePost()
    }



    let addComment = (e) => {
        setComment(e.target.value)

    }

    const fetchPostData = async () => {
        let data = await fetch('https://training-mocha.vercel.app/get-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid
            })
        });
        data = await data.json()
        setPostData(data);
        let getDate=formattedDateTime(postData?.date)

        setDate(getDate)
    }

    useEffect(() => {
        fetchPostData()
        // console.log(postData)
    })

    let postComment = async () => {


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



        // Temporarily setting the comment to the array.
        setComment("")
    }

    return (
        <div className='h-[34rem] z-20 w-[50rem] hidden md:block overflow-auto fixed top-[6%] left-[22%] bg-black border border-white rounded-lg scrollbar-hide  shadow-white shadow-inner '>
            <div className='p-2 flex items-center justify-end relative'>
                <div onClick={hideModal} className='h-10 w-10 absolute  top-1 rounded-full  hover:bg-black flex items-center justify-center'>
                    <RxCross2 className='text-white h-8 w-8' />
                </div>
            </div>


            <div className='flex items-center justify-between p-3'>
                <div className='flex space-x-2 items-center'>
                    <div className='left flex space-x-2 items-center'>
                        <div className='p-2 h-10 w-10 text-center rounded-full bg-white'>
                            <UserOutlined className="text-lg" />

                        </div>
                        {/* <h2 className='text-white font-bold'>{name}</h2> */}
                    </div>
                    <div className='text-blue-400'>
                        {date}
                    </div>




                </div>

            </div>

            {/* Content */}
            <div className='text-white ml-4 '>
                <h2 className='font-bold text-xl md:text-md'>{postData?.title}</h2>
                <p className="text-lg " >

                    {postData?.content}

                </p>
            </div>
            {/* image or video */}
            <div className='p-3 '>
                {
                    postData?.fileUrl && (postData?.fileUrl.includes('png') || postData?.fileUrl.includes('jpeg') || postData?.fileUrl.includes("jpg")) && <img className='h-[26rem] w-[28rem] m-auto text-center rounded-lg z-0' src={postData.fileUrl} />

                }
                {
                    postData?.fileUrl && postData?.fileUrl.includes('mp4') && <video muted className='rounded-lg h-[50%] z-0' controls autoPlay src={postData.fileUrl} />

                }
            </div>
            <div className=' border-gray-300 border-t flex justify-around items-center mt-2'>
                <div className='flex items-center space-x-2 p-1'>
                    <FaRegComments className='h-6 w-6 text-blue-600' />
                    <p className='text-blue-600'>{postData?.comments?.length}</p>
                </div>
                <div>
                    <FaRegShareSquare onClick={ sharePosts} className='h-6 w-6 text-blue-600' />
                </div>


            </div>

            <div className='flex items-center p-1'>
                <input onChange={addComment} value={comment} placeholder=' Add your comment  ' className='bg-black outline-none text-slate-400 w-full border-none p-2 ' />
                {comment?.length > 0 && <LuSendHorizonal onClick={postComment} className='text-blue-500 h-6 w-6 cursor-pointer active:scale-110' />}

            </div>


            {/* Comments section */}
            <div>
                <h1 className='border-b px-3 font-bold border-blue-500 text-white'>
                    Comments
                </h1>

                <div>

                    {
                        postData?.comments?.map((comment) => {
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
