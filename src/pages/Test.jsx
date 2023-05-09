import React, { useState } from "react";
import { storage } from '../firebase';
import {ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const Test = () => {
  const [file, setFile] = useState(null);

  const handleImageUpload = (event) => {
    
    const imageRef = ref(storage, `images/${file.name}`)
    uploadBytes(imageRef, file);
    const url =  getDownloadURL(imageRef);
    console.log(url)
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <input type="file" onChange={e=>setFile(e.target.files[0])} />
      <button onClick={handleImageUpload}> Submit</button>
    </div>
  );
};


