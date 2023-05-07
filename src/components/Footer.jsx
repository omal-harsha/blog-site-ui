import React from 'react'
import logo from '../images/logo.png'

export const Footer = () => {
  return (
    <div className='md:px-36 lg:mx-10'>
      <div className='flex justify-between px-10 py-2  items-center bg-bgGreen'>
        <img src={logo} className='w-32 '/>
        <h1>Developed by omal ©</h1>
      </div>
    </div>
  )
}
