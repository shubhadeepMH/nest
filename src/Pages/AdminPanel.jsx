import React, { useRef, useState, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { Modal, Input, message } from "antd";
import Navbar from '../Components/Navbar';
import { UploadOutlined } from '@ant-design/icons';
import { AiTwotoneFolderAdd } from "react-icons/ai";
import { useParams, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '../firebase.js'
import audio from '../assets/audio.wav'
import formattedDateTime from '../Utils/DateFormatter.js'
import AdminPostCard from '../Components/AdminPostCard.jsx';





function CategoryPage() {

  // Cloudinary configaratiom


  let param = useParams()
  let { state, pathname } = useLocation()//Extracting Data getting from previous page
  const { TextArea } = Input;
  let inputRef = useRef()

  let pathArray = pathname.split('/')
 


  const [isModalOpen, setIsModalOpen] = useState(false)
  let [name, setName] = useState("Unknown")
  let [title, setTitle] = useState()
  let [content, setContent] = useState()
  let [category, setCategory] = useState(state.categoryName)
  let [board, setBoard] = useState(state.boardName)
  let [file, setFile] = useState(null)
  let [uid, setUid] = useState(null)
  let [imageUrl, setImageUrl] = useState(null)


  // Get a reference to the storage service, which is used to create references in your storage bucket

    // console.log(category,board)
  // Create a storage reference from our storage service

  // Get a non-default Storage bucket

  let storage = getStorage(app);

  // Post handling

  let [posts, setPosts] = useState();

  useEffect(() => {
    fetchPosts()

  },)
  let selectFile = (e) => {
    setFile(e.target.files[0])
   
  }

  let fetchPosts = async () => {
    try {

      let postResp = await fetch("https://training-mocha.vercel.app/reported-posts")
      postResp = await postResp.json()
      setPosts(postResp)

    } catch (error) {
      console.log(error);
    }
  }
  // Generating UniqueId
  const generateUniqueId = () => {
    const fullUuid = uuidv4(); // Generate a full UUID
    const shortId = fullUuid.split('-').join('').substring(0, 8); // Remove dashes and take first 8 characters

    return shortId;
  };

  const handleOk = async () => {
    if (name && content) {
      try {
        // Generate unique ID
        const id = generateUniqueId();
        setUid(id);

        // Close modal if needed
        setIsModalOpen(false);

        if (file) {
          // Check if the selected file is an image or video (PNG or JPEG/mp4)
          const isImageFile = file.type.startsWith('image/');
          const isVideoFile = file.type.startsWith('video/mp4');
          if (isImageFile || isVideoFile) {
            message.info('Uploading your post. Please wait...');
            const audioPlay = new Audio(audio);
            audioPlay.volume = 1.0

            // Upload file to Firebase Storage
            const fileName = `${Date.now()}_${file.name}`;
            const storageRef = ref(storage, `images/${fileName}`);
            await uploadBytes(storageRef, file);

            // Get download URL for the uploaded image
            const downloadUrl = await getDownloadURL(storageRef);
            setImageUrl(downloadUrl);

            // Upload data to API including file URL
            console.log(category,board)
            const uploadResp = await fetch('https://training-mocha.vercel.app/add-post', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name,
                title,
                content,
                fileUrl: downloadUrl,
                category,
                board,
                uniqueId: id
              })
            });
            const responseData = await uploadResp.json();

            // Playing Audio

            audioPlay.play()
              .then(() =>{ 
             
                message.success('Post uploaded successfully');
              })
              .catch(error => console.error('Error playing audio:', error));

           
          } else {
            // Selected file is not an image
            message.error('Please select a PNG or JPEG image file.');
          }
        } else {
          // Upload post without image file
         
          const audioPlay = new Audio(audio);
          audioPlay.volume = 1.0
          const uploadResp = await fetch('https://training-mocha.vercel.app/add-post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name,
              title,
              content,
              category,
              board,
              uniqueId: id,
              adminPost: true
            })
          });
          const responseData = await uploadResp.json();
       
          // Playing Audio

          audioPlay.play()
            .then(() =>{ 
           
            message.success('Post uploaded successfully');
            })
            .catch(error => console.error('Error playing audio:', error));

         
        }

        // Reset form state
        setName('Unknown');
        setTitle('');
        setContent('');
        setFile(null);
        setUid('');
        setImageUrl('');
      } catch (error) {
        console.error('Error uploading post:', error);
        message.error('Failed to upload post. Please try again.');
      }
    } else {
      message.error('Please enter Name and Content');
    }
  };


  const handleCancel = () => {
    setName("Unknown")
    setTitle("")
    setContent("")
    setIsModalOpen(false);
    setFile(null)
  };
  // File Uploading Prps

  return (
    <div className='md:px-[1rem]'>
      <Navbar />
      <h2 className='text-md font-mono'>{`${pathArray[1]} > `}<span className='font-mono text-black text-md'>{pathArray[2]}</span></h2>
      <h1 className='text-center font-bold text-[3rem]'>Hi i am @Admin</h1>
      <div className='w-full h-[13rem]'>
        <div className='flex flex-col p-2 m-auto text-center content-center items-center w-[20rem] md:w-[30rem] border-slate-500 border-2 flex-shrink hover:border-black'>
          <h2 className='text-2xl font-mono font-bold mt-4'>Announce Something Or Any Update On{" " + pathArray[1]}</h2> {/* Page title */}
          <div onClick={() => setIsModalOpen(true)} className='h-[3rem]  active:bg-black flex items-center justify-center border-gray-700 cursor-pointer w-[3rem] rounded-full bg-gray-700 active:scale-105 p-1'>
            <AiOutlinePlus className='text-4xl text-white' /> {/* Plus icon */}
          </div>
          {/* Board Creation Modal */}
          <Modal title="Share" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div>
              <label className='font-bold text-gray-700 font-mono ml-1 '>Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Hidden" />
              <label className='font-bold text-gray-700 font-mono ml-1 '>Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title Here" />
              <label className='font-bold text-gray-700 font-mono ml-1'>Your Thoughts</label>
              <TextArea value={content} rows={4} onChange={(e) => setContent(e.target.value)} placeholder="Express Your Thoughts" />
              <div className='p-2 '>


                <input accept=".png,.jpeg,.jpg,.mp4" onChange={selectFile} ref={inputRef} className='hidden' type='file' />
                <AiTwotoneFolderAdd onClick={() => inputRef.current.click()} className='cursor-pointer' size={30} color='blue' />

              </div>
              {!file ? <label className='font-bold text-gray-700 font-mono ml-3 '>Add File</label> : <span className='font-bold'>{file.name}</span>}

            </div>
          </Modal>

          {/* Showing the posts */}
          <p className="font-bold">Post Here</p>


        </div>
      </div>
      <div className=''>
        <h1 className='font-bold font-mono underline-offset-2 underline'>Reported Posts </h1>
        <div className=" ">
          {posts?.length > 0 && <div className='md:max-w-[40rem] w-[100%] border-green-200 border-2 m-auto text-center'>
            {
              posts?.length > 0 && posts.map((post, index) => {
                let date = formattedDateTime(post.date)

                return (<div className='' key={index}>

                  <AdminPostCard postId={post._id} name={post.name} title={post.title} content={post.content} likes={post.likes} comments={post.comments} image={post.fileUrl} uid={post.uniqueId} fun={fetchPosts} date={date} />
                </div>)
              })
            }
          </div>}
        </div>
      </div>

    </div>
  )
}

export default CategoryPage
