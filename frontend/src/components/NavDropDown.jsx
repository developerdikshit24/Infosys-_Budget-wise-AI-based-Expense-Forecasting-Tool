import { useState } from "react";
import { Link, useNavigate } from "react-router";
import BottomToolTip from "./BottomToolTip";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../stores/auth";

export default function NavDropdown() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleClick = () => {
          dispatch(logoutUserThunk())
          navigate('/login')
      }
  
  return (
    <div className="relative inline-block z-50 group text-left">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-gray-100/30 text-white px-2 backdrop-filter backdrop-blur py-2 rounded-full"
      >
        <img src="./user.png" className="w-8" alt="user" />

        {/* Arrow */}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="white"
        >
          <path d="M5 7l5 5 5-5H5z" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-100 backdrop-filter backdrop-blur rounded-md shadow-lg">
          <ul className="py-2">

            <Link to={'/'}>
              <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer ease-in-out duration-300 ">
                Dashboard
              </li>
            </Link>

            <Link to={'/profile'}>
              <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer ease-in-out duration-300 ">
                Profile
              </li>
            </Link>

            <Link to={'/setting'}>
              <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer ease-in-out duration-300 ">
                Settings
              </li>
            </Link>


            <button onClick={handleClick} type="button" className="w-full">
              <li className="px-4 py-2 hover:bg-red-600 hover:text-white hover:font-bold ease-in-out duration-300 cursor-pointer">
                Logout
              </li>
            </button>

          </ul>
        </div>
      )}
      <BottomToolTip value={'User'} />
    </div>
  );
}
