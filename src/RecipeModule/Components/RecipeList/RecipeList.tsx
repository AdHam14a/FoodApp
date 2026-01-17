import { useEffect, useState } from "react";
import Header from "../../../Shared/Header/Header";
import headerImage from "../../../assets/header2.png";
import axios, { AxiosError } from "axios";
import Loading from "../../../Shared/Loading/Loading";
import NoData from "../../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import Confirmation from "../../../Shared/Confirmation/Confirmation";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../Shared/Pagination/Pagination";
import { useAuth } from "../../../Context/AuthContext";

interface ICategory {
  id: number;
  name: string;
}

interface ITag {
  id: number;
  name: string;
}

interface IRecipe {
  id: number;
  name: string;
  description: string;
  price: number;
  imagePath: string;
  tag: ITag;
  category: ICategory[];
}

export default function RecipeList() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [Id, setId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favList, setFavList] = useState<number[]>([]);
  const { userData } = useAuth();
  const pageSize = 10;

  const getFavorites = async () => {
    try {
      const res = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // Assuming the response returns an array of objects containing recipe details
      const favIds = res.data.data.map((fav: any) => fav.recipe.id);
      setFavList(favIds);
    } catch (error) {
      console.error("Error fetching favorites", error);
    }
  };

  useEffect(() => {
    if (userData?.userGroup === "SystemUser") {
      getFavorites();
    }
  }, [userData]);

  const addToFav = async (id: number) => {
    try {
      await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe`,
        { recipeId: id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Added to Favorites Successfully");
      setFavList((prev) => [...prev, id]);
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

  const removeFromFav = async (id: number) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Removed from Favorites Successfully");
      setFavList((prev) => prev.filter((favId) => favId !== id));
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        toast.error((axiosError.response.data as { message: string }).message);
      } else {
        toast.error("An unknown error occurred during request.");
      }
    }
  };

  const navigate = useNavigate();

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
      console.log(recipes);
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
    const getRecipes = async (pageNumber: number = currentPage) => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data.data);
        setRecipes(res.data.data);
        if (res.data.totalNumberOfPages) {
          setTotalPages(res.data.totalNumberOfPages);
        } else if (res.data.pagination) {
          setTotalPages(res.data.pagination.totalNumberOfPages || 1);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getRecipes(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
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
      <div className="py-1 m-2 dash-container rounded-4 d-flex justify-content-between align-items-center">
        <div className="p-5">
          <h4>Recipe Table Details</h4>
          <p>You can check all details</p>
        </div>
        {userData?.userGroup === "SystemUser" ? (
          ""
        ) : (
          <div className="p-5">
            <button
              className="btn btn-success px-5"
              onClick={() => navigate("/dashboard/recipes-data")}
            >
              Add new Item
            </button>
          </div>
        )}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">tag</th>
            <th scope="col">category</th>
            <th scope="col">Actions</th>
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
                <th scope="row">{recipe.name}</th>
                <td>
                  <img
                    src={`${baseURL}${recipe.imagePath}`}
                    alt="image"
                    className="table-image"
                  />
                </td>
                <td>{recipe.price}</td>
                <td>{recipe.description}</td>
                <td>{recipe.tag?.name}</td>
                <td>{recipe.category?.map((cat) => cat.name).join(", ")}</td>

                <td className="position-relative">
                  {userData?.userGroup !== "SystemUser" ? (
                    <>
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
                    </>
                  ) : (
                    <i
                      onClick={(e) => {
                        e.stopPropagation();
                        if (favList.includes(recipe.id)) {
                          removeFromFav(recipe.id);
                        } else {
                          addToFav(recipe.id);
                        }
                      }}
                      className={
                        favList.includes(recipe.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"
                      }
                      style={{
                        color: favList.includes(recipe.id) ? "red" : "inherit",
                        cursor: "pointer",
                      }}
                      aria-hidden="true"
                    ></i>
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
      {!isLoading && recipes.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
