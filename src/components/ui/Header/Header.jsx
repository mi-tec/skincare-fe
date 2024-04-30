import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header">
      <div className="header-navigation relative md:flex md:items-center">
        <div className="header-logo bg-slate-950 p-5 text-slate-50 flex justify-between items-center md:bg-transparent md:text-slate-950 z-[999]">
          <div className="logo">
            <p className="leading-normal uppercase md:flex md:text-center md:mt-0 md:mb-0 md:ml-auto md:mr-auto md:text-[40px]">
              <Link to="/">Logo</Link>
            </p>
          </div>
          <div className="hamburger-icon md:hidden">
            <button
              onClick={handleClick}
              className="flex flex-col justify-center items-center"
            >
              <span
                className={`bg-slate-50 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                    }`}
              ></span>
              <span
                className={`bg-slate-50 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${
                      isOpen ? "opacity-0" : "opacity-100"
                    }`}
              ></span>
              <span
                className={`bg-slate-50 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                    }`}
              ></span>
            </button>
          </div>
        </div>
        <div
          className={`navingation p-5 absolute bg-slate-50 text-slate-950 w-full z-[999] ${
            !isOpen ? "hidden" : "block"
          } md:flex md:bg-transparent md:relative md:p-0 md:justify-center`}
        >
          <ul className="md:flex">
            <li className="p-3 block">
              <Link to={"/"} className="block">
                Home
              </Link>
            </li>
            <li className="p-3 block">
              <Link to={"/about-us"} className="block">
                About Us
              </Link>
            </li>
            <li className="p-3 block">
              <Link to={"/"} className="block">
                test
              </Link>
            </li>
          </ul>
        </div>
        <div className="login-register hidden md:flex gap-x-4">
          <div className="login bg-red-600 p-2 rounded text-slate-50">
            <Link to="/user-login">Login</Link>
          </div>
          <div className="register p-2">
            <Link to="/user-register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
