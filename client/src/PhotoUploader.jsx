/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

export default function PhotoUploader({addPhotos, onChange}){
  const [linkPhotos,setLinkPhotos] = useState('')
  async function uploadByLink(ev){
    console.log("in upload ft")
    ev.preventDefault()
    try {
      const {data:filename} = await axios.post("/api/user/upload-by-link", {link:linkPhotos});
      // alert(`Welcome ${filename},`);
      console.log("Link " + filename)
      onChange(prev => {
        return [...prev, filename]
      })
      
      setLinkPhotos('')
      
    } catch (err) {
      alert("Something went wrong \n" + err.response.data.message);
    }
  }
  
  async function uploadPhotos(ev){
  
    const files = ev.target.files
    const data = new FormData()
    for(let i = 0; i < files.length; i++){
      data.append('photos',files[i])
      console.log(files[i])
    }
    console.log("what is the data :" + data)
  
    const {data:filenames} = await axios.post("/api/user/upload",data,{headers:{'Content-type':'multipart/form-data'}})
    
    onChange(prev => {
      return [...prev, ...filenames]
    })
  
  }

  return (
    <>
        <div className="flex gap-2">
          <input type="text" value={linkPhotos} onChange={ev => setLinkPhotos(ev.target.value)} placeholder="Add using links...jpg" />
          <button  onClick={uploadByLink}  className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
        </div>
        
        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {addPhotos.length > 0 && addPhotos.map(link => (
            <div className="h-32 flex" key = {link}>
              <img className="rounded-2xl w-full object-cover" src={"http://localhost:5000/uploads/"+link} alt="" />
            </div>
          ))} 
          
          <label className="h-32 cursor-pointer items-center justify-center flex gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
          <input type="file" multiple className="hidden" onChange={uploadPhotos}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
            Upload
          </label>
        </div>
    </>
  )
}