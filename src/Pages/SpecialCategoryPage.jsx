import React, { useRef, useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Modal, Input, message } from "antd";
import Navbar from '../Components/Navbar';
import { AiTwotoneFolderAdd } from "react-icons/ai";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '../firebase.js';
import SpecialPostCard from '../Components/SpecialPostCard.jsx';
import audio from '../assets/audio.wav';
import formattedDateTime from '../Utils/DateFormatter.js';

function CategoryPage() {
  let param = useParams();
  let { state, pathname } = useLocation();
  const { TextArea } = Input;
  let inputRef = useRef();
  let navigate = useNavigate();
  
  let dataToSend = { categoryName: state.categoryName, boardName: state.boardName, tagLine: state.tagLine };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(true);
  let [name, setName] = useState("Unknown");
  let [title, setTitle] = useState();
  let [content, setContent] = useState();
  let [category, setCategory] = useState(state.categoryName);
  let [board, setBoard] = useState(state.boardName);
  let [tagLine, setTagLine] = useState(state.tagLine);
  let [file, setFile] = useState(null);
  let [uid, setUid] = useState(null);
  let [imageUrl, setImageUrl] = useState(null);
  let storage = getStorage(app);
  let [posts, setPosts] = useState();

  useEffect(() => {
    fetchPosts();
  }, []);

  let selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  let fetchPosts = async () => {
    try {
      let postResp = await fetch("https://training-mocha.vercel.app/posts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ board })
      });
      postResp = await postResp.json();
      setPosts(postResp);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const generateUniqueId = () => {
    const fullUuid = uuidv4();
    const shortId = fullUuid.split('-').join('').substring(0, 8);
    return shortId;
  };

  const handleOk = async () => {
    if (name && content) {
      try {
        const id = generateUniqueId();
        setUid(id);
        setIsModalOpen(false);

        if (file) {
          message.info('Uploading your post. Please wait...');

          const fileName = `${Date.now()}_${file.name}`;
          const storageRef = ref(storage, `files/${fileName}`);
          await uploadBytes(storageRef, file);

          const downloadUrl = await getDownloadURL(storageRef);
          setImageUrl(downloadUrl);

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
          const audioPlay = new Audio(audio);
          audioPlay.volume = 1.0;
          audioPlay.play()
            .then(() => {
              message.success('Post uploaded successfully');
            })
            .catch(error => console.error('Error playing audio:', error));
        } else {
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
              uniqueId: id
            })
          });
          const responseData = await uploadResp.json();
          const audioPlay = new Audio(audio);
          audioPlay.volume = 1.0;
          audioPlay.play()
            .then(() => {
              message.success('Post uploaded successfully');
            })
            .catch(error => console.error('Error playing audio:', error));
        }

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
    setName("Unknown");
    setTitle("");
    setContent("");
    setIsModalOpen(false);
    setFile(null);
  };

  const handleWarningModalOk = () => {
    setIsWarningModalOpen(false);
  };

  const handleWarningModalCancel = () => {
    navigate('/');
  };

  return (
    <div className={`md:px-[1rem] ${isWarningModalOpen ? 'pointer-events-none' : ''}`}>
      <Navbar />
      <h2 className='text-md font-mono'>{`${state.categoryName} > `}<span className='font-mono text-black text-md'>{state.boardName}</span></h2>
      <div onClick={() => navigate(`${pathname}/admin`, { state: dataToSend })} className='h-[2rem] w-[2rem] rounded-full absolute top-1 right-1'></div>
      <div className='w-full h-[13rem]'>
        <div className='flex flex-col p-2 m-auto text-center content-center items-center w-[20rem] md:w-[30rem] border-slate-500 border-2 flex-shrink hover:border-black'>
          <h2 className='text-2xl font-mono font-bold mt-4 text-red-500'>{tagLine}</h2>
          <div onClick={() => setIsModalOpen(true)} className='h-[3rem] active:bg-black flex items-center justify-center border-gray-700 cursor-pointer w-[3rem] rounded-full bg-gray-700 active:scale-105 p-1'>
            <AiOutlinePlus className='text-4xl text-white' />
          </div>
          <Modal title="Share" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div>
              <label className='font-bold text-gray-700 font-mono ml-1 '>Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Hidden" />
              <label className='font-bold text-gray-700 font-mono ml-1 '>Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title Here" />
              <label className='font-bold text-gray-700 font-mono ml-1'>Your Thoughts</label>
              <TextArea value={content} rows={4} onChange={(e) => setContent(e.target.value)} placeholder="Express Your Thoughts" />
              <div className='p-2 '>
                <input onChange={selectFile} ref={inputRef} className='hidden' type='file' />
                <AiTwotoneFolderAdd onClick={() => inputRef.current.click()} className='cursor-pointer' size={30} color='blue' />
              </div>
              {!file ? <label className='font-bold text-gray-700 font-mono ml-3 '>Add File</label> : <span className='font-bold'>{file.name}</span>}
            </div>
          </Modal>
          <p className="font-bold">Post Here</p>
        </div>
      </div>
      <div className=''>
        <h1 className='font-bold font-mono underline-offset-2 underline'>Explore </h1>
        <div className=" ">
          {posts?.length > 0 && <div className='md:max-w-[40rem] w-[100%] border-green-200 border-2 m-auto text-center'>
            {posts?.length > 0 && posts.map((post, index) => {
              let date = formattedDateTime(post.date);
              return (
                <div key={index} className=''>
                  <SpecialPostCard name={post.name} adminPost={post.adminPost} title={post.title} content={post.content} likes={post.likes} comments={post.comments} image={post.fileUrl} uid={post.uniqueId} fun={fetchPosts} date={date} />
                </div>
              );
            })}
          </div>}
        </div>
      </div>
      <Modal title="Warning" open={isWarningModalOpen} onOk={handleWarningModalOk} onCancel={handleWarningModalCancel} closable={false} footer={null}>
        <p>All the posts uploaded here are not responsible by 3rdoor. Please consider going inside at your own risk.</p>
        <div className='flex justify-end gap-2'>
          <button onClick={handleWarningModalOk} className='bg-blue-500 text-white py-2 px-4 rounded'>YES, I AGREE AND I ACCEPT ALL RISK ON MY OWN</button>
          <button onClick={handleWarningModalCancel} className='bg-red-500 text-white py-2 px-4 rounded'>NO, TAKE ME BACK TO HOMEPAGE</button>
        </div>
      </Modal>
    </div>
  );
}

export default CategoryPage;
