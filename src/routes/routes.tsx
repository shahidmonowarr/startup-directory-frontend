import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MyStartups from "../components/myStartups/myStartups";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Register from "../pages/Register/Register";
import AddStartup from "../pages/Startups/AddStartup";
import Startups from "../pages/Startups/Startups";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/startups",
        element: <Startups />,
      },
      {
        path: "/addNewStartup",
        element: (
          <PrivateRoute>
            <AddStartup />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-startups",
        element: (
          <PrivateRoute>
            <MyStartups />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <App />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default routes;
