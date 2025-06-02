import { useState } from "react";
import { budgetList } from "../mocks/budget";
import "./BudgetPage.css";

export default function BudgetPage({ sidebarCollapsed }) {
  const [selectedDept, setSelectedDept] = useState("Tous");

  const departements = ["Tous", ...Array.from(new Set(budgetList.map(b => b.departement)))];
  const filtered = selectedDept === "Tous"
    ? budgetList
    : budgetList.filter(b => b.departement === selectedDept);

  return (
    <div className={`budget-page${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="budget-header">
        <h2>État du budget de formation</h2>
        <div className="select-filters">
          <label>Département</label>
          <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)}>
            {departements.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>
      {filtered.map(budget => (
        <div key={budget.idBudget} className="budget-block">
          <h3>{budget.departement} — {budget.mois}</h3>
          <div className="budget-summary">
            <span><strong>Total MO :</strong> {budget.totalHeuresMainOeuvre} h / {budget.coutMainOeuvre.toLocaleString()} F CFA</span>
            <span><strong>Total cours :</strong> {budget.totalHeuresCours} h / {budget.coutCours.toLocaleString()} F CFA</span>
            <span><strong>Total :</strong> {budget.totalDepartement.toLocaleString()} F CFA</span>
          </div>
          <table className="budget-table">
            <thead>
              <tr>
                <th>Participant</th>
                <th>Stage</th>
                <th>Heures</th>
                <th>Coût du cours</th>
                <th>Mois</th>
              </tr>
            </thead>
            <tbody>
              {budget.lignes.map(ligne => (
                <tr key={ligne.idLigne}>
                  <td>{ligne.nomParticipant}</td>
                  <td>{ligne.designationStage}</td>
                  <td>{ligne.nbHeures}</td>
                  <td>{ligne.coutCours.toLocaleString()} F CFA</td>
                  <td>{ligne.mois}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
