import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const hasJWT = () => {
    return !!localStorage.getItem("token");
  };

  if (hasJWT()) {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export const PrivateLoginRoute = ({ component: Component, ...rest }: any) => {
  const hasJWT = () => {
    return !!localStorage.getItem("token");
  };

  if (hasJWT()) {
    return <Navigate to="/" />;
  } else {
    return <Component {...rest} />;
  }
};
