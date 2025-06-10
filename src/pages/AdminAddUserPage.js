import { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import userService from "../services/userService";
import "./AdminAddUserPage.css";

export default function AdminAddUserPage() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    matricule: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    sexe: "",
    dateEntree: "",
    categorie: "",
    qualification: "",
    departement: "",
    username: "",
    password: "",
    role: "EMPLOYE"
  });
  const [editIndex, setEditIndex] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await userService.getAll();
        setUsers(data);
      } catch {
        setMessage("Erreur lors du chargement des utilisateurs");
      }
    }
    loadUsers();
  }, []);

  const openModal = (user = null, idx = null) => {
    if (user) {
      setForm({ ...user, password: "" });
      setEditIndex(idx);
    } else {
      setForm({
        matricule: "",
        nom: "",
        prenom: "",
        dateNaissance: "",
        sexe: "",
        dateEntree: "",
        categorie: "",
        qualification: "",
        departement: "",
        username: "",
        password: "",
        role: "EMPLOYE"
      });
      setEditIndex(null);
    }
    setMessage("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setMessage("");
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async e => {
  e.preventDefault();
  setMessage("");
  try {
    if (editIndex !== null) {
      await userService.update(form.matricule, form);
      const updatedUsers = [...users];
      updatedUsers[editIndex] = form;
      setUsers(updatedUsers);
      setMessage("Utilisateur modifié avec succès !");
    } else {
      const newUser = await userService.create(form);
      setUsers([...users, newUser]);
      setMessage("Utilisateur créé avec succès !");
    }
    closeModal();
  } catch (err) {
    console.error("Erreur API lors de la sauvegarde :", err.response || err.message || err);
    const apiMessage = err.response?.data?.message || err.response?.data?.error || err.message || "Erreur inconnue";
    setMessage(`Erreur lors de la sauvegarde : ${apiMessage}`);
  }
};

  const handleDelete = async idx => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      await userService.delete(users[idx].matricule);
      setUsers(users.filter((_, i) => i !== idx));
    } catch {
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <h2>Gestion des utilisateurs</h2>
        <button className="btn-add" onClick={() => openModal()}>
          <MdAdd style={{ verticalAlign: "middle", fontSize: "1.3em" }} /> Ajouter un utilisateur
        </button>
      </div>

      <div className="admin-users-table-container">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Date Naissance</th>
              <th>Sexe</th>
              <th>Date Entrée</th>
              <th>Catégorie</th>
              <th>Qualification</th>
              <th>Département</th>
              <th>Username</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={12} style={{ textAlign: "center", color: "#888" }}>
                  Aucun utilisateur pour le moment.
                </td>
              </tr>
            ) : (
              users.map((u, idx) => (
                <tr key={u.matricule + idx}>
                  <td>{u.matricule}</td>
                  <td>{u.nom}</td>
                  <td>{u.prenom}</td>
                  <td>{u.dateNaissance}</td>
                  <td>{u.sexe}</td>
                  <td>{u.dateEntree}</td>
                  <td>{u.categorie}</td>
                  <td>{u.qualification}</td>
                  <td>{u.departement}</td>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>
                    <button className="btn-action edit" onClick={() => openModal(u, idx)} title="Modifier">
                      <MdEdit />
                    </button>
                    <button className="btn-action delete" onClick={() => handleDelete(idx)} title="Supprimer">
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content wide">
            <button className="modal-close" onClick={closeModal} title="Fermer">&times;</button>
            <h3>{editIndex !== null ? "Modifier" : "Ajouter"} un utilisateur</h3>
            <form className="employes-form two-cols" onSubmit={handleSubmit}>
              <div className="form-cols">
                <div className="form-col">
                  <label>Matricule</label>
                  <input name="matricule" value={form.matricule} onChange={handleChange} required disabled={editIndex !== null} />
                  <label>Nom</label>
                  <input name="nom" value={form.nom} onChange={handleChange} required />
                  <label>Prénom</label>
                  <input name="prenom" value={form.prenom} onChange={handleChange} required />
                  <label>Date de naissance</label>
                  <input name="dateNaissance" type="date" value={form.dateNaissance} onChange={handleChange} required />
                  <label>Sexe</label>
                  <select name="sexe" value={form.sexe} onChange={handleChange} required>
                    <option value="">Sélectionner</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </select>
                  <label>Date d'entrée</label>
                  <input name="dateEntree" type="date" value={form.dateEntree} onChange={handleChange} required />
                </div>
                <div className="form-col">
                  <label>Catégorie</label>
                  <input name="categorie" value={form.categorie} onChange={handleChange} required />
                  <label>Qualification</label>
                  <input name="qualification" value={form.qualification} onChange={handleChange} required />
                  <label>Département</label>
                  <input name="departement" value={form.departement} onChange={handleChange} required />
                  <label>Nom d'utilisateur</label>
                  <input name="username" value={form.username} onChange={handleChange} required />
                  <label>Mot de passe</label>
                  <input name="password" type="password" value={form.password} onChange={handleChange} required={editIndex === null} />
                  <label>Rôle</label>
                  <select name="role" value={form.role} onChange={handleChange}>
                    <option value="EMPLOYE">Employé</option>
                    <option value="RESPONSABLE">Responsable</option>
                    <option value="DIRECTEUR">Directeur</option>
                    <option value="ORGANISME">Organisme</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "18px" }}>
                <button type="button" onClick={closeModal}>Annuler</button>
                <button type="submit">{editIndex !== null ? "Modifier" : "Créer"}</button>
              </div>
            </form>
            {message && <div className="admin-add-user-message">{message}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
