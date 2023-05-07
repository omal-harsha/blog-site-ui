import React, { useContext, useEffect, useState } from 'react'
import { UilEditAlt, UilTrashAlt,UilUser } from '@iconscout/react-unicons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu } from '../components/Menu'
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from './../context/authContext.js';

export const Single = () => {


  const [post,setPost] = useState({})

  const location = useLocation()
  const navigate = useNavigate()

  const postId  = location.pathname.split("/")[2];
  
  const sername = "nuwna"

  const {currentUser} = useContext(AuthContext) ;


    useEffect(() => {
      const fetchData = async ()=>{
        try {
          
          const res = await axios.get(`http://localhost:8800/api/posts/${postId}`)          
          setPost(res.data);
        } catch (err) {
          console.log(err)
        }
      }

    fetchData()
  },[postId])
  
  const handleDelete = async() => {

    if(window.confirm("Are you sure you want to delete that post"))
    {
      try {
            
        const res =await axios.delete(`http://localhost:8800/api/posts/${postId}`, {withCredentials: true})          
        navigate("/")
      } catch (err) {
        console.log(err)
      }
  }

  }

  return (
    <div>
      <div className='flex md:px-44 px-5 my-10'>
          <div className='md:w-3/5'>
            <div className='bg-gray-100'> 
              <img src={post?.img} alt= "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png"
                className='h-80  mx-auto my-3'/>
                </div>
                <div className='flex space-x-2 py-3 items-center bg-white'>
                  {post.userImg && <div >
                      <img src={post.userImg} alt="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png"
      className='w-12 h-12 rounded-full'/>
                  </div>}
                  <div className=''>
                    <h1 className='font-bold '>{post.username}</h1>
                    <p>Posted {moment(post.date).fromNow()}</p>
                  </div>
                  
                    { currentUser?.username === post.username && (
                    <div className='flex space-x-2 items-center'>
                      <Link to={`/write?edit=${postId}`} state={post}>
                      <UilEditAlt className="bg-btnGreen text-white rounded-full px-1 py-1 cursor-pointer" />
                      </Link>
                      <div onClick={handleDelete}>
                      <UilTrashAlt className="bg-red-700 text-white rounded-full px-1 py-1  cursor-pointer"/>
                      </div>
                    </div>
                    )}
                     
                </div>
                <h1 className='bg-white text-3xl font-bold text-gray-700'> {post.title}</h1>
                <p className='bg-white pt-3 text-gray-700 text-justify'>
                  {[post.desc]}
                </p>
          </div>
              <div className='w-2/5 '>
                <Menu cat={post.cat}/>
              </div>
      </div>
      
    </div>
  )
}
