/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import PhotoUploader from "../PhotoUploader";
import axios from "axios";

export default function PlacesPage()  {
  const {action} = useParams()
  const [title,setTitle] = useState('')
  const [address,setAddress] = useState('')
  const [addPhotos,setAddPhotos] = useState([])
  
  const [description,setDescription] = useState('')
  const [perks,setPerks] = useState([])
  const [extraInfo,setExtraInfo] = useState('')
  const [checkIn,setCheckIn] = useState('')
  const [checkOut,setCheckOut] = useState('')
  const [maxGuests,setMaxGuests] = useState(1)
  const [redirect,setRedirect] = useState('')

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

  async function addNewPlace(ev){
    ev.preventDefault()
    
    const placeInfo = {
      title, address, addPhotos,
      description,extraInfo,perks,
      checkIn,checkOut,maxGuests
    }

    const {data} = await axios.post("api/user/add-place",placeInfo)
    console.log(data)
    setRedirect("/account/places")
    
  }

  if(redirect){

    return <Navigate to = {redirect}/>
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
          <form onSubmit={addNewPlace}>
            {preInput('Title','Title for your place, should be short and catchy as in advertisement')}
            <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My Hotel "/>

            {preInput('Address','Address to your place')}
            <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="your address"/>

            {preInput('Photos','more is better')}
            <PhotoUploader addPhotos = {addPhotos} onChange={setAddPhotos}/>

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
