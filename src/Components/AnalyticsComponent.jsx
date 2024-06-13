import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

function AnalyticsComponent() {
    const [userCount, setUserCount] = useState(0);
    const [posts, setPosts] = useState([]);

    const fetchNumberOfPosts = async () => {
        try {
            let resp = await fetch("https://training-mocha.vercel.app/all-posts");
            resp = await resp.json();
            // console.log("resp:",resp.posts)
            setPosts(resp.posts);
            
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchNumberOfPosts();
        // Getting current users from
        const pusher = new Pusher('85b16538859776a18088', {
            cluster: 'us3',
            encrypted: true // Enable encryption if your Pusher app requires it
          });
      
          // Subscribe to the 'user-count' channel
          const channel = pusher.subscribe('user-count');
      
          // Bind to the 'update' event to receive updates on user count
          channel.bind('update', data => {
            setUserCount(data.userCount);
          });
          console.log(userCount)
      
          // Clean up the subscription when the component unmounts
          return () => {
            pusher.unsubscribe('user-count');
          };
       
    }); // Adding an empty dependency array to ensure it runs only once

    return (
        <div className="flex text-white font-bold">
            
            <h1>Total Posts : {posts.length}</h1>
        </div>
    );
}

export default AnalyticsComponent;
