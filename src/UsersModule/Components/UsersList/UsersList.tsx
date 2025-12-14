import Header from "../../../Shared/Header/Header";
import headerImage from "../../../assets/header2.png";

export default function UsersList() {
  return (
    <>
      <Header
        title={"Users"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imageURL={headerImage}
      />
      <div>UsersList</div>
    </>
  );
}
