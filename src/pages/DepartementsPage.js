import { departementsList } from "../mocks/departements";
import "./DepartementsPage.css";

export default function DepartementsPage({ sidebarCollapsed }) {
  return (
    <div className={`departements-page${sidebarCollapsed ? " collapsed" : ""}`}>
      <div className="departements-header">
        <h2>Départements</h2>
        <button className="btn-add">+ Ajouter un département</button>
      </div>
      <div className="departements-table-container">
        <table className="departements-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Responsable</th>
            </tr>
          </thead>
          <tbody>
            {departementsList.map(dep => (
              <tr key={dep.idDept}>
                <td>{dep.idDept}</td>
                <td>{dep.nomDept}</td>
                <td>{dep.responsable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
