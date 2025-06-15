import { useEffect, useState } from "react";
import demandesService from "../services/demandesService";

export default function AdminDemandesPage() {
  const [demandes, setDemandes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDemandes() {
      try {
        const data = await demandesService.getAll();
        setDemandes(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }
    fetchDemandes();
  }, []);

  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Liste des demandes de formation</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Employé</th><th>Statut</th><th>Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.employeNom}</td>
              <td>{d.statut}</td>
              <td>{new Date(d.dateDemande).toLocaleDateString()}</td>
              <td>
                {/* Boutons modifier/supprimer */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
