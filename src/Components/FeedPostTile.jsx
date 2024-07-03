import React, { useState } from 'react'
import { UserOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { FaRegComments, FaRegShareSquare } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setScrollPosition } from '../store/Slices/postSlice';
import { RxCross2 } from "react-icons/rx";
import PostModal from './PostModal';
import DetectScreen from './DetectScreen';


function FeedPostTile({ name, title, content, likes, comments, image, uid, fun, date, adminPost }) {
    const [showFullContent, setShowFullContent] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);

    const { width } = DetectScreen();

    let dispatch = useDispatch()
showPostModal

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    // Toggling Post Modal
    let togglePostModal=()=>{
        setShowPostModal(!showPostModal)
       
    }
    const truncatedText = content.length > 200 ? `${content.slice(0, 200)}` : content;


    let navigate = useNavigate()
    let sharePost = async () => {
        console.log(window.location.href+"/"+uid)
        const shareData = {
            title:title,
            image:image,
            url: window.location.href+"/"+uid
        };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Post shared successfully');
            } catch (error) {
                console.error('Error sharing post', error);
            }
        } else {
            // Fallback: copy link to clipboard
            navigator.clipboard.writeText(shareData.url)
                .then(() => alert('Link copied to clipboard'))
                .catch(err => console.error('Error copying link to clipboard', err));
        }
    }


    const handleVideoClick = () => {
        if (image && image.includes('.mp4')) {
            window.open(image, '_blank'); // Open video URL in a new tab
        }
    };

    let dataToSend = { name, title, content, likes, comments, image, uid, fun, date, adminPost, postPossible: false, }


    const handlePostClick = () => {
        if (width < 768) {
            navigate('/post/' + uid, { state: dataToSend })
            dispatch(setScrollPosition(window.pageYOffset || document.documentElement.scrollTop));
    
        }else{

            togglePostModal()
        }
       
        
    }

    return (
        <div className=' border-b border-slate-300 bg-black py-2 px-1 cursor-pointer'>
            {/* Header */}
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
            {/* Content */}
            <div onClick={handlePostClick} className='text-white ml-4 mt-2'>
                <h2 className='font-bold text-xl md:text-md'>{title}</h2>
                <p className="text-lg " onClick={toggleContent}>
                    {showFullContent ? content : truncatedText}
                    {content.length > 200 && (
                        <span style={{ cursor: 'pointer', color: 'blue' }} onClick={toggleContent}>
                            {showFullContent ? ' (See less)' : ' ... See more'}
                        </span>
                    )}
                </p>
            </div>
            {/* image or video */}
            <div className='p-3 '>
                {
                    image && (image.includes('png') || image.includes('jpeg') || image.includes("jpg")) && <img className='scale-y-90 rounded-lg z-0' src={image} />

                }
                {
                    image && image.includes('mp4') && <video muted className='rounded-lg h-[50%] z-0' controls autoPlay src={image} />

                }
            </div>
            <div className=' border-gray-300 border-t flex justify-around items-center mt-2'>
                <div onClick={() => navigate('/post/' + uid, { state: dataToSend })} className='flex items-center space-x-2 p-1'>
                    <FaRegComments className='h-6 w-6 text-blue-600' />
                    <p className='text-blue-600'>{comments?.length}</p>
                </div>
                <div>
                    <FaRegShareSquare onClick={sharePost} className='h-6 w-6 text-blue-600' />
                </div>

               {showPostModal && <PostModal  togglePostModal={togglePostModal} uid={uid}/>}
            </div>
        </div>
    )
}

export default FeedPostTile
