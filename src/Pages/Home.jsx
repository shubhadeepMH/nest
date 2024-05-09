import React from 'react';
import Navbar from '../Components/Navbar';
import Note from '../Components/Note';
import { categories } from '../Data/Categories';
import CategoryTile from '../Components/CategoryTile';

function Home() {
  return (
    <div className='md:px-[1rem]'>
      <Navbar />
      <Note />

      {/* Category Section */}
      <div className='flex justify-center'>
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
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
