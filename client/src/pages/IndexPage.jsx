/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function IndexPage() {
  const [places,setPlaces] = useState([])

  useEffect(() => {

    async function fetchAllPlaces(){
      const {"data":{placesData}}=  await axios.get('api/data/get-all-places')
      console.log(placesData)
      setPlaces(placesData)
    }

    fetchAllPlaces()
  },[])

  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id} key={place._id} className="">
          <div className="bg-gray-500 rounded-2xl felx">
              {place.photos?.[0] && (
                <img className="rounded-2xl object-cover aspect-square" src={"http://localhost:5000/uploads/"+place.photos[0]}/>
              )}
          </div>
          <h3 className="font-bold">{place.address}</h3>
          <h2 className="text-sm text-gray-500">{place.title}</h2>
          <div className="mt-2">
            <span className="font-bold">Rs.{place.price}</span> per night
          </div>
        </Link>
      ))}
      
    </div>
  );
}
