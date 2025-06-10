import { Link } from "react-router-dom";

function DashboardResponsable() {
  return (
    <div>
      <h2>Espace Responsable</h2>
      <ul>
        <li><Link to="/demandes-departement">Valider les demandes de mon département</Link></li>
        <li><Link to="/plan-formation">Voir le plan de formation</Link></li>
      </ul>
    </div>
  );
}

export default DashboardResponsable;
