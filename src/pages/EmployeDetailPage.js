import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EmployeDetailPage.css";

export default function EmployeDetailPage() {
  const { matricule } = useParams();
  const navigate = useNavigate();


  const [employe, setEmploye] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/employes/${matricule}`)
      .then(res => {
        setEmploye(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Employé introuvable");
        setLoading(false);
      });
  }, [matricule]);

  if (loading) return React.createElement("p", null, "Chargement...");
  if (error) return React.createElement("p", { style: { color: "red" } }, error);
  if (!employe) return null;

  const formatDate = (dateStr) => dateStr ? dateStr.slice(0, 10) : "";

  return React.createElement(
    "div",
    { className: "employe-detail-page" },
    React.createElement("h2", null, `Détail de l'employé ${employe.matricule}`),
    React.createElement(
      "button",
      { onClick: () => navigate(-1) },
      "← Retour à la liste"
    ),
    React.createElement(
      "table",
      null,
      React.createElement(
        "tbody",
        null,
        React.createElement("tr", null,
          React.createElement("td", null, "Matricule :"),
          React.createElement("td", null, employe.matricule)
        ),
        React.createElement("tr", null,
          React.createElement("td", null, "Nom :"),
          React.createElement("td", null, employe.nom)
        ),
        React.createElement("tr", null,
          React.createElement("td", null, "Prénom :"),
          React.createElement("td", null, employe.prenom)
        ),
        React.createElement("tr", null,
          React.createElement("td", null, "Sexe :"),
          React.createElement("td", null, employe.sexe)
        ),
        React.createElement("tr", null,
          React.createElement("td", null, "Date de naissance :"),
          React.createElement("td", null, formatDate(employe.dateNaissance))
        ),
        React.createElement("tr", null,
          React.createElement("td", null, "Catégorie :"),
          React.createElement("td", null, employe.categorie)
        ),
        React.createElement("tr", null,
          React.createElement("td", null, "Date d'entrée :"),
          React.createElement("td", null, formatDate(employe.dateEntree))
        ),
        React.createElement("tr", null,
          React.createElement("td", null, "Qualification :"),
          React.createElement("td", null, employe.qualification)
        ),
        React.createElement("tr", null,
          React.createElement("td", null, "Département :"),
          React.createElement("td", null, employe.departement?.nomDept || "—")
        )
      )
    )
  );
}
