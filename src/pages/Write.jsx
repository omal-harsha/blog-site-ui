import React from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { storage } from '../firebase';
import {ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {v4} from 'uuid'

export const Write = () => {

  const state = useLocation().state
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title ||'');
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [cat, setCat] = useState(state?.cat || '');



  const upload =  async ()=> {
    try {
      const formData = new FormData()
      formData.append("file",file)
      const res = await axios.post("http://localhost:8800/upload",formData)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const uploadImage = async () => {
    if(file == null) return;
     const imageRef =  ref(storage, `images/${file.name + v4()}`)
    
     try {
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      alert("Image uploaded");
      // Store the URL in a variable
      setImgUrl(url)
      const imageUrl = url;
      console.log(imageUrl);
    } catch (error) {
      console.log(error);
    }
    
    
    
     /* uploadBytes(imageRef, file).then( ()=> {
       getDownloadURL(imageRef).then((url) => {
        alert("Image uploaded");
        // Store the URL in a variable
        setImgUrl(url)
        const imageUrl = url;
        console.log(imageUrl);
      }).catch((error) => {
        console.log(error);
      });
    }) */
  }

  const handleClick = async e => {
    e.preventDefault()
  
    try {
      const imgUrl = await uploadImage()
  
      if (state) {
        await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : "",
        }, { withCredentials: true })
      } else {
        await axios.post(`http://localhost:8800/api/posts/`, {
          title,
          desc: value,
          cat,
          img: imgUrl ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        }, { withCredentials: true })
      }
  
      console.log("done" + imgUrl)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='flex md:px-44 px-5 mt-10 mb-10 md:flex-row flex-col space-y-5'>
        <div className='md:w-5/6  '>
          <input type='text' className='border md:w-full mb-5 py-2 px-2 w-96 focus:outline-0  ' placeholder='Title...'
            onChange={e=> setTitle(e.target.value)} value={title}
          ></input>
          
          <ReactQuill theme="snow" value={value} onChange={setValue} className='h-72 mr-10 md:mr-0 mb-10'/>
        </div>
        <div className='md:w-2/6 w-1/2 flex flex-col px-5   space-y-3'>
            {/* Publish section */}
            <div className='border-2 border-bgGreen px-3 py-1 space-y-2 h-1/2'>
              <h1 className='text-2xl font-bold'>Publish</h1>
              <div className='flex space-x-1 '>
                <label className='font-bold'>Status:</label> <p>Draft</p>
              </div>
              <div className='flex space-x-1'>
                <label className='font-bold'>Visibility:</label> <p>public</p>
              </div>
              <input type='file' className='bg-white text-sm' onChange={e=>setFile(e.target.files[0])}></input>
              <div className='flex justify-between'>
                <button className='hover:bg-btnGreen duration-300 ease-in-out px-1.5 py-0.5 border  border-btnGreen bg-white text-btnGreen hover:text-white'>Save as a Draft</button>
                <button className='bg-btnGreen hover:bg-white border hover:border-btnGreen hover:text-btnGreen  duration-200 ease-in-out px-1.5 py-0.5 border-1 font-semibold  text-white' onClick={handleClick}>Publish</button>
              </div>
            </div>

            {/* Category section */}
            <div className='border-2 border-bgGreen px-3 py-2 space-y-2 h-1/2'> 
                <h1>Category</h1>
                <div className='text-sm space-y-1 text-btnGreen'>
                <div className='flex space-x-1'>
                  <input type='radio' checked={cat === "art"} value="art" name='cat' onChange={e=>setCat(e.target.value)}/>
                  <label>Art</label>
                </div>
                <div className='flex space-x-1'>
                  <input type='radio' checked={cat === "science"} value="science" name='cat' onChange={e=>setCat(e.target.value)}/>
                  <label>Science</label>
                </div>
                <div className='flex space-x-1'>
                  <input type='radio' checked={cat === "technology"} value="technology" name='cat' onChange={e=>setCat(e.target.value)}/>
                  <label>Technology</label>
                </div>
                <div className='flex space-x-1'>
                  <input type='radio' checked={cat === "cinema"} value="cinema" name='cat' onChange={e=>setCat(e.target.value)}/>
                  <label>Cinema</label>
                </div>
                <div className='flex space-x-1'>
                  <input type='radio' checked={cat === "design"} value="design" name='cat' onChange={e=>setCat(e.target.value)}/>
                  <label>Design</label>
                </div>
                <div className='flex space-x-1'>
                  <input type='radio' checked={cat === "food"} value="food" name='cat' onChange={e=>setCat(e.target.value)}/>
                  <label>Food</label>
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
