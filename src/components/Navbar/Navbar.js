import { useEffect, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logoNavbar from "../../assets/images/Logo-Footer.png";
import userProfile from "../../assets/user-profile.svg";
import { useSearch } from "../../context/SearchContext";
import { useAuth } from "../../hooks/useAuth";
import {
  toggleSideCartWhatsApp,
  toggleSidebarWhatsApp
} from "../../redux/sidebar/sidebar_actions";
import { Avatar } from "../Login/Avatar/Avatar";
import { AvatarDropdown } from "../Login/AvatarDropdown/AvatarDropdown";
import PWAInstallButtonK from "../Pwa/PWAInstallButton";
import "./Navbar.scss";

const Navbar = (props) => {
  const { cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState(0);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const { focusInput, scrollToInput } = useSearch(); // 👈 usar contexto
  const shouldHideHeader = location.pathname.includes(
    "/f8119184-6568-421b-85c6-5e6859ddbbd7"
  );

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });
    setCartCount(count);
  }, [cart, cartCount]);

  return (
    <header className={`site-header ${shouldHideHeader ? "hidden" : ""}`}>
      <div className="container">
        <nav className="site-header__navbar">
          {/* Lado izquierdo: Logo */}
          <div className="site-header__left">
            <Link to="/" className="site-header__logo-link">
              <img
                src={logoNavbar}
                alt="company logo"
                className="site-header__logo"
              />
              <span className="site-header__logo-text">XEVEN SENSUAL</span>
            </Link>
          </div>

          {/* Lado derecho: iconos, enlaces y botones */}
          <div className="site-header__right">
            
            <ul className="site-header__icons-list">
  <li className="site-header__icon-btn">
    <PWAInstallButtonK />
  </li>

  <li className="site-header__icon-btn">
    <Link to="/search" onClick={scrollToInput}>
      <MdSearch />
    </Link>
  </li>
</ul>

<ul className="site-header__icons-list">
  {currentUser ? (
    <li className="site-header__icon-btn">
      <AvatarDropdown
        photoURL={currentUser.photoURL || userProfile}
        username={currentUser.displayName || "User"}
        logout={logout}
      />
    </li>
  ) : (
    <li className="site-header__icon-btn">
      <Link to="login">
        <Avatar photoURL={userProfile} />
      </Link>
    </li>
  )}

  <li
    className="site-header__icon-btn"
    onClick={() => dispatch(toggleSideCartWhatsApp())}
  >
    <AiOutlineShopping />
    <span className="site-header__cart-count">{cartCount}</span>
  </li>

  <li className="site-header__icon-btn">
    <FaBars
      className="site-header__toggle"
      onClick={() => dispatch(toggleSidebarWhatsApp())}
    />
  </li>
</ul>




          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
