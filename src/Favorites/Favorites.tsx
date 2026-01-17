import Header from "../Shared/Header/Header";
import headerImage from "../../src/assets/header2.png";
import NoData from "../Shared/NoData/NoData";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Loading from "../Shared/Loading/Loading";
import { toast } from "react-toastify";

export default function Favorites() {
  const baseURL = "https://upskilling-egypt.com:3006/";
  const [favList, setFavList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFavs = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data.data);
      setFavList(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteFav = async (id: number) => {
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
      getFavs();
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        toast.error((axiosError.response.data as { message: string }).message);
      } else {
        toast.error("An unknown error occurred during request.");
      }
    }
  };

  useEffect(() => {
    getFavs();
  }, []);

  return (
    <>
      <Header
        title={"Favorites"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imageURL={headerImage}
      />
      <div className="container mt-4">
        <div className="row justify-content-center">
          {isLoading ? (
            <Loading />
          ) : favList.length > 0 ? (
            favList.map((fav: any) => (
              <div className="col-sm-8 col-md-6 col-lg-4 mb-4 " key={fav.id}>
                <div className="border rounded-4 shadow-sm h-100 overflow-hidden bg-white">
                  <div className="position-relative">
                    <img
                      src={
                        fav.recipe.imagePath
                          ? `${baseURL}${fav.recipe.imagePath}`
                          : NoData
                      }
                      alt={fav.recipe.name}
                      className="w-100"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <button
                      className="btn btn-light position-absolute rounded-3 shadow-sm p-1 d-flex align-items-center justify-content-center"
                      style={{
                        top: "15px",
                        right: "15px",
                        width: "35px",
                        height: "35px",
                      }}
                      onClick={() => deleteFav(fav.id)}
                    >
                      <i className={`fa-solid text-success fa-heart`}></i>
                    </button>
                  </div>

                  <div className="p-3">
                    <h3 className="h5 fw-bold mb-2 text-truncate">
                      {fav.recipe.name}
                    </h3>
                    <p className="text-secondary small mb-0">
                      {fav.recipe.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center"><NoData /></div>
          )}
        </div>
      </div>
    </>
  );
}
