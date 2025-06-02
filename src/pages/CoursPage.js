import React, { useMemo, useState } from "react";
import { MdArrowBack, MdArrowForward, MdDelete, MdEdit, MdFilterList, MdSearch } from "react-icons/md";
import { coursList } from "../mocks/cours";
import "./CoursPage.css";

// Récupère tous les domaines et organismes uniques pour les filtres
const domaines = ["Tous", ...Array.from(new Set(coursList.map(c => c.domaine)))];
const organismes = ["Tous", ...Array.from(new Set(coursList.map(c => c.organisme)))];
const lieux = ["Tous", ...Array.from(new Set(coursList.map(c => c.lieu)))];

const PAGE_SIZE = 7;

export default function CoursPage() {
  const [search, setSearch] = useState("");
  const [domaine, setDomaine] = useState("Tous");
  const [organisme, setOrganisme] = useState("Tous");
  const [lieu, setLieu] = useState("Tous");
  const [page, setPage] = useState(1);

  // Filtrage et recherche
  const filtered = useMemo(() => {
    return coursList.filter(c =>
      (domaine === "Tous" || c.domaine === domaine) &&
      (organisme === "Tous" || c.organisme === organisme) &&
      (lieu === "Tous" || c.lieu === lieu) &&
      (
        c.reference.toLowerCase().includes(search.toLowerCase()) ||
        c.libelle.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, domaine, organisme, lieu]);

  // Pagination
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Pour reset la page si filtre change
  React.useEffect(() => { setPage(1); }, [search, domaine, organisme, lieu]);

  return (
    <div className="cours-page">
      <div className="cours-header">
        <h2>Liste des Cours</h2>
        <button className="btn-add">+ Ajouter un cours</button>
      </div>
      <div className="cours-filters">
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
          <label><MdFilterList /> Domaine</label>
          <select value={domaine} onChange={e => setDomaine(e.target.value)}>
            {domaines.map(d => <option key={d}>{d}</option>)}
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
      <div className="cours-table-container">
        <table className="cours-table">
          <thead>
            <tr>
              <th>Référence</th>
              <th>Libellé</th>
              <th>Domaine</th>
              <th>Jours</th>
              <th>Prix/participant</th>
              <th>Organisme</th>
              <th>Lieu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", color: "#888" }}>Aucun cours trouvé.</td>
              </tr>
            ) : (
              paged.map((cours) => (
                <tr key={cours.reference}>
                  <td>{cours.reference}</td>
                  <td>{cours.libelle}</td>
                  <td>
                    <span className={`badge badge-${cours.domaine.toLowerCase()}`}>
                      {cours.domaine}
                    </span>
                  </td>
                  <td>{cours.nombreJours}</td>
                  <td>
                    <span className="prix">{cours.prixParParticipant.toLocaleString()} F CFA</span>
                  </td>
                  <td>{cours.organisme}</td>
                  <td>{cours.lieu}</td>
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
