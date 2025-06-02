import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import DashboardCard from "../components/DashboardCard";
import Table from "../components/Table";
import "./DashboardPage.css";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

// Données fictives pour les stats et les courbes
const stats = [
  { title: "Cours", value: 20 },
  { title: "Sessions", value: 12 },
  { title: "Participants", value: 54 },
  { title: "Demandes en attente", value: 5 },
];

const tableData = [
  { nom: "Jean BEBA", cours: "Conception SI", date: "15/06/2024", statut: "Inscrit" },
  { nom: "Elvis ILBOUDO", cours: "Principes UML", date: "15/05/2024", statut: "Terminé" },
  // ...
];

// Exemple de données pour un graphique d'évolution des participants
const lineData = {
  labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
  datasets: [
    {
      label: "Participants",
      data: [10, 15, 18, 25, 30, 54],
      fill: false,
      borderColor: "#003366",
      tension: 0.3,
    },
  ],
};

// Exemple de données pour un graphique de répartition des domaines
const pieData = {
  labels: ["Informatique", "Automobile", "Gestion", "Électronique"],
  datasets: [
    {
      data: [8, 5, 4, 3],
      backgroundColor: ["#0074d9", "#c0392b", "#2ecc40", "#e67e22"],
    },
  ],
};

export default function DashboardPage({ sidebarCollapsed }) {
  return (
    <div className={`dashboard-page${sidebarCollapsed ? " collapsed" : ""}`}>
      <h1>Tableau de bord</h1>
      <div className="dashboard-cards">
        {stats.map((s) => (
          <DashboardCard key={s.title} title={s.title} value={s.value} />
        ))}
      </div>
      <div className="dashboard-charts">
        <div className="chart-block">
          <h3>Évolution des participants</h3>
          <Line data={lineData} />
        </div>
        <div className="chart-block">
          <h3>Répartition des cours par domaine</h3>
          <Pie data={pieData} />
        </div>
      </div>
      <div className="dashboard-section">
        <h2>Derniers participants</h2>
        <Table
          columns={["Nom", "Cours", "Date", "Statut"]}
          data={tableData.map(d => [d.nom, d.cours, d.date, d.statut])}
        />
      </div>
    </div>
  );
}
