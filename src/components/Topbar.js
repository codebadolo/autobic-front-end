import { MdAccountCircle, MdNotifications } from "react-icons/md";
import "./Topbar.css";

const roleLabels = {
  EMPLOYE: "Espace Employé",
  RESPONSABLE: "Espace Responsable",
  DIRECTEUR: "Espace Directeur",
  ORGANISME: "Espace Organisme de formation",
  ADMIN: "Espace Administration",
};

export default function Topbar({ sidebarCollapsed }) {
  // Récupère le rôle et le nom de l'utilisateur (si stocké)
  const role = localStorage.getItem("role") || "EMPLOYE";
  const username = localStorage.getItem("username") || "";

  // Tu peux ajouter ici d'autres infos utilisateur (nom, prénom...)

  // Exemple : badge de notification pour RESPONSABLE
  // (à remplacer par un vrai fetch ou via props/context)
  const pendingRequests = role === "RESPONSABLE" ? 3 : 0;

  return (
    <header className={`topbar${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="topbar-title">
        {roleLabels[role] ? `${roleLabels[role]} - AUTOBIC` : "Bienvenue sur la plateforme de formation AUTOBIC"}
      </div>
      <div className="topbar-actions">
        {/* Exemple : Badge de notification pour RESPONSABLE/DIRECTEUR */}
        {(role === "RESPONSABLE" || role === "DIRECTEUR") && (
          <button className="topbar-btn" title="Notifications">
            <MdNotifications />
            {pendingRequests > 0 && <span className="notif-dot">{pendingRequests}</span>}
          </button>
        )}
        {/* Profil utilisateur */}
        <button className="topbar-btn" title="Profil">
          <MdAccountCircle />
          {!sidebarCollapsed && (
            <span className="topbar-username">
              {username ? username : "Profil"}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
