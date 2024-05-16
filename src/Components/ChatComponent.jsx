import React, { useState, useEffect, useRef } from 'react';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';
import app from '../firebase.js'; // Adjust the import according to your setup
import { message as antdMessage } from 'antd';

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [userName, setUserName] = useState('');
  const db = getDatabase(app);
  const messagesEndRef = useRef(null);
  const hasSentMessage = useRef(false); // Track if the user has sent a message

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userName) {
      const messageListRef = ref(db, 'messages');
      const newMessageRef = push(messageListRef);
      set(newMessageRef, {
        message: messageInput,
        date: Date.now(),
        user: userName
      });
      hasSentMessage.current = true; // Set to true when a message is sent
      setMessageInput('');
    } else {
      antdMessage.info("Please set your temporary user Name");
    }
  };

  useEffect(() => {
    let isMounted = true;
    const dbRef = ref(db, 'messages');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (isMounted) {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.values(data);
          setMessages(formattedData);
        } else {
          setMessages([]);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [db]);

  useEffect(() => {
    if (hasSentMessage.current) {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      hasSentMessage.current = false; // Reset the flag after scrolling
    }
  }, [messages]);

  const handleChange = (event) => {
    setMessageInput(event.target.value);
  };

  const setUserNameFun = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div className="bg-gray-600 shadow-md shadow-white h-[40rem] rounded-t-md rounded-b-md relative mt-[3rem]">
      <header className="bg-gray-600 text-white text-center rounded-t-md py-4">
        <h2 className='font-mono font-bold text-lg text-white'>3rdoor.Activity</h2>
        <h3>Don't trust Anyone here</h3>
        <input
          placeholder='Set Your Temporary User Name'
          type="text"
          value={userName}
          onChange={setUserNameFun}
          className="w-2/4 h-12 px-4 text-black border-none"
        />
      </header>
      
      <div className="w-4/5 mx-auto mt-4 h-[25rem] overflow-y-scroll scrollbar-hide">
        <ul id="messages" className="pb-20">
          {messages.map((message, index) => (
            <li key={index} className="list-none mb-4 bg-white rounded-lg shadow-md p-4">
              <strong>{message.user}:</strong> {message.message}
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
      </div>

      <form id="message-form" onSubmit={handleSubmit} className="flex absolute bottom-0 rounded-b-md right-[.1rem] w-[100%] bg-black p-3">
        <input
          id="message-input"
          placeholder='Write Something'
          type="text"
          value={messageInput}
          onChange={handleChange}
          className="w-3/4 h-12 px-4 rounded-full border-none"
        />
        <button
          id="message-btn"
          type="submit"
          className={`w-1/4 h-12 ${messageInput ? "visible" : "invisible"} bg-white hover:bg-green-500 text-black font-bold rounded-full ml-4 cursor-pointer active:bg-green-400`}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatComponent;
