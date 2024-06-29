import React, { useState } from 'react';
import { Popover, Input, Dropdown, Menu, Button,message } from 'antd';
import { UserOutlined, CommentOutlined, EllipsisOutlined } from '@ant-design/icons';
import { IoMdSend } from "react-icons/io";

const AdminPostCard = ({ name, title, content, likes, comments, image, uid, date,postId }) => {
    const [visible, setVisible] = useState(false);
    const [comment, setComment] = useState("");
    const [isReported, setIsReported] = useState(false);
    const [showFullContent, setShowFullContent] = useState(false);

    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
    };

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    const truncatedText = content.length > 200 ? `${content.slice(0, 200)}...` : content;

    const handleReport = async () => {
        // Implement your report logic here
        setIsReported(true);
    };

    const addComment = async () => {
        // Implement your add comment logic here
        setComment("");
    };
    // Handle Delete Posts

    let handleDeletePost=async()=>{
        try{
            let resp=await fetch(`https://training-mocha.vercel.app/delete/${postId}`,{
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
            })
            resp=await resp.json()
            message.success("Post deleted successfully")
            
            
        }catch(error){
                message.error(error)
        }
       
    }

    const handleMenuClick = ({ key }) => {
        if (key === 'delete') {
            // Call onDelete function when "Delete Post" is clicked
        }
        // Add logic for other menu items (e.g., "Edit Post") here
    };

    let trend=async()=>{
            let resp=await fetch('https://training-mocha.vercel.app/trend-post',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postUid: postId,
                }),
                
               
            })
            
                resp=await resp.json();
                console.log(resp)
                console.log("_id:",postId)
        
    }

    //   Post options Menu
    const menu = (
        <Menu onClick={handleMenuClick}>
          
            <Menu.Item onClick={handleDeletePost} key="delete">Delete Post</Menu.Item>
        </Menu>
    );

    const commentList = (
        <div className="p-4 ">
            <div className='flex gap-1 justify-center items-center '>
                <Input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." className="" />
                <div className='h-[2rem] w-[2.5rem] rounded-full flex justify-center items-center  cursor-pointer'>

                    <IoMdSend onClick={addComment} size={27} color='blue' className=' active:scale-x-125' />
                </div>
            </div>

            <div className='mt-2'>


                {comments.length > 0 ? comments.map((comment, index) => (
                    <div key={index} className="mb-1 w-[20rem]  p-[5px] items-center border-[1px] border-gray-500">
                        <div className='flex text-xs gap-1 items-center justify-left'>
                            <UserOutlined className="text-lg" />
                            <p className='text-sm font-bold text-gray-600'>Unknown</p>
                        </div>
                        <p>{comment}</p>
                    </div>
                )) : (
                    <p>No Comment Yet</p>
                )
                }
            </div>
        </div>

    );

    return (
        <div className="bg-white p-2 rounded-lg shadow-md max-w-xl mx-auto my-2">
            <div className='flex items-center justify-between'>
                <div className="flex justify-left items-center gap-2 mb-2">
                    <UserOutlined className="text-lg" />
                    <p className="font-semibold ml-1">{name}</p>
                    <p className="text-sm text-black">{date}</p>
                </div>
                <div>
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                        <Button type="text" icon={<EllipsisOutlined style={{fontSize:'20px', fontWeight:'bold'}} className=' text-blue-700' />} />
                    </Dropdown>

                </div>
            </div>
            <div className='flex gap-2 items-center font-bold px-4'>
                <p className="text-lg font-bold text-left text-[#18366A]">{title}</p>
                <p className='bg-gray-400 text-md px-1 rounded-sm text-white'>{`@${uid}`}</p>
            </div>
            <p className="text-left px-4 text-gray-700" onClick={toggleContent}>
                {showFullContent ? content : truncatedText}
                {content.length > 200 && (
                    <span style={{ cursor: 'pointer', color: 'blue' }} onClick={toggleContent}>
                        {showFullContent ? ' (See less)' : ' ... See more'}
                    </span>
                )}
            </p>
            {image && (image.includes('png') || image.includes('jpeg') || image.includes("jpg")) && <img className='scale-y-90' src={image} />}
            {image && image.includes('mp4') && <video  muted className='' controls autoPlay src={image} />}
            <div className="flex justify-around items-center">
                <Popover
                    content={commentList}
                    title="Comments"
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                    className='cursor-pointer'
                >
                    <CommentOutlined className="text-lg mr-1" />
                    <span className="">Comments</span>
                </Popover>

                <p onClick={trend} className="text-lg mr-1 cursor-pointer">trend</p>
                {/* <span onClick={handleReport} className="hover:text-red-600 font-serif cursor-pointer">
                    {isReported ? 'Reported' : 'report'}
                </span> */}
            </div>
        </div>
    );
};

export default AdminPostCard;
