import { useDispatch, useSelector } from "react-redux";
import styles from "./NavBar.module.css";
import Link from "next/link";
import NavLink from "@/components/Links/NavLink";

function Navbar() {
  const dispatch = useDispatch();

  const { account, isConnected } = useSelector((state) => state.connection);

  return (
    <nav>
      <ul className="menu">
        <li className="logo">
          <a href="#">Metaverse</a>
        </li>
        <li className="item links">
          <Link href="/">Home</Link>
        </li>
        <li className="item links">
          <a href="#">About</a>
        </li>
        <li className="item has-submenu links">
          <a tabindex="0">Market Place</a>
          <ul className="submenu">
            <li className="subitem">
              <a href="#">Market Place 1</a>
            </li>
            <li className="subitem">
              <a href="#">Market Place 2</a>
            </li>
            <li className="subitem">
              <a href="#">Market Place 3</a>
            </li>
            <li className="subitem">
              <a href="#">Market Place 4</a>
            </li>
          </ul>
        </li>
        <li className="item links">
          <a href="#">Academy</a>
        </li>
        <li className="item links">
          <a href="#">Buy Metaverse</a>
        </li>
        <li className="item links">
          <a href="#">Work In Metaverse</a>
        </li>
        {!isConnected && (
          <li className="item button">
            <a href="#">Sign In</a>
          </li>
        )}
        <li className="item button secondary">
          {isConnected ? (
            <NavLink
              to="register-asset"
              title="Create Asset"
              style="secondary"
            />
          ) : (
            <NavLink to="register-user" title="Register" style="secondary" />
          )}
        </li>
        <li className="toggle">
          <a href="#">
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
