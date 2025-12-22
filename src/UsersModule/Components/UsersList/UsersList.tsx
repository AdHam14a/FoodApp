import { useEffect, useState } from "react";
import Header from "../../../Shared/Header/Header";
import headerImage from "../../../assets/header2.png";
import avatarImage from "../../../assets/avatar.png";
import axios, { AxiosError } from "axios";
import Loading from "../../../Shared/Loading/Loading";
import NoData from "../../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import Confirmation from "../../../Shared/Confirmation/Confirmation";
import UserData from "../UserData/UserData";
import Pagination from "../../../Shared/Pagination/Pagination";

interface IRole {
  id: number;
  name: string;
}

interface IUser {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string;
  creationDate: string;
  group: IRole;
}

export default function UsersList() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [Id, setId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const baseURL = "https://upskilling-egypt.com:3006/";

  const handleOpenModal = (id: number) => {
    setId(id);
    setShow(true);
  };

  const confirmDelete = async (id: number) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Users/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Deleted Successfully");
      setUsers((prev) => prev.filter((user: IUser) => user.id !== id));
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

  const getUsers = async (pageNumber: number = currentPage) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data.data);
      setUsers(res.data.data);
      if (res.data.totalNumberOfPages) {
        setTotalPages(res.data.totalNumberOfPages);
      } else if (res.data.pagination) {
        setTotalPages(res.data.pagination.totalNumberOfPages || 1);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  }; 

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header
        title={"Users"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imageURL={headerImage}
      />
      <Confirmation
        show={show}
        handleClose={() => setShow(false)}
        deleteAction={() => confirmDelete(Id!)}
        title="User"
      />
      <UserData
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        refreshList={getUsers}
      />
      <div className="py-1 m-2 dash-container rounded-4 d-flex justify-content-between align-items-center">
        <div className="p-5">
          <h4>Users Table Details</h4>
          <p>You can check all details</p>
        </div>
        <div className="p-5">
          <button
            className="btn btn-success px-5"
            onClick={() => setShowAddModal(true)}
          >
            Add new Item
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Country</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={8} className="text-center">
                <Loading />
              </td>
            </tr>
          ) : users.length > 0 ? (
            users.map((user: IUser) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>
                  <img
                    src={
                      user.imagePath
                        ? `${baseURL}${user.imagePath}`
                        : avatarImage
                    }
                    alt="user"
                    className="table-image"
                  />
                </td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.country}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.group.name}</td>
                <td className="position-relative">
                  <i
                    className="fa-solid fa-ellipsis options-icon"
                    onClick={() => toggleMenu(user.id)}
                  ></i>
                  {openMenuId === user.id && (
                    <ul className="options-menu">
                      <li>View</li>
                      <li
                        className="delete"
                        onClick={() => handleOpenModal(user.id)}
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
              <td colSpan={8} className="text-center">
                <NoData />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!isLoading && users.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
