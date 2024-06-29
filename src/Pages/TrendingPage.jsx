import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Components/Navbar'
import FeedPostTile from '../Components/FeedPostTile';
import formattedDateTime from '../Utils/DateFormatter';
import { IoAddCircle } from "react-icons/io5";
import { FaFileCirclePlus } from "react-icons/fa6";
import LeftSideBar from '../Components/LeftSideBar';
import RightSideBar from '../Components/RightSideBar';
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Input, message } from "antd";
import logo from '../assets/logo-3-bc.png'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '../firebase.js'



function Feed() {
    let [trendingPosts, setTrendingPosts] = useState()


    let navigate = useNavigate()



    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [scrollDirection, setScrollDirection] = useState(null);







    // Fetching Trending Posts from backend

    let fetchPosts = async () => {
        let postResp = await fetch("https://training-mocha.vercel.app/trending");

        postResp = await postResp.json()
        setTrendingPosts(postResp.trending)
    }

    useEffect(() => {
        fetchPosts()
    }, [])
    // Clicked Post Button



    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            setScrollDirection('down');
        } else if (scrollTop < lastScrollTop) {
            setScrollDirection('up');
        }

        setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop); // For Mobile or negative scrolling
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // console.log(scrollDirection)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);




    return (
        <div className=''>


            {/* <header>
        <Navbar />
      </header> */}
            <header className='bg-black  p-1 flex items-center space-x-2 fixed top-0 w-screen'>
                <img className='h-[1.5rem] w-[2.5rem]' src={logo} alt="" srcset="" />
                <h1 className='font-extrabold text-xl text-white'>3rdoor</h1>
                <div className="trending p-2  ml-[2rem] cursor-pointer ">
                    <p className={` text-white font-bold mt-1 }`}>Trends</p>
                </div>
            </header>
            <div className='lg:flex md:mt-[3.2rem] h-screen lg:overflow-hidden'>

                <div className=' overflow-y-auto  w-full bg-black'>

                    {trendingPosts ? trendingPosts.map((post, index) => {
                        let date = formattedDateTime(post.date);
                        return (
                            <div key={post.uniqueId}>
                                <FeedPostTile
                                    name={post.name}
                                    adminPost={post.adminPost}
                                    title={post.title}
                                    content={post.content}
                                    likes={post.likes}
                                    comments={post.comments}
                                    image={post.fileUrl}
                                    uid={post.uniqueId}
                                    // fun={fetchPosts}
                                    date={date}
                                />
                            </div>
                        );
                    }) : (
                        <div className=' w-full bg-black h-screen'>
                            <h1 className='text-blue-500 font-extrabold text-[2.5rem]md:font-light text-center mt-[28rem] md:mt-[20rem]'>3rdoor...</h1>

                        </div>
                    )}
                </div>
                <RightSideBar />
            </div>


        </div>
    )
}

export default Feed
