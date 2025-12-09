import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

export default function MasterLayout() {
  return (
    <>
      <div>
        <div>
          <Sidebar />
        </div>
        <div>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
