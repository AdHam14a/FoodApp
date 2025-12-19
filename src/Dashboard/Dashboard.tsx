
import Header from "../Shared/Header/Header";
import headerImage from "../assets/dashboardHeader.png";
import { useAuth } from "../Context/AuthContext";

export default function Dashboard() {
  const { userData } = useAuth();
  return (
    <>
      <Header
        title={`Hello ${userData?.userName}`}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imageURL={headerImage}
      />
      <div>Dashboard</div>
    </>
  );
}
