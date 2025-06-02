import { useMemo, useState } from "react";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import { participantsList } from "../mocks/participants";
import "./ParticipantsPage.css";

const statuts = ["Tous", ...Array.from(new Set(participantsList.map(p => p.statutParticipation)))];

export default function ParticipantsPage({ sidebarCollapsed }) {
  const [search, setSearch] = useState("");
  const [statut, setStatut] = useState("Tous");

  const filtered = useMemo(() => {
    return participantsList.filter(p =>
      (statut === "Tous" || p.statutParticipation === statut) &&
      (
        p.nom.toLowerCase().includes(search.toLowerCase()) ||
        p.prenom.toLowerCase().includes(search.toLowerCase()) ||
        p.cours.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, statut]);

  return (
    <div className={`participants-page${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="participants-header">
        <h2>Liste des Participants</h2>
        <button className="btn-add">+ Ajouter un participant</button>
      </div>
      <div className="participants-filters">
        <div className="input-search">
          <MdSearch />
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou cours"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="select-filters">
          <label>Statut</label>
          <select value={statut} onChange={e => setStatut(e.target.value)}>
            {statuts.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="participants-table-container">
        <table className="participants-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Cours</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#888" }}>Aucun participant trouvé.</td>
              </tr>
            ) : (
              filtered.map(p => (
                <tr key={p.idParticipant}>
                  <td>{p.idParticipant}</td>
                  <td>{p.nom}</td>
                  <td>{p.prenom}</td>
                  <td>{p.cours}</td>
                  <td>
                    <span className={`badge badge-${p.statutParticipation.toLowerCase()}`}>
                      {p.statutParticipation}
                    </span>
                  </td>
                  <td>
                    <button className="btn-action edit" title="Modifier"><MdEdit /></button>
                    <button className="btn-action delete" title="Supprimer"><MdDelete /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
