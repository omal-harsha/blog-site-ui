import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const Menu = ({cat}) => {

  const [posts,setPosts] = useState([])

  

    useEffect(() => {
      const fetchData = async ()=>{
        try {
          
          const res =await axios.get(`http://localhost:8800/api/posts?cat=${cat}`)
          setPosts(res.data)
        } catch (err) {
          console.log(err)
        }
      }

    fetchData()
  },[cat])

    // const posts = [
    //     {
    //       id: 1,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //       img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //       id: 2,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //       img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //       id: 3,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit awsdasasd",
    //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //       img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //       id: 4,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //       img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //   ];

  return (
    <div>
        
        <div className='hidden md:flex flex-col ml-24 '>
        <h1 className='text-2xl font-bold text-gray-500 mb-5'>Other post you may like</h1>
            {posts.map(post => (
                <div key={post.id} className='space-y-3'>
                    <img src={post.img} className='w-56'/>
                    <h1 className='text-xl font-bold pb-2 w-56'>{post.title}</h1>
                    <Link>
                    <button className='hover:bg-btnGreen duration-300 ease-in-out px-3 py-1 border-2 font-semibold border-btnGreen bg-white text-btnGreen hover:text-white mb-10'>Read More</button>
                    </Link>
                </div>  
            ))}
        </div>
    </div>
  )
}
