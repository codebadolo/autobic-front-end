import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./DepartementsPage.css";

// Modal simple
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

// Formulaire pour ajout/modification
function DepartementForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || {
    nomDept: "",
    responsable: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="departements-form">
      <label>Nom du département</label>
      <input name="nomDept" value={form.nomDept} onChange={handleChange} required />
      <label>Responsable</label>
      <input name="responsable" value={form.responsable} onChange={handleChange} required />
      <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button type="submit">Enregistrer</button>
        <button type="button" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}

export default function DepartementsPage({ sidebarCollapsed }) {
  const [departements, setDepartements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editDep, setEditDep] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [depToDelete, setDepToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8080/api/departements")
      .then(res => {
        // Protection si res.data n'est pas un tableau
        if (Array.isArray(res.data)) {
          setDepartements(res.data);
        } else if (res.data && Array.isArray(res.data.data)) {
          setDepartements(res.data.data);
        } else {
          setDepartements([]);
          console.warn("Format inattendu des départements:", res.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des départements");
        setLoading(false);
      });
  }, []);

  const handleAdd = (form) => {
    axios.post("http://localhost:8080/api/departements", form)
      .then(res => {
        setDepartements(prev => [...prev, res.data]);
        setShowAddModal(false);
      })
      .catch(() => alert("Erreur lors de l'ajout"));
  };

  const handleEdit = (form) => {
    axios.put(`http://localhost:8080/api/departements/${editDep.idDept}`, form)
      .then(res => {
        setDepartements(prev => prev.map(d => d.idDept === editDep.idDept ? res.data : d));
        setEditDep(null);
      })
      .catch(() => alert("Erreur lors de la modification"));
  };

  const confirmDelete = (dep) => {
    setDepToDelete(dep);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (!depToDelete) return;
    axios.delete(`http://localhost:8080/api/departements/${depToDelete.idDept}`)
      .then(() => {
        setDepartements(prev => prev.filter(d => d.idDept !== depToDelete.idDept));
        setShowDeleteModal(false);
        setDepToDelete(null);
      })
      .catch(() => alert("Erreur lors de la suppression"));
  };

  return (
    <div className={`departements-page${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="departements-header">
        <h2>Départements</h2>
        <button className="btn-add" onClick={() => setShowAddModal(true)}>+ Ajouter un département</button>
      </div>
      <div className="departements-table-container">
        <table className="departements-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Responsable</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>Chargement...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} style={{ color: "red", textAlign: "center" }}>{error}</td>
              </tr>
            ) : departements.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", color: "#888" }}>Aucun département trouvé.</td>
              </tr>
            ) : (
              departements.map(dep => (
                <tr key={dep.idDept}>
                  <td>{dep.idDept}</td>
                  <td>{dep.nomDept}</td>
                  <td>{dep.responsable}</td>
                  <td>
                    <button className="btn-action edit" title="Modifier" onClick={() => setEditDep(dep)}>
                      <MdEdit />
                    </button>
                    <button className="btn-action delete" title="Supprimer" onClick={() => confirmDelete(dep)}>
                      <MdDelete />
                    </button>
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
          <h3>Ajouter un département</h3>
          <DepartementForm onSubmit={handleAdd} onCancel={() => setShowAddModal(false)} />
        </Modal>
      )}

      {/* Modal modification */}
      {editDep && (
        <Modal onClose={() => setEditDep(null)}>
          <h3>Modifier le département</h3>
          <DepartementForm initial={editDep} onSubmit={handleEdit} onCancel={() => setEditDep(null)} />
        </Modal>
      )}

      {/* Modal suppression */}
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <h3>Confirmer la suppression</h3>
          <p style={{ textAlign: "center" }}>
            Voulez-vous vraiment supprimer le département <b>{depToDelete?.nomDept}</b> ?
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
