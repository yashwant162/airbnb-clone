import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AddressLink from "../AddressLink"
import PlaceGallery from "../PlaceGallery"
import BookingDates from "../BookingDates"

export default function BookedPage(){
  const {id} = useParams()
  const [booking, setBooking] = useState('')
  console.log("id sent is "+id)

  useEffect(() => {
    console.log("id in useEffect is "+id)
    const sendData = { BookingId:id }
    console.log("Send Data is "+ sendData)
    async function fetchBooking(){

      const {"data":{bookingData}} = await axios.get("api/data/get-booking-by-id",{params: sendData})
      console.log("Received Data is " + JSON.stringify(bookingData))
      setBooking(bookingData)
    }
    fetchBooking()
  },[id])

  if(!booking){
    return ''
  }

  return (
    <div className="my-8 max-w-6xl w-full mx-auto">
      <h1 className="text-3xl">{booking.place?.title}</h1>
      <AddressLink className="my-2">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl items-center flex justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your Booking Information:</h2>
          <BookingDates booking={booking}/>
        </div>
        <div className="bg-primary p-4 text-white rounded-2xl">
          <div>Total Price</div>
          <div className="text-3xl">₹{booking.price}</div>
        </div>
      </div>
      <PlaceGallery place = {booking.place}/>
    </div>
  )
}