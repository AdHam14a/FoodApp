import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

export default function AuthLayout() {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("");
  };
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-lg-5 col-md-7 col-sm-11 p-5 bg-white rounded-4">
              <div className="form-container">
                <div className="logo-container text-center">
                  <img
                    src={Logo}
                    alt="logo"
                    className="w-50"
                    style={{ cursor: "pointer" }}
                    onClick={onClickHandler}
                  />
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
