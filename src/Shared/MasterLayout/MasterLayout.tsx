import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import MainSideBar from "../MainSideBar/MainSideBar";


export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="h-100">
          <MainSideBar />
        </div>
        <div className="w-100 overflow-auto">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
