import axios from "axios";
import { useState } from "react";

function AdminAddUserPage() {
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
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:8080/api/admin/users",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Utilisateur créé avec succès !");
      setForm({ ...form, username: "", password: "" });
    } catch (err) {
      setMessage("Erreur lors de la création.");
    }
  };

  return (
    <div>
      <h2>Ajouter un utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <input name="matricule" placeholder="Matricule" value={form.matricule} onChange={handleChange} required />
        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
        <input name="dateNaissance" type="date" placeholder="Date de naissance" value={form.dateNaissance} onChange={handleChange} required />
        <input name="sexe" placeholder="Sexe" value={form.sexe} onChange={handleChange} required />
        <input name="dateEntree" type="date" placeholder="Date d'entrée" value={form.dateEntree} onChange={handleChange} required />
        <input name="categorie" placeholder="Catégorie" value={form.categorie} onChange={handleChange} required />
        <input name="qualification" placeholder="Qualification" value={form.qualification} onChange={handleChange} required />
        <input name="departement" placeholder="Département" value={form.departement} onChange={handleChange} required />
        <input name="username" placeholder="Nom d'utilisateur" value={form.username} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="EMPLOYE">Employé</option>
          <option value="RESPONSABLE">Responsable</option>
          <option value="DIRECTEUR">Directeur</option>
          <option value="ORGANISME">Organisme</option>
        </select>
        <button type="submit">Créer l'utilisateur</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default AdminAddUserPage;
