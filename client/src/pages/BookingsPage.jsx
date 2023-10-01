/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import axios from "axios"
import { differenceInCalendarDays, format } from "date-fns"
import { Link } from "react-router-dom"
import BookingDates from "../BookingDates"

export default function BookingsPage(){
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    
    async function fetchBookings(){
      const {"data": {bookingsData}} = await axios.get("api/data/get-user-bookings")
      console.log(bookingsData)
      setBookings(bookingsData)
    }
    
     
    fetchBookings()
  },[])
  return(
    <div className="">
      <AccountNav/>
      <div className="max-w-6xl w-full mx-auto">
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-4" key={booking.place}>
            <div className="w-48">
              <img className="object-cover" src={"http://localhost:5000/uploads/"+booking.place.photos[0]} alt="" />
            </div>
            
            <div className="py-3 grow pr-3">
              <h2 className="text-xl">{booking.place.title}</h2>
              <div className="text-xl">

                <BookingDates className= "mb-2 mt-4 text-gray-500 text-sm" booking = {booking}/>
                
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-base">
                    {booking.price}/-
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}