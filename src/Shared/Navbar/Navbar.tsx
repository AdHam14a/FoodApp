import Avatar from "../../assets/avatar.png";
import arrowDown from "../../assets/back_arrow.png";
import bellNotifications from "../../assets/Bell-Notifications.png";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-2 m-3 rounded-4">
        <div className="container-fluid d-flex justify-content-end ">
          <div className="d-flex gap-4 align-items-center px-2 user-data">
            <div className="d-flex  gap-2 align-items-center">
              <img src={Avatar} alt="avatar" />
              <div className="">Upskilling</div>
            </div>
            <div>
              <img src={arrowDown} alt="arrow down" />
            </div>
          </div>
          <div className="d-flex gap-4 align-items-center px-2 bell-notifications">
            <div>
              <img src={bellNotifications} alt="Notifications" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
