import { MdAccountCircle, MdNotifications } from "react-icons/md";
import "./Topbar.css";

export default function Topbar({ sidebarCollapsed }) {
  return (
    <header className={`topbar${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="topbar-title">Bienvenue sur la plateforme de formation AUTOBIC</div>
      <div className="topbar-actions">
        <button className="topbar-btn" title="Notifications">
          <MdNotifications />
          <span className="notif-dot"></span>
        </button>
        <button className="topbar-btn" title="Profil">
          <MdAccountCircle />
        </button>
      </div>
    </header>
  );
}
