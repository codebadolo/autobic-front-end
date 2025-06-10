import DashboardAdmin from "./DashboardAdmin";
import DashboardDirecteur from "./DashboardDirecteur";
import DashboardEmploye from "./DashboardEmploye";
import DashboardOrganisme from "./DashboardOrganisme";
import DashboardResponsable from "./DashboardResponsable";

function Dashboard() {
  const role = localStorage.getItem("role");

  switch (role) {
    case "EMPLOYE":
      return <DashboardEmploye />;
    case "RESPONSABLE":
      return <DashboardResponsable />;
    case "DIRECTEUR":
      return <DashboardDirecteur />;
    case "ORGANISME":
      return <DashboardOrganisme />;
    case "ADMIN":
      return <DashboardAdmin />;
    default:
      return <div>Rôle inconnu ou non autorisé.</div>;
  }
}

export default Dashboard;
