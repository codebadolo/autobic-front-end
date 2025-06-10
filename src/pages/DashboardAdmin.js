import { Link } from "react-router-dom";

function DashboardAdmin() {
  return (
    <div>
      <h2>Espace Administration</h2>
      <ul>
        <li><Link to="/admin/add-user">Créer un utilisateur</Link></li>
        <li><Link to="/admin/utilisateurs">Gérer les utilisateurs</Link></li>
        <li><Link to="/admin/cours">Gérer les cours</Link></li>
        <li><Link to="/admin/departements">Gérer les départements</Link></li>
        <li><Link to="/admin/etat-budget">Voir l’état budgétaire</Link></li>
      </ul>
    </div>
  );
}

export default DashboardAdmin;
