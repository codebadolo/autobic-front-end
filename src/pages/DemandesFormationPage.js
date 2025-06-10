import { useState } from "react";
import DemandeModal from "./DemandeModal";
import "./DemandesFormationPage.css"; // À créer, voir ci-dessous

const demandesFictives = [
  {
    idDemande: 1,
    nom: "ILBOUDO",
    prenom: "Jacques",
    stage: "Conception des SI",
    dateDemande: "2024-06-01",
    statut: "EN_ATTENTE"
  },
  // ...autres demandes
];

export default function DemandesFormationPage({ sidebarCollapsed }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);

  const openModal = demande => {
    setSelectedDemande(demande);
    setModalOpen(true);
  };

  return (
    <div className={`demandes-page${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="demandes-header">
        <h2>Liste des demandes de formation</h2>
      </div>
      <div className="demandes-table-container">
        <table className="demandes-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Stage</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {demandesFictives.map(demande => (
              <tr key={demande.idDemande}>
                <td>{demande.nom}</td>
                <td>{demande.prenom}</td>
                <td>{demande.stage}</td>
                <td>{demande.dateDemande}</td>
                <td>
                  <span className={`badge badge-${demande.statut.toLowerCase()}`}>
                    {demande.statut.replace("_", " ")}
                  </span>
                </td>
                <td>
                  <button className="btn-action" onClick={() => openModal(demande)}>
                    Voir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <DemandeModal demande={selectedDemande} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
