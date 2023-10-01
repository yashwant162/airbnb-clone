/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import AirBnbLogo, { Globe, HamBurger, SearchLogo, UserLogo } from "../public/SvgComponents";
import ContextMenu from "./components/ContextMenu";

export default function Header() {
  const {user} = useContext(UserContext)
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false)
  const contextMenuOptions = [
    {
      name: "Login",
      callBack: () => {
        setIsContextMenuVisible(false)
      },
    },
    {
      name: "Sign Up",
      callBack: () => {
        setIsContextMenuVisible(false)
      },
    },
    {
      name: "Airbnb your home",
      callBack: () => {
        setIsContextMenuVisible(false)
      },
    },
    {
      name: "Help",
      callBack: () => {
        setIsContextMenuVisible(false)
      },
    },
  ]


  console.log(user)
  return (
    <header className="w-full flex flex-row justify-between transition-all duration-300 h-15 border-b border-b-gray-200 pb-4">
        <Link to={"/"} className="flex items-center gap-1">
          <AirBnbLogo/>
          {/* <span className="font-bold text-xl">airbnb</span> */}
        </Link>

        <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
          <div>Anywhere</div>
          <div className="border-l border-gray-300"></div>
          <div>Any week</div>
          <div className="border-l border-gray-300"></div>
          <div>Add guests</div>
          <button className="bg-primary text-white p-1 rounded-full">
            <SearchLogo/> 
          </button>
        </div>

        <div>
          <ul className="flex items-center mt-2 gap-2 justify-end font-medium">
              <li className="cursor-pointer">
                <span>Airbnb your home</span>
              </li>
              <li className="cursor-pointer">
                <Globe/>
              </li>
          </ul>
        </div>

        <div 
             className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 hover:shadow-xl transition-all duration-500"
             onClick={() => setIsContextMenuVisible(true)}     
          >
          <Link to={user?'/account':'/login'} className="flex gap-1">
            <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
              <UserLogo/>
            </div>
            <div>
              {!!user && (
                <div>
                  {user.name}
                </div>
              )}
            </div>
          </Link>
          <HamBurger/>
          {isContextMenuVisible && (
            <ContextMenu options = {contextMenuOptions}
                         coordinates= {{
                          x: window.innerWidth - 250,
                          y: 70
                         }}
                         contextMenu = {isContextMenuVisible}
                         setContextMenu = {setIsContextMenuVisible}
            />
          )}
        </div>

    </header>
  );
}
