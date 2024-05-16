import { useState } from 'react';
import { Popover, Input } from 'antd';
import { UserOutlined, LikeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { IoMdSend } from "react-icons/io";
import goldenBadge from '../assets/goldenBadge.png'
// Import Ant Design styles

const PostCard = ({ name, title, content, likes, comments, image, uid, fun, date,adminPost }) => {
    const [visible, setVisible] = useState(false);
    const [comment, setComment] = useState("");
    let [isReported, setIsReported] = useState(false)
    const [showFullContent, setShowFullContent] = useState(false);

    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
    };
    // Toggle Content
    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };
    const truncatedText = content.length > 200 ? `${content.slice(0, 200)}` : content;

    // Opening video i an dedicated tab
    const handleVideoClick = () => {
        if (image && image.includes('.mp4')) {
            window.open(image, '_blank'); // Open video URL in a new tab
        }
    };

    const handleReport = async () => {
        let resp = await fetch("https://training-mocha.vercel.app/report", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uniqueId: uid,
            }),
        })
        setIsReported(true)
        resp = await resp.json()
       
    }
    const addComment = async () => {
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
        setComment("")
        resp = await resp.json()
      

    }

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
            <div className="flex  justify-left items-center  gap-2 mb-2">
                <UserOutlined className="text-lg" />
                <p className="font-semibold ml-1">{name}</p>
                <p className=" text-sm text-black">{date}</p>
              { adminPost && <div className='flex justify-center items-center '>
                <img className='h-[2rem] w-[2rem]' src={goldenBadge}/>
                <span className='font-bold text-lg text-[#18366A]'>@Admin</span>
                </div>}
            </div>
            <div className='flex gap-2 items-center font-bold px-4 '>
                <p className="text-lg  font-bold text-left  text-[#18366A]">{title}</p>

                <p className='bg-gray-400 text-md  px-1 rounded-sm text-white'>{`@${uid}`}</p>
            </div>
                    {/* Logic for Toggle COntent if content length greater than 200 */}
            <p className="text-left px-4 text-gray-700" onClick={toggleContent}>
                {showFullContent ? content : truncatedText}
                {content.length > 200 && (
                    <span style={{ cursor: 'pointer', color: 'blue' }} onClick={toggleContent}>
                        {showFullContent ? ' (See less)' : ' ... See more'}
                    </span>
                )}
            </p>
            {
                image && (image.includes('png') || image.includes('jpeg') || image.includes("jpg")) && <img className='scale-y-90' src={image} />

            }
            {
                image && image.includes('mp4') && <video onClick={handleVideoClick} muted className='' controls autoPlay src={image} />

            }

            <div className="flex justify-around items-center">
                {/* <div className="flex items-center">
                    <LikeOutlined className="text-lg mr-1 cursor-pointer" onClick={handleLike} />
                    <span>{likes}</span>
                </div> */}
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
                <span onClick={handleReport} className="hover:text-red-600 font-serif cursor-pointer">
                    {isReported ? 'Reported' : 'report'}
                </span>
            </div>
        </div>
    );
};

export default PostCard;

