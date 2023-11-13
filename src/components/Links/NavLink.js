import Link from "next/link";
import React from "react";

const NavLink = ({ title, to, style }) => {
  return (
    <div className={`item button ${style ? style : ""}`}>
      <Link href={to ? to : "#"}>{title}</Link>
    </div>
  );
};

export default NavLink;
