import Header from "../../../Shared/Header/Header";
import headerImage from "../../../assets/header2.png";

export default function RecipeList() {
  return (
    <>
      <Header
        title={"Recipes"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imageURL={headerImage}
      />
      <div>RecipeList</div>
    </>
  );
}
