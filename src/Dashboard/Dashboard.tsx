import Header from "../Shared/Header/Header";
import headerImage from "../assets/dashboardHeader.png";
import { useAuth } from "../Context/AuthContext";
import rightArrow from "../assets/rightArrow.png";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { userData } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <Header
        title={`Hello ${userData?.userName}`}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imageURL={headerImage}
      />
      <div className="py-1 m-2 dash-container rounded-4 d-flex justify-content-between align-items-center">
        <div className="p-5">
          <h4>
            Fill the <span className="text-success">Recipes</span>
          </h4>
          <p>
            you can now fill the meals easily using the table and form , <br />
            click here and sill it with the table !
          </p>
        </div>
        <div className="p-5">
          <button 
            className="btn btn-success px-5"
            onClick={() => {
              navigate("/dashboard/recipes-data");
            }}
          >
            Fill Recipes{" "}
            <img
              src={rightArrow}
              alt="arrow"
            />
          </button>
        </div>
      </div>
    </>
  );
}
