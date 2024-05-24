"use client";
import { Navbar } from "flowbite-react";
import { useContext } from "react";
import { Link,NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import './Header.css';
const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
  return (
    <section className="w-full bg-white shadow sticky top-0 z-50">
      <header className="container mx-auto py-3">
      <Navbar fluid rounded className="p-0">
        <Navbar.Brand>
          
          <div className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            <div className="bg-black bg-opacity-80 text-white rounded-md px-3 py-1 font-space-4"> NODE</div>
          </div>
        </Navbar.Brand>
        <div className="flex md:order-2">
        {user ? (
              <div className="flex gap-4">
                <div>
                  <div className="dropdown dropdown-end z-20">
                    <div
                      tabIndex="0"
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS Navbar component"
                          src={user.photoURL}
                          data-tooltip-id="my-tooltip"
                        />
                        <Tooltip id="my-tooltip">
                            {user.displayName}
                        </Tooltip>
                      </div>
                    </div>
                    
                  </div>
                </div>
                <button onClick={() => logOut(navigate)} className=" text-black font-space-4 border-black border-[1px] px-3 hover:shadow-xl rounded-md">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 md:gap-3 pr-[1px] md:pr-3">
                <Link to="/login">
                  <button className=" text-black font-space-4 border-black border-[1px] px-3 py-1  hover:shadow-xl rounded-md">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className=" text-black font-space-4 border-black border-[1px] px-3 py-1  hover:shadow-xl rounded-md">
                    Register
                  </button>
                </Link>
              </div>
            )}
        </div>
        <Navbar.Toggle />
        <Navbar.Collapse className="font-space-4 text-black">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/add-blog">ADD BLOG</NavLink>
          <NavLink to="/all-blogs">ALL BLOGS</NavLink>
          <NavLink to="/featured-blogs">FEATURED BLOGS</NavLink>
          <NavLink to="/wishlist">WISHLIST</NavLink>
        </Navbar.Collapse>
      </Navbar>
      </header>
    </section>
  );
};

export default Header;
