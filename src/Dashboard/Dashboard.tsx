import Header from "../Shared/Header/Header";
import headerImage from "../assets/dashboardHeader.png";

export default function Dashboard() {
  return (
    <>
      <Header
        title={"Hello Upskilling"}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imageURL={headerImage}
      />
      <div>Dashboard</div>
    </>
  );
}
