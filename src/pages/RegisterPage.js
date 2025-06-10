import { useState } from 'react';
import { register } from '../services/authService';

function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'EMPLOYE', // ou autre selon le contexte
    // autres champs si besoin
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(form);
      setSuccess("Inscription réussie, vous pouvez vous connecter.");
      setError('');
    } catch (err) {
      setError("Erreur lors de l'inscription");
      setSuccess('');
    }
  };

  return (
    <div className="register-page">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Nom d'utilisateur" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="EMPLOYE">Employé</option>
          <option value="RESPONSABLE">Responsable</option>
          <option value="DIRECTEUR">Directeur</option>
          <option value="ORGANISME">Organisme</option>
        </select>
        {/* Ajoute d'autres champs si besoin */}
        <button type="submit">S'inscrire</button>
      </form>
      {success && <div style={{color: 'green'}}>{success}</div>}
      {error && <div style={{color: 'red'}}>{error}</div>}
    </div>
  );
}

export default RegisterPage;
