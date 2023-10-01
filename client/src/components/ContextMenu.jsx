/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"

export default function ContextMenu({options, coordinates, contextMenu, setContextMenu}){
  const contextMenuRef = useRef(null)

  const handleClick = (e,callBack) => {
    e.stopPropagation()
    callBack()
  }

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
        
    } 
  }, [])
  
  return (
    <div
      className={` bg-white shadow-2xl fixed py-5  z-[100] rounded-lg border border-gray-200`}
      ref={contextMenuRef}
      style={{
        boxShadow:
          "0 2px 5px 0 rgba(var(11,20,26),.26),0 2px 10px 0 rgba(11,20,26;),.16)",
        top: coordinates.y,
        left: coordinates.x,
      }}
    >
      <ul>
        {options.map(({ name, link, callBack }) => (
          <Link to={link}>
          <li
            className="hover:bg-gray-100 pl-5 pr-10  py-2 cursor-pointer"
            key={name}
            onClick={(e) => handleClick(e,callBack)}
          >
            <span className="">{name}</span>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}