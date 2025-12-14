import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/Sidebar";

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div>
          <SideBar />
        </div>
        <div className="w-100">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
