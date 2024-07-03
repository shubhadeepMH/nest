import React, { useState,useEffect } from 'react'
import { UserOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { LuSendHorizonal } from "react-icons/lu";
import LeftSideBar from '../Components/LeftSideBar'
import RightSideBar from '../Components/RightSideBar'
import { useLocation } from 'react-router-dom'
import { Input } from 'antd';

function PostPage() {
    let [postData,setpostData]=useState()

    let { state } = useLocation()
    // console.log(state.uid)
    let [comment,setComment]=useState()
    let addComment=(e)=>{
        setComment(e.target.value)
      
    }

    const fetchpostData=async()=>{
        let data=await fetch('https://training-mocha.vercel.app/get-post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              uid:state.uid
            })
          });
          data=await data.json()
          setpostData(data);
    }

    useEffect(()=>{
        fetchpostData()
      
    })


    let postComment=async()=>{
        
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

        // Temporarily setting the comment to the array.
        setComment("")
    }

    return (
        <div>
            <div className='bg-black h-screen flex '>
                <LeftSideBar postPossible={state.postPossible}/>
                <div className='bg-black overflow-y-auto w-full p-2'>
                    <div className='flex space-x-2 items-center'>
                        <div className='left flex space-x-2 items-center'>
                            <div className='p-2 h-10 w-10 text-center rounded-full bg-white'>
                                <UserOutlined className="text-lg" />

                            </div>
                            <h2 className='text-white font-bold'>{postData?.name}</h2>
                        </div>
                        <div className='text-blue-400'>
                            {postData?.date}
                        </div>




                    </div>
                    {/* Content */}
                    <div className='text-white ml-4'>
                        <h2 className='font-bold'>{state.title}</h2>
                        <p>{postData?.content}</p>
                    </div>
                    {/* image or video */}
                    <div className='p-3 '>
                        {
                            postData?.fileUrl && (  postData?.fileUrl.includes('png') || postData?.fileUrl.includes('jpeg') || postData?.fileUrl.includes("jpg")) && <img className='scale-y-90 rounded-lg' src={postData?.fileUrl} />

                        }
                        {
                            postData?.fileUrl && postData?.fileUrl.includes('mp4') && <video  muted className='rounded-lg h-[50%]' controls autoPlay src={postData?.fileUrl} />

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
                                postData?.comments.map((comment) => {
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
