import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useLocation } from "react-router-dom"
import axios from "axios"
import PlacesPage from "./PlacesPage"
import AccountNav from "../AccountNav"

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null)
  const {ready, user, setUser} = useContext(UserContext)

  let {pathname} = useLocation()
  console.log(pathname)

  // if(subpage === undefined){
  //   subpage = "profile"
  // }

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


  return (
   <div>
    <AccountNav/>
    
      <div className="text-center max-w-lg mx-auto mb-96">
        Logged In as {user.name} <br />
        <button onClick={logout} className="primary max-w-sm  mt-2">Logout</button>
      </div>
    
    
   </div> 
  )
}