import { Link } from "react-router-dom";

function DashboardOrganisme() {
  return (
    <div>
      <h2>Espace Organisme de Formation</h2>
      <ul>
        <li><Link to="/sessions-organisme">Voir les sessions à animer</Link></li>
        <li><Link to="/participants-session">Voir la liste des participants</Link></li>
      </ul>
    </div>
  );
}

export default DashboardOrganisme;
