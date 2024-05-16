import React from 'react';
import Navbar from '../Components/Navbar';
import Note from '../Components/Note';
import { categories } from '../Data/Categories';
import CategoryTile from '../Components/CategoryTile';
import Footer from '../Components/Footer';
import ChatComponent from '../Components/ChatComponent';

function Home() {
    return (
        <div className=''>
            <div className='md:px-[1rem] h-[127rem]  '>
                <Navbar />
                <Note />

                {/* Category Section */}
                <div className='flex justify-center '>
                    {/* category box */}
                    <div className={`w-full md:w-[60rem]  rounded-md shadow-lg shadow-black }`}>
                        <div className='bg-slate-400 w-full h-[3rem] p-4 md:rounded-t-md'>
                            <h2 className='font-bold font-serif'>Categories</h2>
                        </div>

                        {/* Categories */}
                        <div className='flex flex-wrap justify-center p-4'>
                            {categories.map((category, index) => (
                                <CategoryTile
                                    key={index}
                                    name={category.category}
                                    image={category.image}
                                    path={category.path}
                                    boards={category.boards}
                                    tagLine={category.tagLine}
                                />
                            ))}
                        </div>
                    </div>
                   
                    

                </div>
                 {/* Live Chat Section */}
                 <div className=' w-[70%] m-auto text-center'>
                    <ChatComponent/>
                    </div>


            </div>
            {/* Footer Component */}
            <div className="h-[3rem] mt-[2rem] w-full  ">
                <Footer />
            </div>
        </div>
    );
}

export default Home;
