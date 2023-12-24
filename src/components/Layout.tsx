import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../libs/hooks/useAuth";
import Footer from "./Footer";
const validPaths = ["/", "/calendar", "/signin", "/postedit", "/post"];
interface LayoutProps extends PropsWithChildren {}
const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  console.log(pathname);
  useEffect(() => {
    if (!validPaths.includes(pathname)) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <main>
        <Outlet />
      </main>
      {isAuth && <Footer />}
    </>
  );
};
export default Layout;
