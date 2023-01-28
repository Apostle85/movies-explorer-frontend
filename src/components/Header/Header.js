import Navigation from "../Navigation/Navigation";
import headerLogo from "../../images/header__logo.svg";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header(props) {
  const location = useLocation();

  return (
    <header
      className={`header ${
        location.pathname === "/" ? "header_color_gray" : undefined
      }`}
    >
      <Link to="/">
        <img
          src={headerLogo}
          alt="Логотип Дипломного Проекта"
          className="header__logo"
        />
      </Link>
      <Navigation />
    </header>
  );
}
