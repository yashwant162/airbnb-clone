import { useEffect, useState } from "react"
import Perks from "./Perks";
import PhotoUploader from "../PhotoUploader";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
// import {  Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const {id} = useParams()
  const [title,setTitle] = useState('')
  const [address,setAddress] = useState('')
  const [addPhotos,setAddPhotos] = useState([])
  const [redirect, setRedirect] = useState(false)
  const [description,setDescription] = useState('')
  const [perks,setPerks] = useState([])
  const [extraInfo,setExtraInfo] = useState('')
  const [checkIn,setCheckIn] = useState('')
  const [checkOut,setCheckOut] = useState('')
  const [maxGuests,setMaxGuests] = useState(1)
  const [price,setPrice] = useState()

  useEffect(() => {
    
    if(!id){
      return 
    }
    
    async function fetchPlace(){
      
      const {"data":{placeData}} = await axios.get('api/data/get-user-place-by-id/'+id)
      console.log(placeData)
      setTitle(placeData.title)
      setDescription(placeData.description)
      setAddress(placeData.address)
      setCheckIn(placeData.checkIn)
      setCheckOut(placeData.checkOut)
      setAddPhotos(placeData.photos)
      setExtraInfo(placeData.extrainfo)
      setPerks(placeData.perks)
      setMaxGuests(placeData.maxGuests)
      setPrice(placeData.price)
    }

    fetchPlace()
  },[id])

  
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

  async function savePlace(ev){
    ev.preventDefault()

    let placeInfo = {
      title, address, addPhotos,
      description,extraInfo,perks,
      checkIn,checkOut,maxGuests,price
    }
    console.log("id in save place is "+id)

    if(id){
      const {data} = await axios.put("api/data/add-place",{id, ...placeInfo})
      console.log(data)
    } else {
      
      const {data} = await axios.post("api/data/add-place",placeInfo)
      console.log(data)
      
    }
    setRedirect(true)
  }

  if(redirect){
    return <Navigate to={'/account/places'}/>
  }

  return (
     <div>
          <AccountNav/>
          <form onSubmit={savePlace} className="max-w-4xl w-full mx-auto">
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
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
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
              <div>
                <h3 className="mt-2 -mb-1">Price Per Night</h3>  
                <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} placeholder="Price per Night"/>
              </div>
            </div>

            <button className="primary my-4">Save</button>

          </form>
          

        </div>
    
  )
}