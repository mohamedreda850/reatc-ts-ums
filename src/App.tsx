import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./assets/Components/AuthLayout/AuthLayout";
import Login from "./assets/Components/Login/Login";
import MasterLayout from "./assets/Components/MasterLayout/MasterLayout";
import Home from "./assets/Components/Home/Home";

import Profile from "./assets/Components/Profile/Profile";
import UsersList from "./assets/Components/UsersList/UsersList";
import NotFound from "./assets/Components/NotFound/NotFound";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUser from "./assets/Components/AddUser/AddUser";
import ProtectedRoute from "./assets/Components/ProtectedRoute/ProtectedRoute";
import UpdateUser from "./assets/Components/UpdateUser/UpdateUser";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
    {
      path: "dashboard",
      element: <ProtectedRoute><MasterLayout /></ProtectedRoute>,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <ProtectedRoute><UsersList /></ProtectedRoute>,
        },
        {
          path: "home",
          element: <ProtectedRoute><Home /></ProtectedRoute>,
        },
        {
          path: "add-user",
          element:<ProtectedRoute><AddUser /></ProtectedRoute> ,
        },
        {
          path: "profile",
          element: <ProtectedRoute><Profile /></ProtectedRoute>,
        },
        {
          path: "users-list",
          element: <ProtectedRoute><UsersList /></ProtectedRoute>,
        },
        {
          path: "updtae-user/:id",
          element: <ProtectedRoute><UpdateUser /></ProtectedRoute>,
        }
      ],
    },
  ]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />

      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
