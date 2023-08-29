import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";

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
            <input type="text" placeholder="title, for example: My Hotel "/>

            <h2 className="text-2xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">Address to your place</p>
            <input type="text" placeholder="your address"/>

            <h2 className="text-2xl mt-4">Photos</h2>
            <p className="text-gray-500 text-sm">more is better</p>

            <div className="flex gap-2">
              <input type="text" placeholder="Add using links...jpg" />
              <button className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
            </div>

            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="justify-center flex gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
                Upload
              </button>
            </div>

            <h2 className="text-2xl mt-4">Description</h2>
            <p className="text-gray-500 text-sm">description for your place</p>
            <textarea/>

            <h2 className="text-2xl mt-4">Perks</h2>
            <p className="text-gray-500 text-sm">select all the perks</p>

            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2">
            <Perks selected={perks} onChange={setPerks}/>
            </div>

            <h2 className="text-2xl mt-4">Extra Info</h2>
            <p className="text-gray-500 text-sm">House Rules and other stuffs</p>
            <textarea/>

            <h2 className="text-2xl mt-4">Check In & Out </h2>
            <p className="text-gray-500 text-sm">add check in and out times.</p>

            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check In</h3>
                <input type="text" placeholder="14:00"/>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check Out</h3>   
                <input type="text" placeholder="14:00"/>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max Guests</h3>  
                <input type="text" placeholder="3 Persons"/>
              </div>
            </div>

            <button className="primary my-4">Save</button>

          </form>
        </div>

      )}
    </div>
  )
}
