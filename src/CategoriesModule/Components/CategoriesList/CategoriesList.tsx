import axios, { AxiosError } from "axios";
import Header from "../../../Shared/Header/Header";
import headerImage from "../../../assets/header2.png";
import { useEffect, useState } from "react";
import Loading from "../../../Shared/Loading/Loading";
import NoData from "../../../Shared/NoData/NoData";
import Confirmation from "../../../Shared/Confirmation/Confirmation";
import { toast } from "react-toastify";

interface ICategory {
  id: number;
  name: string;
  creationDate: string;
}

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [Id, setId] = useState<number | null>(null);

  const handleOpenModal = (id: number) => {
    setId(id);
    setShow(true);
  };

  const confirmDelete = async (id: number) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Deleted Successfully");
      setCategories((prev) => prev.filter((cat: ICategory) => cat.id !== id));
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
    const getCategories = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCategories(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getCategories();
  }, []);

  return (
    <>
      <Header
        title={"Categories"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imageURL={headerImage}
      />
      <Confirmation
        show={show}
        handleClose={() => setShow(false)}
        deleteAction={() => confirmDelete(Id!)}
        title="Category"
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Creation Date</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center">
                <Loading />
              </td>
            </tr>
          ) : categories.length > 0 ? (
            categories.map((category: ICategory) => (
              <tr key={category.id}>
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td>{category.creationDate}</td>
                <td className="position-relative">
                  <i
                    className="fa-solid fa-ellipsis options-icon"
                    onClick={() => toggleMenu(category.id)}
                  ></i>
                  {openMenuId === category.id && (
                    <ul className="options-menu">
                      <li>View</li>
                      <li
                        className="delete"
                        onClick={() => handleOpenModal(category.id)}
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
              <td colSpan={5} className="text-center">
                <NoData />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
