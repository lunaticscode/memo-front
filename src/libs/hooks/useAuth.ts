import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);

  const setAuthState = () => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") === "memo-app-token"
    ) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      navigate("/signin");
    }
  };

  useEffect(() => {
    if (location.pathname === "/signin") return;
    setAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  return {
    isAuth,
  };
};
export default useAuth;
