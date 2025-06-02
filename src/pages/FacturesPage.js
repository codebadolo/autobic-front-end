import { useMemo, useState } from "react";
import { MdDelete, MdEdit, MdReceipt, MdSearch } from "react-icons/md";
import { facturesList } from "../mocks/factures";
import "./FacturesPage.css";

export default function FacturesPage({ sidebarCollapsed }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return facturesList.filter(f =>
      f.organisme.toLowerCase().includes(search.toLowerCase()) ||
      f.details.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className={`factures-page${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="factures-header">
        <h2>Factures</h2>
        <button className="btn-add">+ Nouvelle facture</button>
      </div>
      <div className="factures-filters">
        <div className="input-search">
          <MdSearch />
          <input
            type="text"
            placeholder="Rechercher par organisme ou détail"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="factures-table-container">
        <table className="factures-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Organisme</th>
              <th>Type envoi</th>
              <th>Montant total</th>
              <th>Détails</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", color: "#888" }}>Aucune facture trouvée.</td>
              </tr>
            ) : (
              filtered.map(f => (
                <tr key={f.idFacture}>
                  <td>{f.idFacture}</td>
                  <td>{f.dateEmission}</td>
                  <td>{f.organisme}</td>
                  <td>{f.typeEnvoi}</td>
                  <td>{f.montantTotal.toLocaleString()} F CFA</td>
                  <td>
                    <details>
                      <summary><MdReceipt /> Voir</summary>
                      <ul>
                        {f.cours.map(c => (
                          <li key={c.reference}>
                            {c.reference} ({c.date}) — {c.participants} participants — {c.cout.toLocaleString()} F CFA
                          </li>
                        ))}
                      </ul>
                    </details>
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
