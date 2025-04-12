import Home from "./pages/home/Home";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import List from "./pages/list/List";
import { Layout, RequireAuth } from "./pages/layout/Layout";
import SinglePage from "./pages/single/SinglePage";
import Profile from "./pages/profile/Profile";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NewPost from "./pages/newPost/NewPost";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/list",
          element: <List />,
          loader: listPageLoader
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <UpdateProfile />
        },
        {
          path: "/add",
          element: <NewPost />
        },
      ],
    },
  ]);

  return (

    <RouterProvider router={router} />
  );
}

export default App;