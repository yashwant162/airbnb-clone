import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios"

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null)
  const {ready, user, setUser} = useContext(UserContext)

  let {subpage} = useParams()
  // console.log(subpage)

  if(subpage === undefined){
    subpage = "profile"
  }

 async function logout(){
    await axios.post("api/user/logout")
    setRedirect("/")
    setUser(null)
  }

  if(!ready){
    return "Loading..." 
  }

  if(ready && !user && !redirect){
    return <Navigate to = {"/login"}/>
  }

  if(redirect){
    return <Navigate to = {redirect}/>
  }

  function linkClasses (type = null) {
    console.log("type is : "+ type + " subpage is : " + subpage)

    let classes = "inline-flex gap-1 py-2 px-6 rounded-full "
    if(type === subpage){
      classes += "bg-primary text-white "
    } else {
      classes += "bg-gray-200"
    }
    return classes
  }

  return (
   <div>
    <nav className="w-full flex mt-8 mb-8 gap-2 justify-center">
      <Link className={linkClasses('profile')} to = {"/account"}> My Profile</Link>
      <Link className={linkClasses('bookings')} to = {"/account/bookings"}> My Bookings</Link>
      <Link className={linkClasses("places")} to = {"/account/places"}> My Accomodations</Link>
    </nav>
    {subpage === 'profile' && (
      <div className="text-center max-w-lg mx-auto">
        Logged In as {user.name} <br />
        <button onClick={logout} className="primary max-w-sm  mt-2">Logout</button>
      </div>
    )}
   </div> 
  )
}