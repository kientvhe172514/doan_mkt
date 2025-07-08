import React from "react";
import Link from "next/link";
import { mobile_menu } from "@/data/menu-data";

const MobileMenus = () => {
  return (
    <nav className="tp-main-menu-content">
      <ul>
        {mobile_menu.map((menu, i) => {
          return (
            <li key={i}>
              <Link href={menu.link}>
                {menu.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileMenus;
