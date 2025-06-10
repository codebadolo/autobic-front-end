import { Link } from "react-router-dom";

function DashboardDirecteur() {
  return (
    <div>
      <h2>Espace Directeur</h2>
      <ul>
        <li><Link to="/toutes-demandes">Voir toutes les demandes</Link></li>
        <li><Link to="/decisions">Donner une décision finale</Link></li>
        <li><Link to="/plan-formation">Voir le plan de formation</Link></li>
      </ul>
    </div>
  );
}

export default DashboardDirecteur;
