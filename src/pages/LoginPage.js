import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(username, password);
      // Stockage du token et du rôle dans le localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      // Redirection selon le rôle (exemple)
      if (res.data.role === "EMPLOYE") {
        navigate("/demande-formation");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Identifiants invalides ou erreur serveur.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Connexion AUTOBIC</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
