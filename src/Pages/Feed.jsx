import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Components/Navbar'
import FeedPostTile from '../Components/FeedPostTile';
import formattedDateTime from '../Utils/DateFormatter';
import { IoAddCircle } from "react-icons/io5";
import { FaFileCirclePlus ,FaArrowRightLong} from "react-icons/fa6";

import LeftSideBar from '../Components/LeftSideBar';
import RightSideBar from '../Components/RightSideBar';
import { FaAngleDown } from "react-icons/fa";
import { useNavigate ,Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Input, message } from "antd";
import logo from '../assets/logo-3-bc.png'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '../firebase.js'
import { addPosts } from '../store/Slices/postSlice.js';
import { useDispatch,useSelector } from 'react-redux';


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
  let dispatch=useDispatch()

  const postsData = useSelector((state) => state.posts.posts)
  const scrollPosition = useSelector((state) => state.posts.scrollPosition)
  const isLoaded = useSelector((state) => state.posts.isLoaded) //Flag for loading the posts or not
  



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

  let addPost=async()=>{
    if (title && content) {
      try {
        // Generate unique ID
        const id = generateUniqueId();
        setUid(id);

      

        if (file) {
          // Check if the selected file is an image or video (PNG or JPEG/mp4)
          const isImageFile = file.type.startsWith('image/');
          const isVideoFile = file.type.startsWith('video/mp4');
          if (isImageFile || isVideoFile) {
            message.info('Uploading your post. Please wait...');

            // Upload file to Firebase Storage
            const fileName = `${Date.now()}_${file.name}`;
            const storageRef = ref(storage, `images/${fileName}`);
            await uploadBytes(storageRef, file);

            // Get download URL for the uploaded image
            const downloadUrl = await getDownloadURL(storageRef);
            setImageUrl(downloadUrl);

            // Upload data to API including file URL
            const uploadResp = await fetch('https://training-mocha.vercel.app/add-post', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                title,
                content,
                fileUrl: downloadUrl,
                hashTags,
                uniqueId: id
              })
            });
            const responseData = await uploadResp.json();
            // Playing Audio
            // const audioPlay = new Audio(audio);
            // audioPlay.volume = 1.0
            // audioPlay.play()
            //   .then(() => {
            //     message.success('Post uploaded successfully');
            //   })
            //   .catch(error => console.error('Error playing audio:', error));
            let postArr=posts;
            postArr.unshift({
              title,
              content,
              fileUrl: downloadUrl,
              hashTags,
              uniqueId: id,
              date:Date.now()
            })
            setPosts(postArr)


          } else {
            // Selected file is not an image
            message.error('Please select a PNG or JPEG image file.');
          }
        } else {
          // Upload post without image file
          const uploadResp = await fetch('https://training-mocha.vercel.app/add-post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
             
              title,
              content,
              hashTags,
              uniqueId: id
            })
          });
          const responseData = await uploadResp.json();

          // // Playing Audio
          // const audioPlay = new Audio(audio);
          // audioPlay.volume = 1.0
          // audioPlay.play()
          //   .then(() => {

          //     message.success('Post uploaded successfully');
          //   })
          //   .catch(error => console.error('Error playing audio:', error));
          let postArr=posts;
          postArr.unshift({
            title,
            content,
            hashTags,
            uniqueId: id,
            date:Date.now()
          })
          setPosts(postArr)

        }

        // Reset form state
        message.success('Post uploaded successfully');
      
        setTitle('');
        setContent('');
        setFile(null);
        setUid('');
        setImageUrl('');
        setHashTags([])
        // Hiding posting section
        setPosting(false);
      } catch (error) {
        console.error('Error uploading post:', error);
        message.error('Failed to upload post. Please try again.');
      }
    } else {
      message.error('Please Add Title and Content');
    }

  }

  // Cancelling Post
  
  let cancelPost=()=>{

    setTitle('');
    setContent('');
    setFile(null);
    setUid('');
    setImageUrl('');
    setHashTags([])
    // Hiding posting section
    setPosting(false);
  }

  // Select video or Image Files
  let selectFile = (e) => {
    setFile(e.target.files[0])

  }

  // Fetching Posts from backend

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://training-mocha.vercel.app/all-posts");
      const data = await response.json();
      dispatch(addPosts(data.shuffledPosts));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      fetchPosts();
    }
  }, [isLoaded, dispatch]);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  // Clicked Post Button

  let togglePosting = () => {
    setPosting(true)

  }

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // console.log(scrollTop)


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
      <header className='bg-black z-20 md:hidden p-2 flex items-center px-1 justify-around fixed top-0 w-screen'>
      <div className="flex items-center space-x-1">
      <img className='h-[1.5rem] w-[2.5rem]' src={logo} alt="" srcset="" />
        <h1 className='font-extrabold text-xl text-white'>3rdoor</h1>
        </div>
        <Link to='/trending'>
        <div  className="trending    cursor-pointer ">
    <p className={`space-x-2 mt-2 cursor-pointer flex items-center rounded-lg border border-blue-400 px-3 font-bold text-white }`}>Trending</p>
    </div>
    </Link>
    <Link to="/boards">
    <div className=" space-x-2 mt-2 cursor-pointer flex items-center rounded-lg border border-blue-400 px-3 font-bold text-white">
      <p className="">Go To Boards </p>
      <FaArrowRightLong className="text-white" />
      </div>
      </Link>
      </header>
      <div className='lg:flex h-screen lg:overflow-hidden'>
        <LeftSideBar togglePosting={togglePosting} postPossible={true} />
        <div className=' overflow-y-auto  w-full bg-black scrollbar-hide'>
          {posting && <section className='border-b border-slate-500' id='post'>
            <div className=''>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Add Title' className='w-full bg-black p-2 text-white  h-10 outline-none border-none  ' type="text" />
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='Say Something...' className='w-full bg-black p-2 text-white  h-[7rem] outline-none border-none  ' type="text" />

              {/* HashTags */}
              <div className='flex items-center space-x-2 flex-wrap'>
                {/* Looping Hash Tags */}
                <div className="flex items-center space-x-1 flex-wrap">
                  {hashTags.map((tag,index) => {
                    return (

                      <p key={index} className='text-blue-600 font-light'>
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
                  {!file ? <label className='font-bold text-xs text-white font-mono '>Add File</label> : <span className='font-bold text-white font-mono text-xs '>{file.name.slice(0,10)}</span>}
                </div>
                <div className=' flex space-x-1 items-center'>
                  <p onClick={addPost} className='font-mono cursor-pointer hover:font-bold active:scale-105 text-blue-500 rounded-lg border border-blue-400 px-8'>Post</p>
                  <p onClick={cancelPost} className='font-mono cursor-pointer hover:font-bold active:scale-105 text-blue-500 rounded-lg border border-blue-400 px-6'>Cancel</p>
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
          {postsData ? postsData.map((post, index) => {
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

    
        <a href="#post" className='fixed right-8 bottom-10  md:hidden'>
          <IoAddCircle onClick={togglePosting} className={`h-12 w-12 m-auto text-center cursor-pointer text-[#F79806] active:scale-105 ${scrollDirection === 'down' ? 'disabled:' : ''}`} />
        </a>
      
    </div>
  )
}

export default Feed
