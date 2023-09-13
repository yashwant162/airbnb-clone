/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget"
import AddressLink from "../AddressLink"
import PlaceGallery from "../PlaceGallery"

export default function ViewPlacePage(){
  const {id} = useParams()
  const [place, setPlace] = useState(null)
  

  useEffect(() => {
    
    if(!id){
      return 
    }

    async function fetchPlace(){
      const {"data":{placeData}} = await axios.get(`api/data/place/${id}`)

      setPlace(placeData)
      console.log(placeData)
    }

    fetchPlace()

  },[id])

  if(!place){
    return ''
  }

  return(
      <div className="mt-4 bg-gray-200 -mx-8 px-8 py-8">
        <h1 className="text-3xl">{place.title}</h1>
        
        <AddressLink className="my-3">{place.address}</AddressLink>

        <PlaceGallery place = {place}/>

        <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">

          <div className="mb-2">
  
            <div className="my-4">
              <div>
                <h2 className="font-semibold text-2xl mb-2 -mt-2">Description</h2>
              </div>
              <div className="text-md leading-6 text-gray-700">{place.description}</div>
            </div>
            Check In : {place.checkIn}<br/>
            Check Out : {place.checkOut}<br/>
            Max Person Allowed : {place.maxGuests}
          </div>

          <div className="">
            <BookingWidget place = {place}/>
          </div>
        </div>

        <div className="bg-white -mx-8 py-8 px-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl mb-2">Extra Info</h2>
          </div>
          <div className="mt-2 text-sm text-gray-700 leading-6">{place.extrainfo}</div>
        </div>

      </div>
  )
}