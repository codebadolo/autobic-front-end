import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white p-4 flex gap-4">
      <Link to="/">Dashboard</Link>
      <Link to="/cours">Cours</Link>
      <Link to="/sessions">Sessions</Link>
      <Link to="/employes">Employés</Link>
      <Link to="/participants">Participants</Link>
      <Link to="/demandes">Demandes</Link>
      {/* Ajoute les autres liens selon besoin */}
    </nav>
  );
}
