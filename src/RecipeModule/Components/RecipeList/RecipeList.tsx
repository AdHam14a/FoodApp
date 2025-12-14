import { useEffect, useState } from "react";
import Header from "../../../Shared/Header/Header";
import headerImage from "../../../assets/header2.png";
import axios from "axios";

interface IRecipe {
  id: number; 
  name: string;
  creationDate: string;
  price: number;
}

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const res = await axios.get(
          "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data.data);
        setRecipes(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRecipes();
  }, []);
  return (
    <>
      <Header
        title={"Recipes"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imageURL={headerImage}
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Creation Date</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe:IRecipe) => (
            <tr key={recipe.id}>
              <th scope="row">{recipe.id}</th>
              <td>{recipe.name}</td>
              <td>{recipe.creationDate}</td>
              <td>{recipe.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
