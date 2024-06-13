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


function Feed() {
  let [posts, setPosts] = useState()
  let selectRef = useRef()
  let fileRef = useRef()
  let [title, setTitle] = useState()
  let [content, setContent] = useState()
  let [file, setFile] = useState(null)
  let [uid, setUid] = useState(null)
  let [imageUrl, setImageUrl] = useState(null)
  let [hashTags, setHashTags] = useState([])
  let [hashTag, setHashTag] = useState()
  let [posting, setPosting] = useState(false)

  let navigate = useNavigate()



  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);

  let categories = ["Game Release", "Retro Games", "Gemerals", "MMGD", "News", "International", "Elections", "Justice/News2", "Manga", "Recent Animes", "Wallpeper", "Fashion", "Hentai", "Torrents", "Leaked Movies"]
  // Function to shuffle the posts array
  
    // Generating Unique Id

  const generateUniqueId = () => {
    const fullUuid = uuidv4(); // Generate a full UUID
    const shortId = fullUuid.split('-').join('').substring(0, 8); // Remove dashes and take first 8 characters

    return shortId;
  };

  // Adding Hashtag Functions

  let addHashTags = () => {
    setHashTags((prev) => {
      return [...prev, hashTag];
    })
    setHashTag("")
  }

  // Adding Post

  let addPost=()=>{
   
  }

  // Select video or Image Files
  let selectFile = (e) => {
    setFile(e.target.files[0])

  }

  // Fetching Posts from backend

  let fetchPosts = async () => {
    let postResp = await fetch("https://training-mocha.vercel.app/all-posts");

    postResp = await postResp.json()
    console.log(postResp.shuffledPosts)
    setPosts(postResp.shuffledPosts)
  }

  useEffect(() => {
    fetchPosts()
  }, [])
  // Clicked Post Button

  let togglePosting = () => {
    setPosting(true)

  }

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
      <div className='lg:flex h-screen lg:overflow-hidden'>
        <LeftSideBar togglePosting={togglePosting} />
        <div className=' overflow-y-auto  w-full bg-black'>
          {posting && <section className='border-b border-slate-500' id='post'>
            <div className=''>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Add Title' className='w-full bg-black p-2 text-white  h-10 outline-none border-none  ' type="text" />
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='Say Something...' className='w-full bg-black p-2 text-white  h-[7rem] outline-none border-none  ' type="text" />

              {/* HashTags */}
              <div className='flex items-center space-x-2 flex-wrap'>
                {/* Looping Hash Tags */}
                <div className="flex items-center space-x-1 flex-wrap">
                  {hashTags.map((tag) => {
                    return (

                      <p className='text-blue-600 font-light'>
                        #{tag}
                      </p>

                    )
                  })

                  }
                </div>
                <input value={hashTag} onChange={(e) => setHashTag(e.target.value)} placeholder='Add # tags' className='w-[8rem] bg-black p-2 text-white  h-10 outline-none border-none  ' type="text" />
                {hashTag?.length > 0 && <button onClick={addHashTags} className='border border-slate-300 rounded-lg text-white font-light px-3'>Add</button>}
              </div>

            </div>
            <div className='flex items-center p-2 ml-2 space-x-2'>
              <FaFileCirclePlus onClick={() => { fileRef.current.click() }} className='text-slate-400 hover:text-blue-500 h-6 w-6 cursor-pointer' />
              <div className='flex items-center justify-between w-full px-3 ' >

                <div>
                  <input onChange={selectFile} className='hidden' accept=".png,.jpeg,.jpg,.mp4" ref={fileRef} type="file" />
                  {!file ? <label className='font-bold text-white font-mono ml-3 '>Add File</label> : <span className='font-bold text-white font-mono '>{file.name}</span>}
                </div>
                <div className=''>
                  <p onClick={addPost} className='font-mono cursor-pointer hover:font-bold active:scale-105 text-blue-500 rounded-lg border border-blue-400 px-8'>post</p>
                  {/* <select defaultChecked="Select" defaultValue={`Select`} className='bg-black cursor-pointer text-white border-none outline-none' name="category" id="select">
                  {categories.map((category) => {
                    return (
                      <option value={category}>{category}</option>
                    )
                  })}

                </select> */}
                </div>



              </div>


            </div>
          </section>}
          {posts ? posts.map((post, index) => {
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
              <h1 className='text-blue-500 text-2xl font-light text-center mt-[20rem]'>3rdoor...</h1>

            </div>
          )}
        </div>
        <RightSideBar />
      </div>

      <div className={`text-center fixed lg:hidden bottom-0 w-full border-t border-blue-400 p-1 bg-transparent rounded-lg ${scrollDirection === 'down' ? 'opacity-30' : 'opacity-100'} `}>
        <a href="#post">
          <IoAddCircle onClick={togglePosting} className={`h-9 w-9 m-auto text-center cursor-pointer text-white active:scale-105 ${scrollDirection === 'down' ? 'disabled:' : ''}`} />
        </a>
      </div>
    </div>
  )
}

export default Feed
