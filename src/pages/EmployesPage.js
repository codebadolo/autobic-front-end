import { useMemo, useState } from "react";
import { MdDelete, MdEdit, MdFilterList, MdSearch } from "react-icons/md";
import { employesList } from "../mocks/employes";
import "./EmployesPage.css";

const departements = ["Tous", ...Array.from(new Set(employesList.map(e => e.departement)))];

export default function EmployesPage({ sidebarCollapsed }) {
  const [search, setSearch] = useState("");
  const [departement, setDepartement] = useState("Tous");

  const filtered = useMemo(() => {
    return employesList.filter(e =>
      (departement === "Tous" || e.departement === departement) &&
      (
        e.nom.toLowerCase().includes(search.toLowerCase()) ||
        e.prenom.toLowerCase().includes(search.toLowerCase()) ||
        e.matricule.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, departement]);

  return (
    <div className={`employes-page${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="employes-header">
        <h2>Liste des Employés</h2>
        <button className="btn-add">+ Ajouter un employé</button>
      </div>
      <div className="employes-filters">
        <div className="input-search">
          <MdSearch />
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou matricule"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="select-filters">
          <label><MdFilterList /> Département</label>
          <select value={departement} onChange={e => setDepartement(e.target.value)}>
            {departements.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>
      <div className="employes-table-container">
        <table className="employes-table">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Sexe</th>
              <th>Date Naissance</th>
              <th>Catégorie</th>
              <th>Date d'entrée</th>
              <th>Qualification</th>
              <th>Département</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: "center", color: "#888" }}>Aucun employé trouvé.</td>
              </tr>
            ) : (
              filtered.map(e => (
                <tr key={e.matricule}>
                  <td>{e.matricule}</td>
                  <td>{e.nom}</td>
                  <td>{e.prenom}</td>
                  <td>{e.sexe}</td>
                  <td>{e.dateNaissance}</td>
                  <td>{e.categorie}</td>
                  <td>{e.dateEntree}</td>
                  <td>{e.qualification}</td>
                  <td>{e.departement}</td>
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
