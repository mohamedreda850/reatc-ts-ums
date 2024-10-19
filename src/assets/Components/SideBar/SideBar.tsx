import { CgProfile } from "react-icons/cg";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaHome,
  FaUsers,
} from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { TiUserAdd } from "react-icons/ti";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { authContext } from "../Context/AuthContext";

export default function SideBar() {
  const [isColapsed, setIsColapsed] = useState(true);
  const navigate = useNavigate();
  function togleColapsed() {
    setIsColapsed(!isColapsed);
  }
  const { userData }:any = useContext(authContext);
  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <div className=" h-full">
      <Sidebar collapsed={isColapsed} className=" h-full bg-[#F2EAE1]">
        <div className="w-full">
          {isColapsed ? (
            <FaArrowCircleRight
              onClick={togleColapsed}
              className="ml-auto mr-3 my-3"
              size={20}
            />
          ) : (
            <FaArrowCircleLeft
              onClick={togleColapsed}
              className="ml-auto mr-3 my-3"
              size={20}
            />
          )}
        </div>
        <div className="">
          {" "}
          <h1 className="ml-5 my-5 border-l-4 border-[#F8D442] pl-3 font-bold text-[18]">
            UMS
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center my-10">
          <img
            src={userData?.image}
            className="w-1/2 rounded-full h-1/2 object-cover"
            alt=""
          />
          <h4 className="font-bold text-[17px] text-center mt-4">
            {userData?.firstName} {userData?.lastName}
          </h4>
          <h5 className="text-[#FEAF00]">Admin</h5>
        </div>
        <Menu className="">
          <MenuItem icon={<FaHome />} component={<Link to="/dashboard" />}>
            {" "}
            Home
          </MenuItem>
          <MenuItem
            icon={<FaUsers />}
            component={<Link to="/dashboard/users-list" />}
          >
            {" "}
            Users
          </MenuItem>
          <MenuItem
            icon={<TiUserAdd />}
            component={<Link to="/dashboard/add-user" />}
          >
            {" "}
            Add User
          </MenuItem>
          <MenuItem
            icon={<CgProfile />}
            component={<Link to="/dashboard/profile" />}
          >
            {" "}
            Profile
          </MenuItem>
          <MenuItem icon={<TbLogout />} onClick={logout}>
            {" "}
            Logout{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
