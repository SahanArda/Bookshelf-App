import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AuthRouteGuard = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // Redirect to the login page if no token is found
      navigate("/");
    }
  }, [token, navigate]);

  return <>{token ? children : null}</>;
};

AuthRouteGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRouteGuard;
