import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { MdArrowBack, MdArrowForward, MdDelete, MdEdit, MdFilterList, MdSearch } from "react-icons/md";
import "./CoursPage.css";

// Modal component
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

// Form component for Add/Edit
function CoursForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || {
    reference: "",
    libelle: "",
    domaine: "",
    nombreJours: 1,
    prixParParticipant: 0,
    organisme: "",
    lieu: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: name === "nombreJours" || name === "prixParParticipant" ? Number(value) : value
    }));
  };

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="cours-form">
      <label>Référence</label>
      <input name="reference" value={form.reference} onChange={handleChange} required disabled={!!initial} />
      <label>Libellé</label>
      <input name="libelle" value={form.libelle} onChange={handleChange} required />
      <label>Domaine</label>
      <input name="domaine" value={form.domaine} onChange={handleChange} />
      <label>Nombre de jours</label>
      <input name="nombreJours" type="number" min="1" value={form.nombreJours} onChange={handleChange} />
      <label>Prix par participant</label>
      <input name="prixParParticipant" type="number" min="0" value={form.prixParParticipant} onChange={handleChange} />
      <label>Organisme</label>
      <input name="organisme" value={form.organisme} onChange={handleChange} />
      <label>Lieu</label>
      <input name="lieu" value={form.lieu} onChange={handleChange} />
      <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button type="submit">Enregistrer</button>
        <button type="button" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}

const PAGE_SIZE = 10;

export default function CoursPage() {
  const [coursList, setCoursList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [domaine, setDomaine] = useState("Tous");
  const [organisme, setOrganisme] = useState("Tous");
  const [lieu, setLieu] = useState("Tous");
  const [page, setPage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editCours, setEditCours] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [coursToDelete, setCoursToDelete] = useState(null);

  // Load courses
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8080/api/cours")
      .then(res => {
        setCoursList(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des cours");
        setLoading(false);
      });
  }, []);

  // Filters
  const domaines = ["Tous", ...Array.from(new Set(coursList.map(c => c.domaine)))];
  const organismes = ["Tous", ...Array.from(new Set(coursList.map(c => c.organisme)))];
  const lieux = ["Tous", ...Array.from(new Set(coursList.map(c => c.lieu)))];

  // Filtered & searched courses
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
  }, [coursList, search, domaine, organisme, lieu]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [search, domaine, organisme, lieu]);

  // Delete handlers
  const confirmDelete = (cours) => {
    setCoursToDelete(cours);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (!coursToDelete) return;
    axios.delete(`http://localhost:8080/api/cours/${coursToDelete.reference}`)
      .then(() => {
        setCoursList(prev => prev.filter(c => c.reference !== coursToDelete.reference));
        setShowDeleteModal(false);
        setCoursToDelete(null);
      })
      .catch(() => alert("Erreur lors de la suppression"));
  };

  // Add handlers
  const handleAdd = (cours) => {
    axios.post("http://localhost:8080/api/cours", cours)
      .then(res => {
        setCoursList(prev => [...prev, res.data]);
        setShowAddModal(false);
      })
      .catch(() => alert("Erreur lors de l'ajout"));
  };

  // Edit handlers
  const handleEdit = (cours) => {
  axios.put(`http://localhost:8080/api/cours/${cours.reference}`, cours)

      .then(res => {
        setCoursList(prev => prev.map(c => c.reference === cours.reference ? res.data : c));
        setEditCours(null);
      })
      .catch(() => alert("Erreur lors de la modification"));
  };

  return (
    <div className="cours-page">
      <div className="cours-header">
        <h2>Liste des Cours</h2>
        <button className="btn-add" onClick={() => setShowAddModal(true)}>+ Ajouter un cours</button>
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

      {loading ? (
        <p>Chargement des cours...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
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
                  paged.map(cours => (
                    <tr key={cours.reference}>
                      <td>{cours.reference}</td>
                      <td>{cours.libelle}</td>
                      <td>
                        <span className={`badge badge-${cours.domaine?.toLowerCase()}`}>
                          {cours.domaine}
                        </span>
                      </td>
                      <td>{cours.nombreJours}</td>
                      <td>
                        <span className="prix">{cours.prixParParticipant?.toLocaleString()} F CFA</span>
                      </td>
                      <td>{cours.organisme}</td>
                      <td>{cours.lieu}</td>
                      <td>
                        <button className="btn-action edit" title="Modifier" onClick={() => setEditCours(cours)}>
                          <MdEdit />
                        </button>
                        <button className="btn-action delete" title="Supprimer" onClick={() => confirmDelete(cours)}>
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
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="btn-page">
              <MdArrowBack />
            </button>
            <span>Page {page} / {pageCount}</span>
            <button disabled={page === pageCount} onClick={() => setPage(page + 1)} className="btn-page">
              <MdArrowForward />
            </button>
          </div>
        </>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <h3>Ajouter un cours</h3>
          <CoursForm onSubmit={handleAdd} onCancel={() => setShowAddModal(false)} />
        </Modal>
      )}

      {/* Edit Modal */}
      {editCours && (
        <Modal onClose={() => setEditCours(null)}>
          <h3>Modifier le cours {editCours.reference}</h3>
          <CoursForm initial={editCours} onSubmit={handleEdit} onCancel={() => setEditCours(null)} />
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <h3>Confirmer la suppression</h3>
          <p style={{ textAlign: "center" }}>
            Voulez-vous vraiment supprimer le cours <b>{coursToDelete?.reference}</b> ?
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
