import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Shared/AuthLayout/AuthLayout";
import NotFound from "./Shared/NotFound/NotFound";
import Login from "./Auth/Login/Login";
import ChangePass from "./Auth/ChangePass/ChangePass";
import ForgetPass from "./Auth/ForgetPass/ForgetPass";
import Register from "./Auth/Register/Register";
import VerifyAcc from "./Auth/VerifyAcc/VerifyAcc";
import MasterLayout from "./Shared/MasterLayout/MasterLayout";
import Dashboard from "./Dashboard/Dashboard";
import RecipeList from "./RecipeModule/Components/RecipeList/RecipeList";
import RecipeData from "./RecipeModule/Components/RecipeData/RecipeData";
import CategoriesList from "./CategoriesModule/Components/CategoriesList/CategoriesList";
import CategoryData from "./CategoriesModule/Components/CategoryData/CategoryData";
import UsersList from "./UsersModule/Components/UsersList/UsersList";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Shared/ProtectedRoute/ProtectedRoute";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/change-pass",
          element: <ChangePass />,
        },
        {
          path: "/forget-pass",
          element: <ForgetPass />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/verify",
          element: <VerifyAcc />,
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "recipes", element: <RecipeList /> },
        { path: "recipes-data", element: <RecipeData /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "categories-data", element: <CategoryData /> },
        { path: "users", element: <UsersList /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        closeOnClick={true}
      />
    </>
  );
}

export default App;
