import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import sidebarLogo from "../../assets/sidebar-logo.png";
import home from "../../assets/Home.png";
import users from "../../assets/people.png";
import recipes from "../../assets/columns-gap.png";
import categories from "../../assets/categories.png";
import changePassword from "../../assets/change-password.png";
import logout from "../../assets/logout.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <div className="sidebar-container">
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            <img
              src={sidebarLogo}
              alt="Logo"
              className="my-5 w-100 sidebar-logo"
              onClick={() => toggle()}
            />
            <MenuItem component={<Link to={"/dashboard"}/>}>
              <div className="d-flex align-items-center gap-4 ">
                <img src={home} alt="home" />
                Home
              </div>
            </MenuItem>
            <MenuItem component={<Link to={"/dashboard/users"}/>}>
              <div className="d-flex align-items-center gap-4">
                <img src={users} alt="people" />
                Users
              </div>
            </MenuItem>
            <MenuItem component={<Link to={"/dashboard/recipes"}/>}>
              <div className="d-flex align-items-center gap-4">
                <img src={recipes} alt="recipes" /> Recipes
              </div>
            </MenuItem>
            <MenuItem component={<Link to={"/dashboard/categories"}/>}>
              <div className="d-flex align-items-center gap-4">
                <img src={categories} alt="categories" /> Categories{" "}
              </div>
            </MenuItem>
            <MenuItem >
              <div className="d-flex align-items-center gap-4">
                <img src={changePassword} alt="change password" /> Change
                Password
              </div>
            </MenuItem>
            <MenuItem component={<Link to={"/"}/>}>
              <div className="d-flex align-items-center gap-4">
                <img src={logout} alt="logout" /> Logout{" "}
              </div>
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
