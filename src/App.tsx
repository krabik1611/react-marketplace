import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Marketplace } from "./layouts/Marketplace";
import { Login } from "./layouts/Login";
import { useDispatch } from "react-redux";
import { fetchUser } from "./saga/actions/user/fetchUser";
import {
  PrivateLoginRoute,
  PrivateRoute,
} from "./components/route/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute component={Marketplace} />,
    },
    {
      path: "/login",
      element: <PrivateLoginRoute component={Login} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
