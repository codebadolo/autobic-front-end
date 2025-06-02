import { useMemo, useState } from "react";
import { MdDelete, MdEdit, MdFilterList, MdSearch } from "react-icons/md";
import { demandesList } from "../mocks/demandes";
import "./DemandesPage.css";

const statuts = ["Tous", ...Array.from(new Set(demandesList.map(d => d.statut)))];

export default function DemandesPage({ sidebarCollapsed }) {
  const [search, setSearch] = useState("");
  const [statut, setStatut] = useState("Tous");

  const filtered = useMemo(() => {
    return demandesList.filter(d =>
      (statut === "Tous" || d.statut === statut) &&
      (
        d.nom.toLowerCase().includes(search.toLowerCase()) ||
        d.prenom.toLowerCase().includes(search.toLowerCase()) ||
        d.stage.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, statut]);

  return (
    <div className={`demandes-page${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="demandes-header">
        <h2>Demandes de formation</h2>
        <button className="btn-add">+ Nouvelle demande</button>
      </div>
      <div className="demandes-filters">
        <div className="input-search">
          <MdSearch />
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou stage"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="select-filters">
          <label><MdFilterList /> Statut</label>
          <select value={statut} onChange={e => setStatut(e.target.value)}>
            {statuts.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="demandes-table-container">
        <table className="demandes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Stage</th>
              <th>Date demande</th>
              <th>Date souhaitée</th>
              <th>Durée</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: "center", color: "#888" }}>Aucune demande trouvée.</td>
              </tr>
            ) : (
              filtered.map(d => (
                <tr key={d.idDemande}>
                  <td>{d.idDemande}</td>
                  <td>{d.matricule}</td>
                  <td>{d.nom}</td>
                  <td>{d.prenom}</td>
                  <td>{d.stage}</td>
                  <td>{d.dateDemande}</td>
                  <td>{d.dateSouhaiteeDebut}</td>
                  <td>{d.dureeJours} j</td>
                  <td>
                    <span className={`badge badge-${d.statut.toLowerCase()}`}>{d.statut}</span>
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
