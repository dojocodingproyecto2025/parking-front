import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RouteMiddleware = () => {
  const validate = () => {
    const jwt = localStorage.getItem("jwt");
    
    if (!jwt) {
      return false;
    }

    const decode = jwtDecode(jwt);
    const currentTime = Date.now() / 1000;
    if (currentTime > decode.exp) {
      localStorage.removeItem("jwt");
      return false;
    }

    return true;
  };

  if (!validate()) {
    // return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
export default RouteMiddleware;
