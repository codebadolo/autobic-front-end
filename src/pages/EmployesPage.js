import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { MdDelete, MdEdit, MdFilterList, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./EmployesPage.css";
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

function formatDateForInput(dateString) {
  if (!dateString) return "";
  return dateString.slice(0, 10);
}

function EmployeForm({ initial, departements, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || {
    matricule: "",
    nom: "",
    prenom: "",
    sexe: "",
    dateNaissance: "",
    categorie: "",
    dateEntree: "",
    qualification: "",
    departement: "" // idDept en string
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="employes-form">
      <label>Matricule</label>
      <input name="matricule" value={form.matricule} onChange={handleChange} required disabled={!!initial} />

      <label>Nom</label>
      <input name="nom" value={form.nom} onChange={handleChange} required />

      <label>Prénom</label>
      <input name="prenom" value={form.prenom} onChange={handleChange} required />

      <label>Sexe</label>
      <select name="sexe" value={form.sexe} onChange={handleChange} required>
        <option value="">--</option>
        <option value="M">M</option>
        <option value="F">F</option>
      </select>

      <label>Date Naissance</label>
      <input name="dateNaissance" type="date" value={form.dateNaissance} onChange={handleChange} required />

      <label>Catégorie</label>
      <input name="categorie" value={form.categorie} onChange={handleChange} />

      <label>Date d'entrée</label>
      <input name="dateEntree" type="date" value={form.dateEntree} onChange={handleChange} />

      <label>Qualification</label>
      <input name="qualification" value={form.qualification} onChange={handleChange} />

      <label>Département</label>
      <select name="departement" value={form.departement} onChange={handleChange} required>
        <option value="">-- Sélectionnez un département --</option>
        {Array.isArray(departements) && departements.map(dep => (
          <option key={dep.idDept} value={dep.idDept}>{dep.nomDept}</option>
        ))}
      </select>

      <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button type="submit">Enregistrer</button>
        <button type="button" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}

export default function EmployesPage({ sidebarCollapsed }) {
  const [employes, setEmployes] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [departementFilter, setDepartementFilter] = useState("Tous");

  const [showAddModal, setShowAddModal] = useState(false);
  const [editEmploye, setEditEmploye] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeToDelete, setEmployeToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("http://localhost:8080/api/employes"),
      axios.get("http://localhost:8080/api/departements")
    ])
      .then(([empRes, depRes]) => {
        setEmployes(empRes.data);
        setDepartements(Array.isArray(depRes.data) ? depRes.data : []);
        setLoading(false);
      })
      .catch(err => {
        setError("Erreur lors du chargement des employés ou départements");
        console.error(err);
        setLoading(false);
      });
  }, []);

  const departementOptions = ["Tous", ...departements.map(d => d.nomDept)];

  const filtered = useMemo(() => {
    const searchLower = (search || "").toLowerCase();
    return employes.filter(e =>
      (departementFilter === "Tous" || (e.departement && e.departement.nomDept === departementFilter)) &&
      (
        (e.nom?.toLowerCase() || "").includes(searchLower) ||
        (e.prenom?.toLowerCase() || "").includes(searchLower) ||
        (e.matricule?.toLowerCase() || "").includes(searchLower)
      )
    );
  }, [employes, search, departementFilter]);

  const handleAdd = (form) => {
    const depObj = departements.find(d => d.idDept === parseInt(form.departement));
    const payload = {
      ...form,
      departement: depObj ? { idDept: depObj.idDept } : null
    };
    axios.post("http://localhost:8080/api/employes", payload)
      .then(res => {
        setEmployes(prev => [...prev, { ...res.data, departement: depObj }]);
        setShowAddModal(false);
      })
      .catch(() => alert("Erreur lors de l'ajout"));
  };

  const handleEdit = (form) => {
    const depObj = departements.find(d => d.idDept === parseInt(form.departement));
    const payload = {
      ...form,
      departement: depObj ? { idDept: depObj.idDept } : null
    };
    axios.put(`http://localhost:8080/api/employes/${form.matricule}`, payload)
      .then(res => {
        setEmployes(prev => prev.map(e => e.matricule === form.matricule ? { ...res.data, departement: depObj } : e));
        setEditEmploye(null);
      })
      .catch(() => alert("Erreur lors de la modification"));
  };

  const confirmDelete = (employe) => {
    setEmployeToDelete(employe);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (!employeToDelete) return;
    axios.delete(`http://localhost:8080/api/employes/${employeToDelete.matricule}`)
      .then(() => {
        setEmployes(prev => prev.filter(e => e.matricule !== employeToDelete.matricule));
        setShowDeleteModal(false);
        setEmployeToDelete(null);
      })
      .catch(() => alert("Erreur lors de la suppression"));
  };

  const openEditModal = (employe) => {
    setEditEmploye({
      ...employe,
      dateNaissance: formatDateForInput(employe.dateNaissance),
      dateEntree: formatDateForInput(employe.dateEntree),
      departement: employe.departement?.idDept ? employe.departement.idDept.toString() : ""
    });
  };

  return (
    <div className={`employes-page${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="employes-header">
        <h2>Liste des Employés</h2>
        <button className="btn-add" onClick={() => setShowAddModal(true)}>+ Ajouter un employé</button>
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
          <select value={departementFilter} onChange={e => setDepartementFilter(e.target.value)}>
            {departementOptions.map(d => <option key={d}>{d}</option>)}
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
            {loading ? (
              <tr>
                <td colSpan={10} style={{ textAlign: "center" }}>Chargement...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={10} style={{ color: "red", textAlign: "center" }}>{error}</td>
              </tr>
            ) : filtered.length === 0 ? (
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
                  <td>{formatDateForInput(e.dateNaissance)}</td>
                  <td>{e.categorie}</td>
                  <td>{formatDateForInput(e.dateEntree)}</td>
                  <td>{e.qualification}</td>
                  <td>{e.departement?.nomDept || "—"}</td>
                  <td>
                    <button className="btn-action edit" title="Modifier" onClick={() => openEditModal(e)}><MdEdit /></button>
                    <button className="btn-action delete" title="Supprimer" onClick={() => confirmDelete(e)}><MdDelete /></button>
                      <button onClick={() => navigate(`/employes/${e.matricule}`)}>Voir détail</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal ajout */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <h3>Ajouter un employé</h3>
          <EmployeForm departements={departements} onSubmit={handleAdd} onCancel={() => setShowAddModal(false)} />
        </Modal>
      )}

      {/* Modal modification */}
      {editEmploye && (
        <Modal onClose={() => setEditEmploye(null)}>
          <h3>Modifier l'employé {editEmploye.matricule}</h3>
          <EmployeForm
            initial={editEmploye}
            departements={departements}
            onSubmit={handleEdit}
            onCancel={() => setEditEmploye(null)}
          />
        </Modal>
      )}

      {/* Modal suppression */}
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <h3>Confirmer la suppression</h3>
          <p style={{ textAlign: "center" }}>
            Voulez-vous vraiment supprimer l'employé <b>{employeToDelete?.matricule}</b> ?
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20 }}>
            <button
              style={{ backgroundColor: "#ff4136", color: "white", padding: "8px 24px", borderRadius: 6, border: "none", cursor: "pointer" }}
              onClick={handleDelete}
            >
              Supprimer
            </button>
            <button
              style={{ backgroundColor: "#f4f6f8", color: "#003366", padding: "8px 24px", borderRadius: 6, border: "none", cursor: "pointer" }}
              onClick={() => setShowDeleteModal(false)}
            >
              Annuler
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
