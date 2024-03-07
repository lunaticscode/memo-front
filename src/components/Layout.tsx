import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../libs/hooks/useAuth";
import Footer from "./Footer";
const validPaths = [
  "/",
  "/calendar",
  "/signin",
  "/album",
  "/postedit",
  "/post",
  "/calendar/detail",
];
interface LayoutProps extends PropsWithChildren {}
const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const execNavigate = () => {
    Notification.requestPermission().then(async (res) => {
      console.log(res);
      const noti = await new Notification("asdasdasd");
      console.log({ noti });
    });
  };

  useEffect(() => {
    execNavigate();
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
