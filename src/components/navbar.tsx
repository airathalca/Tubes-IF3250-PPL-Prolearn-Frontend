import React from "react";
import { AuthContext } from "@/contexts/AuthContext";

const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { setIsLoggedIn } = React.useContext(AuthContext);
  return (
    <nav className="flex w-full items-center justify-between flex-wrap bg-gray-300 p-6">
      <div className="flex items-center flex-shrink-0 mr-6">
        <img src="../logo.png" alt="Logo" className="" />
        {/* <span className="font-bold text-4xl tracking-tight">ProLearn</span> */}
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto justify-end">
        <div className="text-xl lg:flex-end space-x-16 mr-16">
          <a
            href="/course"
            className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:transition 
            ease-in-out hover:scale-110 duration-300"
          >
            Course
          </a>
          {
            isLoggedIn ? (
              <a
                href="/course/subscribed"
                className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:transition
                ease-in-out hover:scale-110 duration-300"
              >
                My Course
              </a>
            ) : (
              <a
                href="/auth/login"
                className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:transition
                ease-in-out hover:scale-110 duration-300"
              >
                My Course
              </a>
            )
          }
          <a
            href="/compiler"
            className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:transition 
            ease-in-out hover:scale-110 duration-300"
          >
            Compiler
          </a>
          <a
            href="/aboutUs"
            className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:transition 
            ease-in-out hover:scale-110 duration-300"
          >
            About Us
          </a>
        </div>
        <div className="mr-10">
          {isLoggedIn ? (
            <div>
              <a
                href="/auth/login"
                className="inline-block w-32 h-auto text-xl px-4 py-2 leading-none border
              rounded-xl text-black bg-red-400 mt-4 lg:mt-0 mr-5 text-center align-middle
              hover:transition ease-in-out hover:scale-110 duration-300"
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                }}
              >
                Logout
              </a>
            </div>
          ) : (
            <div className="mr-10">
              <a
                href="/auth/login"
                className="inline-block w-32 h-auto text-xl px-4 py-2 leading-none border 
                rounded-xl text-black bg-white mt-4 lg:mt-0 mr-12 ml-10 text-center align-middle 
                hover:transition ease-in-out hover:scale-110 duration-300"
              >
                Login
              </a>
              <a
                href="/auth/register"
                className="inline-block w-32 h-auto text-xl px-4 py-2 leading-none border 
                rounded-xl text-black bg-gray-400 mt-4 lg:mt-0 mr-5 text-center align-middle 
                hover:transition ease-in-out hover:scale-110 duration-300"
              >
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
