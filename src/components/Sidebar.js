import {
  MdAccountBalance, MdAttachMoney,
  MdBusiness,
  MdChevronLeft,
  MdDashboard,
  MdEvent,
  MdMenu,
  MdMenuBook,
  MdPeople, MdRequestQuote,
  MdSecurity
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ collapsed, onToggle }) {
  const { pathname } = useLocation();
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
        <Link to="/" className={pathname === "/" ? "active" : ""}>
          <MdDashboard className="icon" /> {!collapsed && "Dashboard"}
        </Link>
        <Link to="/cours" className={pathname === "/cours" ? "active" : ""}>
          <MdMenuBook className="icon" /> {!collapsed && "Cours"}
        </Link>
        <Link to="/sessions" className={pathname === "/sessions" ? "active" : ""}>
          <MdEvent className="icon" /> {!collapsed && "Sessions"}
        </Link>
        <Link to="/employes" className={pathname === "/employes" ? "active" : ""}>
          <MdPeople className="icon" /> {!collapsed && "Employés"}
        </Link>
        <Link to="/participants" className={pathname === "/participants" ? "active" : ""}>
          <MdPeople className="icon" /> {!collapsed && "Participants"}
        </Link>
        <Link to="/demandes" className={pathname === "/demandes" ? "active" : ""}>
          <MdRequestQuote className="icon" /> {!collapsed && "Demandes"}
        </Link>
        <Link to="/factures" className={pathname === "/factures" ? "active" : ""}>
          <MdAttachMoney className="icon" /> {!collapsed && "Factures"}
        </Link>
        <Link to="/departements" className={pathname === "/departements" ? "active" : ""}>
          <MdBusiness className="icon" /> {!collapsed && "Départements"}
        </Link>
        <Link to="/budget" className={pathname === "/budget" ? "active" : ""}>
          <MdAccountBalance className="icon" /> {!collapsed && "Budgets"}
        </Link>
        <Link to="/securite" className={pathname === "/securite" ? "active" : ""}>
          <MdSecurity className="icon" /> {!collapsed && "Sécurité"}
        </Link>
      </nav>
    </aside>
  );
}
