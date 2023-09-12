import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from "date-fns"
import axios from "axios"
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import { UserContext } from "./UserContext"
/* eslint-disable react/prop-types */
export default function BookingWidget({place}){
    const [checkIn,setCheckIn] = useState('')
    const [checkOut,setCheckOut] = useState('')
    const [numberOfGuests,setNumberOfGuests] = useState(1)
    const [name,setName] = useState('')
    const [number,setNumber] = useState('')
    const [redirect,setRedirect] = useState('')
    const {user} = useContext(UserContext)

    useEffect(() => {
      if(user){
        setName(user.name)
      }
    },[user])

    let numberOfNights = 0
    
    if(checkIn && checkOut){
      numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
      console.log("nights :"+ numberOfNights)
    }
    
    async function bookPlace(){
      const sendData = {
             checkIn, checkOut, name,
             number, place:place._id, price: numberOfNights*place.price, numberOfGuests}
      
      const token = Cookies.get('Token')

      if(token == "undefined"){
         alert("You must be logged in before you Book a place")
         setRedirect(`/login`)
      }
      else{
        const {"data":{bookingData}} = await axios.post("api/data/book-place",sendData)
        console.log(bookingData)
        const id = bookingData._id
        setRedirect(`/account/bookings/${id}`)
      }

    }

    if (redirect){
      return <Navigate to={redirect}/>
    }

    return (
      <div className="bg-white shadow p-4 rounded-2xl">
                    <div className="text-2xl text-center">
                      Price:  Rs. {place.price}/- per Night
                    </div>

                    <div className="border rounded-2xl mt-4">

                      <div className="flex">
                        <div className="py-3 px-4">
                          <label>Check In:</label>
                          <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                        </div>
                        <div className="py-3 px-4 border-l">
                          <label>Check Out:</label>
                          <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                        </div>
                      </div>

                      <div className="py-3 px-4 border-t">
                          <label>Number of guests: </label>
                          <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)}/>
                      </div>

                      {numberOfNights > 0 && (
                        <div className="py-3 px-4 border-t">
                          <label >Your Full Name</label>
                          <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="Neeraj Chopra" />
                          <label >Your Phone Number</label>
                          <input type="tel" value={number} onChange={ev => setNumber(ev.target.value)} placeholder="XXXXX-XXX98" />
                        </div>
                        
                      )}
                      
                    </div>

                    <button onClick={bookPlace} className="primary">
                      Book this place
                      {numberOfNights > 0 && (
                        <span> Rs.{numberOfNights*place.price}</span>
                      )}
                    </button>
            </div>
    )
}