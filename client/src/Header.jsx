/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import AirBnbLogo, { Globe, HamBurger, SearchLogo, UserLogo } from "../public/SvgComponents";
import ContextMenu from "./components/ContextMenu";
import axios from "axios";

export default function Header() {
  const {user, setUser} = useContext(UserContext)
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false)
  const [redirect, setRedirect] = useState(null)
  const contextMenuOptions = [
    {
      name: "Login",
      link: "/login",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Sign Up",
      link: "/register",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Airbnb your home",
      link: "/",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Help",
      link: "/",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
  ];

    const authenticatedContextMenuOptions = [
    {
      name: "Account",
      link: "/account",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Home",
      link: "/",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Trips",
      link: "/account/bookings",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Manage Listings",
      link: "/account/places",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Notifications",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Wishlists",
      callBack: () => {
       setIsContextMenuVisible(false);
      },
    },
    {
      name: "Help",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Logout",
      callBack: async () => {
        setIsContextMenuVisible(false);
        await axios.post("api/user/logout")
        setUser(null)
        setRedirect("/")

      },
    },
  ];

  const triggerElementRef = useRef(null);

  const handleContextMenuToggle = () => {
    setIsContextMenuVisible(!isContextMenuVisible);
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!triggerElementRef.current || triggerElementRef.current.contains(e.target)) {
        return;
      }
      setIsContextMenuVisible(false);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  if(redirect){
    return <Navigate to = {redirect}/>
  }

  return (
    <header className="w-full flex flex-row justify-between transition-all duration-300 h-15 border-b border-b-gray-200 pb-4">
      <Link
        to={"/"}
        className="flex items-center gap-1"
        ref={triggerElementRef}
        onClick={handleContextMenuToggle}
      >
        <AirBnbLogo />
      </Link>


      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <div>Anywhere</div>
        <div className="border-l border-gray-300"></div>
        <div>Any week</div>
        <div className="border-l border-gray-300"></div>
        <div>Add guests</div>
        <button className="bg-primary text-white p-1 rounded-full">
          <SearchLogo />
        </button>
      </div>

      <div>
        <ul className="flex items-center mt-2 gap-2 justify-end font-medium">
          <li className="cursor-pointer">
            <span>Airbnb your home</span>
          </li>
          <li className="cursor-pointer">
            <Globe />
          </li>
        </ul>
      </div>

      <div
        className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 hover:shadow-xl transition-all duration-500"
      >
        <Link to={user ? '/account' : '/login'} className="flex gap-1">
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <UserLogo />
          </div>
          <div>
            {!!user && (
              <div>
                {user.name}
              </div>
            )}
          </div>
        </Link>
        <div
        ref={triggerElementRef}
        onClick={handleContextMenuToggle} >
        <HamBurger />
        </div>
        {isContextMenuVisible && user && (
          <ContextMenu
            options={authenticatedContextMenuOptions}
            coordinates={{
               x: window.innerWidth - 250,
              y: 70,
            }}
            contextMenu={isContextMenuVisible}
            setContextMenu={setIsContextMenuVisible}
          />
        )}
        {isContextMenuVisible && !user && (
          <ContextMenu
            options={contextMenuOptions}
            coordinates={{
              x: window.innerWidth - 250,
             y: 70,
           }}
            contextMenu={isContextMenuVisible}
            setContextMenu={setIsContextMenuVisible}
          />
        )}

      </div>

    </header>
  );
}