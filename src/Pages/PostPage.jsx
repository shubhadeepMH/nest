import React, { useState } from 'react'
import { UserOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { LuSendHorizonal } from "react-icons/lu";
import LeftSideBar from '../Components/LeftSideBar'
import RightSideBar from '../Components/RightSideBar'
import { useLocation } from 'react-router-dom'
import { Input } from 'antd';

function PostPage() {
    let { state } = useLocation()
    let [comment,setComment]=useState()
    let addComment=(e)=>{
        setComment(e.target.value)
        console.log(e.target.value);
    }

    let postComment=async()=>{
        console.log("Comment added");
        let resp = await fetch("https://training-mocha.vercel.app/comment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uniqueId: state.uid,
                comment
            }),
        })
        setComment("")
    }

    return (
        <div>
            <div className='bg-black h-screen flex '>
                <LeftSideBar />
                <div className='bg-black overflow-y-auto w-full p-2'>
                    <div className='flex space-x-2 items-center'>
                        <div className='left flex space-x-2 items-center'>
                            <div className='p-2 h-10 w-10 text-center rounded-full bg-white'>
                                <UserOutlined className="text-lg" />

                            </div>
                            <h2 className='text-white font-bold'>{state.name}</h2>
                        </div>
                        <div className='text-blue-400'>
                            {state.date}
                        </div>




                    </div>
                    {/* Content */}
                    <div className='text-white ml-4'>
                        <h2 className='font-bold'>{state.title}</h2>
                        <p>{state.content}</p>
                    </div>
                    {/* image or video */}
                    <div className='p-3 '>
                        {
                            state.image && (state.image.includes('png') || state.image.includes('jpeg') || state.image.includes("jpg")) && <img className='scale-y-90 rounded-lg' src={state.image} />

                        }
                        {
                            state.image && state.image.includes('mp4') && <video onClick={handleVideoClick} muted className='rounded-lg h-[50%]' controls autoPlay src={state.image} />

                        }
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
                                state.comments.map((comment) => {
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
                <RightSideBar />
            </div>
        </div>
    )
}

export default PostPage
