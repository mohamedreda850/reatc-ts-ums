import SideBar from "../SideBar/SideBar";

import NavBar from './../NavBar/NavBar';
import { Outlet } from "react-router";

export default function MasterLayout() {
  return (
    <div className="flex ">
      <div className=" ">
        <SideBar />
      </div>
      <div className="w-full">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}
