import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';


export const Home = () => {


  const [posts,setPosts] = useState([])

  const cat = useLocation().search

    useEffect(() => {
      const fetchData = async ()=>{
        try {
          
          const res =await axios.get(`http://localhost:8800/api/posts${cat}`)
          setPosts(res.data)
        } catch (err) {
          console.log(err)
        }
      }

    fetchData()
  },[cat])

  
 
  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];

  return (
    <div  className='[&>*:nth-child(even)]:flex-row-reverse md:pr-10'>
      
      {posts.map((post) => (
        <div key={post.id} className='flex md:space-x-10 space-x-2 my-10 px-5 md:px-36 ]'>  
          <div className='md:my-3 md:w-1/4 md:px-4 md:mx-5 '>
            <img src={post.img} className='w-full md:h-80 md:shadow-xl md:hover:shadow-2xl md:shadow-gray-500 hover:scale-105 md:hover:shadow-btnGreen duration-300 ease-in-out'/>
          </div>
          <div className='md:w-3/4 space-y-5'>
            <Link to={`/post/${post.id}`}>
              <h1 className='md:text-4xl text-lg font-bold leading-5'>{post.title}</h1>
            </Link>
            <p className='text-xs md:text-base'>{post.desc}</p>
            <button className='hover:bg-btnGreen duration-300 ease-in-out px-4 py-2 border-2 font-semibold border-btnGreen bg-white text-btnGreen hover:text-white'>Read More</button>
          </div>        
        </div>
      ))}
    </div>
  )
}
