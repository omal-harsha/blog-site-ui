import React, { useContext } from 'react'
import logo from '../images/logo.png'

import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'


export const Navbar = () => {

  const {currentUser, logout} = useContext(AuthContext)

  

  return (
    <div className='md:px-36 px-5 lg:mx-10 mt-6'>
      <div className='flex justify-between'>
        <div>
          <Link to="/">
          <img src={logo} className='md:w-32 w-20'/>
          </Link>
        </div>
        <div className='flex space-x-5 items-center'>
          <div className='md:flex space-x-5 hidden '>
            <Link to="/?cat=art">
              <h1>ART</h1>
            </Link>
            <Link to="/?cat=science">
              <h1>SCIENCE</h1>
            </Link>
            <Link to="/?cat=technology">
              <h1>TECHNOLOGY</h1>
            </Link>
            <Link to="/?cat=cinema">
              <h1>CINEMA</h1>
            </Link>
            <Link to="/?cat=design">
              <h1>DESING</h1>
            </Link>
            <Link to="/?cat=food">
              <h1>FOOD</h1>
            </Link>
          </div>
          <h1>{currentUser?.username}</h1>
          <Link>
            {currentUser ? <a onClick={logout}>Logout</a> : <Link to="/login"> Login </Link>}
          </Link>
          <Link to="/write" className='bg-bgGreen duration-300 ease-in-out rounded-full py-4 border-white border-2 hover:border-teal-600 hover:text-teal-600 hover:bg-white px-2'>
            <h1>Write</h1>
          </Link>
         
        </div>
      </div>
    </div>
  )
}
