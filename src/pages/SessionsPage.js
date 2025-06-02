import React, { useMemo, useState } from "react";
import { MdArrowBack, MdArrowForward, MdDelete, MdEdit, MdFilterList, MdPeople, MdSearch } from "react-icons/md";
import { sessionsList } from "../mocks/sessions";
import "./SessionsPage.css";

// Récupère tous les cours, organismes et lieux uniques pour les filtres
const cours = ["Tous", ...Array.from(new Set(sessionsList.map(s => s.coursLibelle)))];
const organismes = ["Tous", ...Array.from(new Set(sessionsList.map(s => s.organisme)))];
const lieux = ["Tous", ...Array.from(new Set(sessionsList.map(s => s.lieu)))];

const PAGE_SIZE = 7;

export default function SessionsPage({ sidebarCollapsed }) {
  const [search, setSearch] = useState("");
  const [coursFiltre, setCoursFiltre] = useState("Tous");
  const [organisme, setOrganisme] = useState("Tous");
  const [lieu, setLieu] = useState("Tous");
  const [page, setPage] = useState(1);

  // Filtrage et recherche
  const filtered = useMemo(() => {
    return sessionsList.filter(s =>
      (coursFiltre === "Tous" || s.coursLibelle === coursFiltre) &&
      (organisme === "Tous" || s.organisme === organisme) &&
      (lieu === "Tous" || s.lieu === lieu) &&
      (
        s.idSession.toString().includes(search.toLowerCase()) ||
        s.coursReference.toLowerCase().includes(search.toLowerCase()) ||
        s.coursLibelle.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, coursFiltre, organisme, lieu]);

  // Pagination
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Pour reset la page si filtre change
  React.useEffect(() => { setPage(1); }, [search, coursFiltre, organisme, lieu]);

  return (
    <div className={`sessions-page${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="sessions-header">
        <h2>Liste des Sessions</h2>
        <button className="btn-add">+ Ajouter une session</button>
      </div>
      <div className="sessions-filters">
        <div className="input-search">
          <MdSearch />
          <input
            type="text"
            placeholder="Rechercher par référence ou libellé"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="select-filters">
          <label><MdFilterList /> Cours</label>
          <select value={coursFiltre} onChange={e => setCoursFiltre(e.target.value)}>
            {cours.map(c => <option key={c}>{c}</option>)}
          </select>
          <label>Organisme</label>
          <select value={organisme} onChange={e => setOrganisme(e.target.value)}>
            {organismes.map(o => <option key={o}>{o}</option>)}
          </select>
          <label>Lieu</label>
          <select value={lieu} onChange={e => setLieu(e.target.value)}>
            {lieux.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="sessions-table-container">
        <table className="sessions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Référence</th>
              <th>Cours</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Heures</th>
              <th>Places</th>
              <th>Participants</th>
              <th>Organisme</th>
              <th>Lieu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={11} style={{ textAlign: "center", color: "#888" }}>Aucune session trouvée.</td>
              </tr>
            ) : (
              paged.map((session) => (
                <tr key={session.idSession}>
                  <td>{session.idSession}</td>
                  <td>{session.coursReference}</td>
                  <td>{session.coursLibelle}</td>
                  <td>{session.dateDebut}</td>
                  <td>{session.dateFin}</td>
                  <td>{session.nbHeuresCours}</td>
                  <td>{session.nbPlacesMax}</td>
                  <td>
                    <span className={`badge ${session.participants === session.nbPlacesMax ? 'badge-complet' : 'badge-places'}`}>
                      {session.participants} / {session.nbPlacesMax}
                      <MdPeople className="icon-small" />
                    </span>
                  </td>
                  <td>{session.organisme}</td>
                  <td>{session.lieu}</td>
                  <td>
                    <button className="btn-action edit" title="Modifier">
                      <MdEdit />
                    </button>
                    <button className="btn-action delete" title="Supprimer">
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn-page"
        >
          <MdArrowBack />
        </button>
        <span>Page {page} / {pageCount}</span>
        <button
          disabled={page === pageCount}
          onClick={() => setPage(page + 1)}
          className="btn-page"
        >
          <MdArrowForward />
        </button>
      </div>
    </div>
  );
}
