import {
  MdAccountBalance, MdAttachMoney, MdBusiness, MdDashboard, MdEvent,
  MdMenuBook, MdPeople, MdRequestQuote, MdSecurity
} from "react-icons/md";

export const sidebarMenus = {
  EMPLOYE: [
    { to: "/", label: "Dashboard", icon: MdDashboard },
    { to: "/demande-formation", label: "Demande Formation", icon: MdRequestQuote },
    { to: "/mes-demandes", label: "Mes Demandes", icon: MdRequestQuote },
    { to: "/mes-sessions", label: "Mes Sessions", icon: MdEvent },
  ],
  RESPONSABLE: [
    { to: "/", label: "Dashboard", icon: MdDashboard },
    { to: "/demandes-departement", label: "Demandes Dépt.", icon: MdRequestQuote },
    { to: "/plan-formation", label: "Plan Formation", icon: MdMenuBook },
    { to: "/employes", label: "Employés", icon: MdPeople },
  ],
  DIRECTEUR: [
    { to: "/", label: "Dashboard", icon: MdDashboard },
    { to: "/toutes-demandes", label: "Toutes les demandes", icon: MdRequestQuote },
    { to: "/plan-formation", label: "Plan Formation", icon: MdMenuBook },
    { to: "/departements", label: "Départements", icon: MdBusiness },
    { to: "/budget", label: "Budgets", icon: MdAccountBalance },
  ],
  ORGANISME: [
    { to: "/", label: "Dashboard", icon: MdDashboard },
    { to: "/sessions-organisme", label: "Mes Sessions", icon: MdEvent },
    { to: "/participants-session", label: "Participants", icon: MdPeople },
    { to: "/factures", label: "Factures", icon: MdAttachMoney },
  ],
  ADMIN: [
    { to: "/", label: "Dashboard", icon: MdDashboard },
    { to: "/admin/add-user", label: "Créer Utilisateur", icon: MdPeople },
  
    { to: "/cours", label: "Cours", icon: MdMenuBook },
    { to: "/sessions", label: "Sessions", icon: MdEvent },
    { to: "/employes", label: "Employés", icon: MdPeople },
    { to: "/participants", label: "Participants", icon: MdPeople },
    { to: "/demandes", label: "Demandes", icon: MdRequestQuote },
    { to: "/factures", label: "Factures", icon: MdAttachMoney },
    { to: "/departements", label: "Départements", icon: MdBusiness },
    { to: "/budget", label: "Budgets", icon: MdAccountBalance },
    { to: "/securite", label: "Sécurité", icon: MdSecurity },
  ]
};
