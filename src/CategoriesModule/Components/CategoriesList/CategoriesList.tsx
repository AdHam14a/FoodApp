import axios from "axios";
import Header from "../../../Shared/Header/Header";
import headerImage from "../../../assets/header2.png";
import { useEffect, useState } from "react";
import Loading from "../../../Shared/Loading/Loading";
import NoData from "../../../Shared/NoData/NoData";

interface ICategory {
  id: number;
  name: string;
  creationDate: string;
}

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        console.log(res.data.data);
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Creation Date</th>
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
          ) : categories.length > 0 ? (
            categories.map((category: ICategory) => (
              <tr key={category.id}>
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td>{category.creationDate}</td>
                <td>
                  <i className="fa-solid fa-ellipsis options-icon"></i>
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
