import axios, { AxiosError } from "axios";
import Header from "../../../Shared/Header/Header";
import headerImage from "../../../assets/header2.png";
import { useCallback, useEffect, useState } from "react";
import Loading from "../../../Shared/Loading/Loading";
import NoData from "../../../Shared/NoData/NoData";
import Confirmation from "../../../Shared/Confirmation/Confirmation";
import CategoryData from "../CategoryData/CategoryData";
import { toast } from "react-toastify";
import Pagination from "../../../Shared/Pagination/Pagination";
import { useAuth } from "../../../Context/AuthContext";

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
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { userData } = useAuth();
  const pageSize = 10;

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

  const getCategories = useCallback(
    async (pageNumber: number = currentPage) => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCategories(res.data.data);
        setTotalPages(
          res.data.totalNumberOfPages ||
            res.data.pagination?.totalNumberOfPages ||
            1
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    getCategories(currentPage);
  }, [getCategories, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      <CategoryData
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        refreshList={getCategories}
      />
      <div className="py-1 m-2 dash-container rounded-4 d-flex justify-content-between align-items-center">
        <div className="p-5">
          <h4>Categories Table Details</h4>
          <p>You can check all details</p>
        </div>
        {userData?.userGroup !== "SystemUser" ? (
          <div className="p-5">
            <button
              className="btn btn-success px-5"
              onClick={() => setShowAddModal(true)}
            >
              Add new Item
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Creation Date</th>
            <th scope="col">Actions</th>
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
                  {userData?.userGroup !== "SystemUser" ? (
                    <>
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
                    </>
                  ) : (
                    <i className="fa fa-heart" aria-hidden="true"></i>
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
      {!isLoading && categories.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
