import { Link } from "react-router-dom";

function DashboardEmploye() {
  return (
    <div>
      <h2>Bienvenue sur votre espace Employé</h2>
      <ul>
        <li><Link to="/demande-formation">Faire une demande de formation</Link></li>
        <li><Link to="/mes-demandes">Voir mes demandes</Link></li>
        <li><Link to="/mes-sessions">Mes sessions de formation</Link></li>
      </ul>
    </div>
  );
}

export default DashboardEmploye;
