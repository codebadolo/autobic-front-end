import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DemandeDetailPage.css";

export default function DemandeDetailPage() {
  const { id } = useParams(); // id de la demande
  const navigate = useNavigate();

  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/demandes-formation/${id}`)
      .then(res => {
        setDemande(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Demande introuvable");
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateStr) => dateStr ? dateStr.slice(0, 10) : "";

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!demande) return null;

  const emp = demande.employe || {};

  return (
    <div className="demande-detail-page" style={{ maxWidth: 700, margin: "2rem auto", padding: "1rem 2rem", background: "#f9f9f9", borderRadius: 12 }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 20, padding: "8px 16px", cursor: "pointer" }}>← Retour</button>
      <h2>Détail de la demande #{demande.idDemande}</h2>

      <section style={{ marginBottom: 30 }}>
        <h3>Informations sur la demande</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr><td><strong>Date de demande :</strong></td><td>{formatDate(demande.dateDemande)}</td></tr>
            <tr><td><strong>Date souhaitée début :</strong></td><td>{formatDate(demande.dateSouhaiteeDebut)}</td></tr>
            <tr><td><strong>Durée (jours) :</strong></td><td>{demande.dureeJours}</td></tr>
            <tr><td><strong>Statut :</strong></td><td>{demande.statut}</td></tr>
            <tr><td><strong>Observations :</strong></td><td>{demande.observations || "—"}</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h3>Informations sur l'employé</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr><td><strong>Matricule :</strong></td><td>{emp.matricule || "—"}</td></tr>
            <tr><td><strong>Nom :</strong></td><td>{emp.nom || "—"}</td></tr>
            <tr><td><strong>Prénom :</strong></td><td>{emp.prenom || "—"}</td></tr>
            <tr><td><strong>Catégorie :</strong></td><td>{emp.categorie || "—"}</td></tr>
            <tr><td><strong>Qualification :</strong></td><td>{emp.qualification || "—"}</td></tr>
            <tr><td><strong>Département :</strong></td><td>{emp.departement?.nomDept || "—"}</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
