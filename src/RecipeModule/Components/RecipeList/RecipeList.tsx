import { useEffect, useState } from "react";
import Header from "../../../Shared/Header/Header";
import headerImage from "../../../assets/header2.png";
import axios, { AxiosError } from "axios";
import Loading from "../../../Shared/Loading/Loading";
import NoData from "../../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import Confirmation from "../../../Shared/Confirmation/Confirmation";

interface IRecipe {
  id: number;
  name: string;
  creationDate: string;
  price: number;
  imagePath: string;
}

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [Id, setId] = useState<number | null>(null);

  const baseURL = "https://upskilling-egypt.com:3006/";

  const handleOpenModal = (id: number) => {
    setId(id);
    setShow(true);
  };

  const confirmDelete = async (id: number) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Deleted Successfully");
      setRecipes((prev) => prev.filter((rec: IRecipe) => rec.id !== id));
      setShow(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        toast.error((axiosError.response.data as { message: string }).message);
      } else {
        toast.error("An unknown error occurred during request.");
      }
    }
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

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
      <Confirmation
        show={show}
        handleClose={() => setShow(false)}
        deleteAction={() => confirmDelete(Id!)}
        title="Recipe"
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Creation Date</th>
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6} className="text-center">
                <Loading />
              </td>
            </tr>
          ) : recipes.length > 0 ? (
            recipes.map((recipe: IRecipe) => (
              <tr key={recipe.id}>
                <th scope="row">{recipe.id}</th>
                <td>{recipe.name}</td>
                <td>{recipe.creationDate}</td>
                <td>{recipe.price}</td>
                <td>
                  <img
                    src={`${baseURL}${recipe.imagePath}`}
                    alt="image"
                    className="table-image"
                  />
                </td>
                <td className="position-relative">
                  <i
                    className="fa-solid fa-ellipsis options-icon"
                    onClick={() => toggleMenu(recipe.id)}
                  ></i>
                  {openMenuId === recipe.id && (
                    <ul className="options-menu">
                      <li>View</li>
                      <li
                        className="delete"
                        onClick={() => handleOpenModal(recipe.id)}
                      >
                        Delete
                      </li>
                    </ul>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                <NoData />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
