/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage()  {
  const [places,setPlaces] = useState([])

  useEffect(() => {

    async function fetchPlaces(){
      const {"data":{placesData}}=  await axios.get('api/data/get-user-places')
      console.log(placesData)
      setPlaces(placesData)
    }

    fetchPlaces()
  },[])

  return (
    <div className="max-w-6xl w-full mx-auto mb-3">
      <AccountNav/>

        <div className="text-center">
          <Link  to={"/account/places/new"} className="bg-primary text-white px-4 py-4 rounded-full inline-flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg> 
              Add new place
          </Link>
        </div>

        <div className="mt-10">
          {places.length > 0 && places.map(place => (
            <Link to={'/account/places/'+place._id} key={place._id} className="cursor-pointer bg-gray-200 p-4 rounded-2xl flex gap-4 mt-4">
              <div className="bg-gray-300 h-32 w-32 grow shrink-0 flex">
                {place.photos.length > 0 && (
                  <img className="object-cover" src={"http://localhost:5000/uploads/"+place.photos[0]} alt="" />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>

              </div>
            </Link>
          ))}
        </div>
    </div>
  )
}
