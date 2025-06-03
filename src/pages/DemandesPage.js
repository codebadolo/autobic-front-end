import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { MdDelete, MdEdit, MdFilterList, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import "./DemandesPage.css";
function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

function DemandeForm({ initial, onSubmit, onCancel, employes }) {
  const [form, setForm] = useState(initial || {
    dateDemande: "",
    dateSouhaiteeDebut: "",
    dureeJours: "",
    observations: "",
    statut: "",
    employe: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.employe) {
      alert("Veuillez sélectionner un employé.");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="demande-form">
      <label>Date de demande</label>
      <input type="date" name="dateDemande" value={form.dateDemande} onChange={handleChange} required />

      <label>Date souhaitée début</label>
      <input type="date" name="dateSouhaiteeDebut" value={form.dateSouhaiteeDebut} onChange={handleChange} required />

      <label>Durée (jours)</label>
      <input type="number" name="dureeJours" value={form.dureeJours} onChange={handleChange} required min="1" />

      <label>Observations</label>
      <textarea name="observations" value={form.observations} onChange={handleChange} />

      <label>Statut</label>
      <select name="statut" value={form.statut} onChange={handleChange} required>
        <option value="">-- Choisir --</option>
        <option value="EN_ATTENTE">En attente</option>
        <option value="VALIDEE">Validée</option>
        <option value="REFUSEE">Refusée</option>
      </select>

      <label>Employé</label>
      <select name="employe" value={form.employe} onChange={handleChange} required>
        <option value="">-- Sélectionner un employé --</option>
        {employes.map(emp => (
          <option key={emp.matricule} value={emp.matricule}>
            {emp.nom} {emp.prenom} ({emp.matricule})
          </option>
        ))}
      </select>

      <div className="form-actions">
        <button type="submit">Enregistrer</button>
        <button type="button" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}

export default function DemandesPage({ sidebarCollapsed }) {
  const [demandes, setDemandes] = useState([]);
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [statut, setStatut] = useState("Tous");

  const [showModal, setShowModal] = useState(false);
  const [editDemande, setEditDemande] = useState(null);

  // Charger les demandes et employés au montage
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("http://localhost:8080/api/demandes-formation"),
      axios.get("http://localhost:8080/api/employes")
    ])
      .then(([demandesRes, employesRes]) => {
        setDemandes(demandesRes.data);
        setEmployes(employesRes.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Erreur lors du chargement des données");
        setLoading(false);
        console.error(err);
      });
  }, []);

  // Liste des statuts pour filtre
  const statuts = useMemo(() => {
    const uniqueStatuts = Array.from(new Set(demandes.map(d => d.statut)));
    return ["Tous", ...uniqueStatuts];
  }, [demandes]);

  // Filtrage des demandes selon recherche et statut
  const filtered = useMemo(() => {
    return demandes.filter(d =>
      (statut === "Tous" || d.statut === statut) &&
      (
        (d.employe?.nom?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (d.employe?.prenom?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (d.observations?.toLowerCase() || "").includes(search.toLowerCase())
      )
    );
  }, [demandes, search, statut]);

  // Ajouter une demande
  const handleAdd = (form) => {
    // Trouver l'objet employé complet
    const empObj = employes.find(e => e.matricule === form.employe);
    const payload = {
      ...form,
      employe: empObj || null
    };
    axios.post("http://localhost:8080/api/demandes-formation", payload)
      .then(res => {
        setDemandes(prev => [...prev, res.data]);
        setShowModal(false);
      })
      .catch(() => alert("Erreur lors de l'ajout"));
  };

  // Modifier une demande
  const handleEdit = (form) => {
    const empObj = employes.find(e => e.matricule === form.employe);
    const payload = {
      ...form,
      employe: empObj || null
    };
    axios.put(`http://localhost:8080/api/demandes-formation/${form.idDemande}`, payload)
      .then(res => {
        setDemandes(prev => prev.map(d => d.idDemande === form.idDemande ? res.data : d));
        setEditDemande(null);
        setShowModal(false);
      })
      .catch(() => alert("Erreur lors de la modification"));
  };

  // Supprimer une demande
  const handleDelete = (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    axios.delete(`http://localhost:8080/api/demandes-formation/${id}`)
      .then(() => {
        setDemandes(prev => prev.filter(d => d.idDemande !== id));
      })
      .catch(() => alert("Erreur lors de la suppression"));
  };

  // Ouvrir modal pour modification
  const openEditModal = (demande) => {
    setEditDemande({
      ...demande,
      employe: demande.employe?.matricule || ""
    });
    setShowModal(true);
  };

  // Ouvrir modal pour ajout
  const openAddModal = () => {
    setEditDemande(null);
    setShowModal(true);
  };

  return (
    <div className={`demandes-page${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="demandes-header">
        <h2>Demandes de formation</h2>
        <button className="btn-add" onClick={openAddModal}>+ Nouvelle demande</button>
      </div>

      <div className="demandes-filters">
        <div className="input-search">
          <MdSearch />
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou observations"
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
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <table className="demandes-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Matricule</th>
                <th>Nom</th>
                <th>Prénom</th>
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
                  <td colSpan={9} style={{ textAlign: "center", color: "#888" }}>Aucune demande trouvée.</td>
                </tr>
              ) : (
                filtered.map(d => (
                  <tr key={d.idDemande}>
                    <td>{d.idDemande}</td>
                    <td>{d.employe?.matricule || "—"}</td>
                    <td>{d.employe?.nom || "—"}</td>
                    <td>{d.employe?.prenom || "—"}</td>
                    <td>{d.dateDemande?.slice(0,10)}</td>
                    <td>{d.dateSouhaiteeDebut?.slice(0,10)}</td>
                    <td>{d.dureeJours} j</td>
                    <td>
                      <span className={`badge badge-${d.statut.toLowerCase()}`}>{d.statut}</span>
                    </td>
                    <td>
                      <button className="btn-action edit" title="Modifier" onClick={() => openEditModal(d)}><MdEdit /></button>
                      <button className="btn-action delete" title="Supprimer" onClick={() => handleDelete(d.idDemande)}><MdDelete /></button>
                        <Link to={`/demandes-formation/${d.idDemande}`} style={{ color: "#003366", textDecoration: "underline" }}>
    {d.idDemande}
  </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>{editDemande ? `Modifier la demande #${editDemande.idDemande}` : "Nouvelle demande de formation"}</h3>
          <DemandeForm
            initial={editDemande}
            onSubmit={editDemande ? handleEdit : handleAdd}
            onCancel={() => setShowModal(false)}
            employes={employes}
          />
        </Modal>
      )}
    </div>
  );
}
