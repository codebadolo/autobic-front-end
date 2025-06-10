import {
  Bar,
  BarChart,
  Cell, Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from "recharts";
import "./DashboardAdmin.css";

// Fake data for demonstration
const KPIS = [
  { label: "Employés", value: 24, color: "#2563eb", icon: "👨‍💼" },
  { label: "Participants", value: 48, color: "#22c55e", icon: "🧑‍🎓" },
  { label: "Demandes", value: 12, color: "#fbbf24", icon: "📝" },
  { label: "Sessions", value: 7, color: "#0ea5e9", icon: "📅" },
  { label: "Cours", value: 9, color: "#a21caf", icon: "📚" },
  { label: "Factures", value: 5, color: "#ef4444", icon: "💸" },
  { label: "Budget (FCFA)", value: 3300000, color: "#475569", icon: "💰" }
];

const demandesData = [
  { status: "EN_ATTENTE", count: 4 },
  { status: "VALIDÉE", count: 6 },
  { status: "REFUSÉE", count: 2 }
];

const participantsByDept = [
  { name: "Transports", value: 14 },
  { name: "Informatique", value: 18 },
  { name: "Electronique", value: 8 },
  { name: "Automobile", value: 8 }
];

const COLORS = ["#2563eb", "#22c55e", "#fbbf24", "#ef4444"];

export default function DashboardAdmin() {
  return (
    <div className="dashboard-stats-page">
      <h2 className="dashboard-title">Tableau de bord - Statistiques</h2>

      {/* KPI Cards */}
      <div className="stats-cards">
        {KPIS.map(({ label, value, color, icon }) => (
          <div className="stats-card" key={label} style={{ borderTop: `4px solid ${color}` }}>
            <div className="stats-card-icon" style={{ color }}>{icon}</div>
            <div className="stats-card-label">{label}</div>
            <div className="stats-card-value" style={{ color }}>
              {label.includes("Budget") ? value.toLocaleString() : value}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="dashboard-charts">
        <div className="dashboard-chart-card">
          <h3>Demandes de formation par statut</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={demandesData}>
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="dashboard-chart-card">
          <h3>Participants par département</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={participantsByDept}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {participantsByDept.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
