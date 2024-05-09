import React from 'react'
import Navbar from '../Components/Navbar'
import Note from '../Components/Note'
import { categories } from '../Data/Categories'
import { useState } from 'react'
import CategoryTile from '../Components/CategoryTile'

function Home() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <div className=' md:px-[1rem]'>
                <Navbar />
                <Note />
                {/* Category Section */}
                <div className='flex w-full justify-center '>
                    {/* category box */}
                    <div className='md:w-[70%]   rounded-md shadow-lg shadow-black'>
                        <div className='bg-slate-400 w-full h-[3rem] p-4 md:rounded-t-md '>
                            <h2 className='font-bold font-serif'>Categories</h2>
                        </div>
                        {/* Categories
                         */}
                        {
                            categories.map((category,index) => {
                                return <CategoryTile key={index} name={category.category} image={category.image} path={category.path} boards={category.boards} />

                            }
                            )
                        }


                    </div>
                </div>


            </div>
        </div>
    )
}

export default Home