import { useEffect, useState } from "react";
import Header from "../../../Shared/Header/Header";
import headerImage from "../../../assets/header2.png";
import axios from "axios";
import Loading from "../../../Shared/Loading/Loading";

interface IRecipe {
  id: number;
  name: string;
  creationDate: string;
  price: number;
}

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setIsLoading(true);
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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
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
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
                <td colSpan={5} className="text-center">
                    <Loading />
                </td>
            </tr>
          ) : (
            recipes.map((recipe: IRecipe) => (
              <tr key={recipe.id}>
                <th scope="row">{recipe.id}</th>
                <td>{recipe.name}</td>
                <td>{recipe.creationDate}</td>
                <td>{recipe.price}</td>
                <td>
                  <i className="fa-solid fa-ellipsis options-icon"></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
