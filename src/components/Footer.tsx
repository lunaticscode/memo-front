import { FC, ReactElement, cloneElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MemoListIcon from "./icons/MemoList";
import CalendarIcon from "./icons/CalendarIcon";
import EditIcon from "./icons/EditIcon";
import PhotoIcon from "./icons/Photo";

type NavMenuPaths = "/" | "/calendar" | "/album" | "/postedit";
const navMenus: Array<{ path: NavMenuPaths; icon: ReactElement }> = [
  { path: "/", icon: <MemoListIcon /> },
  { path: "/postedit", icon: <EditIcon /> },
  { path: "/album", icon: <PhotoIcon /> },
  { path: "/calendar", icon: <CalendarIcon /> },
];

interface FooterProps {}
const Footer: FC<FooterProps> = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const handleClickNav = (path: NavMenuPaths) => {
    navigate(path);
  };

  return (
    <footer>
      {navMenus.map((menu, index) => (
        <nav
          className={"nav-menu"}
          key={`nav-menu-${index}`}
          onClick={() => handleClickNav(menu.path)}
        >
          {cloneElement(menu.icon, {
            active: location.pathname === menu.path,
          })}
        </nav>
      ))}
    </footer>
  );
};

export default Footer;
