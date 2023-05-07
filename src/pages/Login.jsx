import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  axios  from 'axios';
import { AuthContext } from '../context/authContext';

export const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  })

  const [err,setError] = useState(null)

  const navigate = useNavigate()

  const {login} = useContext(AuthContext)


  const handleChange = e => {
    setInputs((prev) => ({...prev,[e.target.name]: e.target.value}))
  }
  
  const handleClick = async e => {
    e.preventDefault()

    try {
      await login(inputs)
      navigate("/")
      
    } catch (err) {
      setError(err.response.data)
    }
  }


  
  return (
    <div className='bg-bgGreen '> 
      <div className='flex flex-col items-center h-screen justify-center space-y-5'>
         <h1 className='font-bold text-btnGreen text-2xl'>Login</h1>
         <form className='flex flex-col w-72 md:w-96 space-y-7 px-8 md:px-14 py-12 md:py-20 bg-white '>
            <input type='text' placeholder='username' className='border-b border-gray-400 focus:outline-none px-2 py-1' name='username' onChange={handleChange}/>
            <input type='text' placeholder='password' className='border-b border-gray-400 focus:outline-none px-2 py-1' name='password' onChange={handleChange}/>
            <button className='bg-btnGreen text-white py-2'onClick={handleClick}> Login</button>
            <div className='flex flex-col  text-center space-y-2'>
            {err && <p className='text-red-600 text-sm'>{err}</p>}
            <span > Don't you have an account <Link to="/register" className='text-blue-800 underline'>Register</Link> </span>
            </div>
         </form>
      </div>

    </div>
  )
}

