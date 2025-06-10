// src/components/Sidebar.js
import {
  MdChevronLeft, MdMenu
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { sidebarMenus } from "../config/sidebarConfig";
import "./Sidebar.css";

export default function Sidebar({ collapsed, onToggle }) {
  const { pathname } = useLocation();
  const role = localStorage.getItem("role") || "EMPLOYE"; // fallback pour dev

  const menus = sidebarMenus[role] || sidebarMenus["EMPLOYE"]; // fallback

  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <button className="sidebar-toggle" onClick={onToggle}>
        {collapsed ? <MdMenu /> : <MdChevronLeft />}
      </button>
      {!collapsed && (
        <div className="sidebar-header">
          <img src="https://ui-avatars.com/api/?name=AUTOBIC&background=003366&color=fff"
               alt="AUTOBIC" className="sidebar-avatar" />
          <div className="sidebar-title">AUTOBIC</div>
        </div>
      )}
      <nav>
        {menus.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} className={pathname === to ? "active" : ""}>
            <Icon className="icon" /> {!collapsed && label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
