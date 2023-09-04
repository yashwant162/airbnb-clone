/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage()  {
  const [places,setPlaces] = useState([])

  useEffect(() => {

    async function fetchPlaces(){
      const {"data":{placesData}}=  await axios.get('api/data/get-places')
      console.log(placesData)
      setPlaces(placesData)
    }

    fetchPlaces()
  },[])

  return (
    <div>
      <AccountNav/>

        <div className="text-center">
          <Link  to={"/account/places/new"} className="bg-primary text-white px-4 py-4 rounded-full inline-flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg> 
              Add new place
          </Link>
        </div>

        <div className="text-left mt-10">
          {places.length > 0 && places.map(place => (
            <div key={place._id}>
              {place.title}
            </div>
          ))}
        </div>
    </div>
  )
}
