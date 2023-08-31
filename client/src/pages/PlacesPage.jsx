import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";

export default function PlacesPage()  {
  const {action} = useParams()
  const [title,setTitle] = useState('')
  const [address,setAddress] = useState('')
  const [addPhotos,setAddPhotos] = useState([])
  const [linkPhotos,setLinkPhotos] = useState('')
  const [description,setDescription] = useState('')
  const [perks,setPerks] = useState([])
  const [extraInfo,setExtraInfo] = useState('')
  const [checkIn,setCheckIn] = useState('')
  const [checkOut,setCheckOut] = useState('')
  const [maxGuests,setMaxGuests] = useState(1)

  function inputHeader(title){
    return (
      <h2 className="text-2xl mt-4">{title}</h2>
    )
  }

  function inputDescription(description){
    return (
      <p className="text-gray-500 text-sm">{description}</p>
    )
  }

  function preInput(title, description){
      return (
        <>
          {inputHeader(title)}
          {inputDescription(description)}
        </>
      )
  }

  
  async function uploadByLink(ev){
    console.log("in upload ft")
    ev.preventDefault()
    try {
      const {data:filename} = await axios.post("/api/user/upload-by-link", {link:linkPhotos});
      alert(`Welcome ${filename},`);
      console.log("Link " + filename)
      setAddPhotos(prev => {
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
    
    setAddPhotos(prev => {
      return [...prev, ...filenames]
    })
  
  }
  
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
        <Link className="bg-primary text-white px-4 py-4 rounded-full inline-flex gap-1" to={"/account/places/new"}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg> 
          Add new place
        </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form >
            {preInput('Title','Title for your place, should be short and catchy as in advertisement')}
            <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My Hotel "/>

            {preInput('Address','Address to your place')}
            <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="your address"/>

            {preInput('Photos','more is better')}
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
              
              <label className=" cursor-pointer items-center justify-center flex gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
              <input type="file" multiple className="hidden" onChange={uploadPhotos}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
                Upload
              </label>
            </div>

            {preInput('Description','description for your place')}
            <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>

            {preInput('Perks','select all the perks')}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2">
              <Perks selected={perks} onChange={setPerks}/>
            </div>

            {preInput('Extra Info','House Rules and other stuffs')}
            <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

            {preInput('Check In & Out','add check in and out times.')}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check In</h3>
                <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14:00"/>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check Out</h3>   
                <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="11:00"/>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max Guests</h3>  
                <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} placeholder="3 Persons"/>
              </div>
            </div>

            <button className="primary my-4">Save</button>

          </form>
          

        </div>

      )}
    </div>
  )
}
