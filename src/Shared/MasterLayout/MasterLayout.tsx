import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";


export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="h-100">
          <SideBar />
        </div>
        <div className="w-100 overflow-auto">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
