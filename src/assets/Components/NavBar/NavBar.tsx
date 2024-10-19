import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../Context/AuthContext";


export default function NavBar() {
  const {userData }:any=useContext(authContext);
  return (
    <>
      <nav className="bg-white  ">
        <div className=" flex  items-center justify-between mx-auto p-4">
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <h1 className="ml-5  border-l-4 border-[#F8D442] pl-3 font-bold text-[18]">
              UMS
            </h1>
          </Link>
          <h1 className="text-2xl text-gray-600"> Wellcome {userData?.firstName}</h1>
        </div>
      </nav>
    </>
  );
}
