import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}) {
  const [user, setUser] = useState(null)
  const [ready,setReady] = useState(false)

  useEffect( () => {
    axios.get("/api/user/current").then(({data}) => {
      setUser(data)
      setReady(true)
    })
  }, [])

  return (
    <UserContext.Provider value = {{user, setUser, ready}}>
      {children}
    </UserContext.Provider>
  )
}