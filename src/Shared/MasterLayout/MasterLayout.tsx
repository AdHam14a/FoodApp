import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import MainSideBar from "../MainSideBar/MainSideBar";


export default function MasterLayout() {
  return (
    <>
      <div className="d-flex master-layout-container">
        <div className="sidebar-wrapper">
          <MainSideBar />
        </div>
        <div className="w-100 overflow-auto content-wrapper">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
