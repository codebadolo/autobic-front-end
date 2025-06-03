import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdArrowBack, MdArrowForward, MdDelete, MdEdit, MdFilterList, MdPeople, MdSearch } from "react-icons/md";
import "./SessionsPage.css";

const PAGE_SIZE = 7;

function Modal({ isOpen, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog && !dialog.open) {
      dialog.showModal();
    } else if (dialog && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      style={{
        padding: "1.5rem",
        borderRadius: "10px",
        border: "none",
        maxWidth: "500px",
        width: "90%",
        position: "relative",
      }}
    >
      {children}
      <button
        type="button"
        onClick={() => dialogRef.current.close()}
        aria-label="Fermer la modale"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "transparent",
          border: "none",
          fontSize: "1.5rem",
          cursor: "pointer",
          color: "#666",
        }}
      >
        ×
      </button>
    </dialog>
  );
}

function SessionForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initial || {
      coursReference: "",
      coursLibelle: "",
      dateDebut: "",
      dateFin: "",
      nbHeuresCours: "",
      nbPlacesMax: "",
      participants: 0,
      organisme: "",
      lieu: "",
    }
  );

  useEffect(() => {
    if (initial) {
      setForm({
        ...initial,
        dateDebut: initial.dateDebut?.slice(0, 10) || "",
        dateFin: initial.dateFin?.slice(0, 10) || "",
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.coursReference || !form.coursLibelle || !form.dateDebut || !form.dateFin) {
      alert("Veuillez remplir les champs obligatoires.");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="session-form">
      <label>Référence *</label>
      <input type="text" name="coursReference" value={form.coursReference} onChange={handleChange} required />

      <label>Libellé du cours *</label>
      <input type="text" name="coursLibelle" value={form.coursLibelle} onChange={handleChange} required />

      <label>Date début *</label>
      <input type="date" name="dateDebut" value={form.dateDebut} onChange={handleChange} required />

      <label>Date fin *</label>
      <input type="date" name="dateFin" value={form.dateFin} onChange={handleChange} required />

      <label>Nombre d'heures</label>
      <input type="number" name="nbHeuresCours" value={form.nbHeuresCours} onChange={handleChange} min="0" />

      <label>Nombre de places max</label>
      <input type="number" name="nbPlacesMax" value={form.nbPlacesMax} onChange={handleChange} min="0" />

      <label>Participants</label>
      <input type="number" name="participants" value={form.participants} onChange={handleChange} min="0" />

      <label>Organisme</label>
      <input type="text" name="organisme" value={form.organisme} onChange={handleChange} />

      <label>Lieu</label>
      <input type="text" name="lieu" value={form.lieu} onChange={handleChange} />

      <div className="form-actions">
        <button type="submit">Enregistrer</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>
          Annuler
        </button>
      </div>
    </form>
  );
}

export default function SessionsPage({ sidebarCollapsed }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [coursFiltre, setCoursFiltre] = useState("Tous");
  const [organisme, setOrganisme] = useState("Tous");
  const [lieu, setLieu] = useState("Tous");
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editSession, setEditSession] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/sessions")
      .then((res) => {
        setSessions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erreur lors du chargement des sessions");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const cours = useMemo(() => ["Tous", ...new Set(sessions.map((s) => s.coursLibelle))], [sessions]);
  const organismes = useMemo(() => ["Tous", ...new Set(sessions.map((s) => s.organisme))], [sessions]);
  const lieux = useMemo(() => ["Tous", ...new Set(sessions.map((s) => s.lieu))], [sessions]);

  const filtered = useMemo(() => {
    return sessions.filter(
      (s) =>
        (coursFiltre === "Tous" || s.coursLibelle === coursFiltre) &&
        (organisme === "Tous" || s.organisme === organisme) &&
        (lieu === "Tous" || s.lieu === lieu) &&
        (s.idSession.toString().includes(search.toLowerCase()) ||
          s.coursReference.toLowerCase().includes(search.toLowerCase()) ||
          s.coursLibelle.toLowerCase().includes(search.toLowerCase()))
    );
  }, [sessions, search, coursFiltre, organisme, lieu]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search, coursFiltre, organisme, lieu]);

  const handleDelete = (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    axios
      .delete(`http://localhost:8080/api/sessions/${id}`)
      .then(() => {
        setSessions((prev) => prev.filter((s) => s.idSession !== id));
      })
      .catch(() => alert("Erreur lors de la suppression"));
  };

  const openAddModal = () => {
    setEditSession(null);
    setModalOpen(true);
  };

  const openEditModal = (session) => {
    setEditSession(session);
    setModalOpen(true);
  };

  const handleAdd = (form) => {
    axios
      .post("http://localhost:8080/api/sessions", form)
      .then((res) => {
        setSessions((prev) => [...prev, res.data]);
        setModalOpen(false);
      })
      .catch(() => alert("Erreur lors de l'ajout"));
  };

  const handleEdit = (form) => {
    axios
      .put(`http://localhost:8080/api/sessions/${form.idSession}`, form)
      .then((res) => {
        setSessions((prev) => prev.map((s) => (s.idSession === form.idSession ? res.data : s)));
        setModalOpen(false);
      })
      .catch(() => alert("Erreur lors de la modification"));
  };

  return (
    <div className={`sessions-page${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="sessions-header">
        <h2>Liste des Sessions</h2>
        <button className="btn-add" onClick={openAddModal}>
          + Ajouter une session
        </button>
      </div>

      <div className="sessions-filters">
        <div className="input-search">
          <MdSearch />
          <input type="text" placeholder="Rechercher par référence ou libellé" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="select-filters">
          <label>
            <MdFilterList /> Cours
          </label>
          <select value={coursFiltre} onChange={(e) => setCoursFiltre(e.target.value)}>
            {cours.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <label>Organisme</label>
          <select value={organisme} onChange={(e) => setOrganisme(e.target.value)}>
            {organismes.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <label>Lieu</label>
          <select value={lieu} onChange={(e) => setLieu(e.target.value)}>
            {lieux.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="sessions-table-container">
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
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
                  <td colSpan={11} style={{ textAlign: "center", color: "#888" }}>
                    Aucune session trouvée.
                  </td>
                </tr>
              ) : (
                paged.map((session) => (
                  <tr key={session.idSession}>
                    <td>{session.idSession}</td>
                    <td>{session.coursReference}</td>
                    <td>{session.coursLibelle}</td>
                    <td>{session.dateDebut?.slice(0, 10)}</td>
                    <td>{session.dateFin?.slice(0, 10)}</td>
                    <td>{session.nbHeuresCours}</td>
                    <td>{session.nbPlacesMax}</td>
                    <td>
                      <span
                        className={`badge ${
                          session.participants === session.nbPlacesMax ? "badge-complet" : "badge-places"
                        }`}
                      >
                        {session.participants} / {session.nbPlacesMax}
                        <MdPeople className="icon-small" />
                      </span>
                    </td>
                    <td>{session.organisme}</td>
                    <td>{session.lieu}</td>
                    <td>
                      <button className="btn-action edit" title="Modifier" onClick={() => openEditModal(session)}>
                        <MdEdit />
                      </button>
                      <button className="btn-action delete" title="Supprimer" onClick={() => handleDelete(session.idSession)}>
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="btn-page">
          <MdArrowBack />
        </button>
        <span>
          Page {page} / {pageCount}
        </span>
        <button disabled={page === pageCount} onClick={() => setPage(page + 1)} className="btn-page">
          <MdArrowForward />
        </button>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3>{editSession ? `Modifier la session #${editSession.idSession}` : "Nouvelle session"}</h3>
        <SessionForm initial={editSession} onSubmit={editSession ? handleEdit : handleAdd} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
