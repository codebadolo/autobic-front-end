import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import CoursPage from "./pages/CoursPage";
import DashboardPage from "./pages/DashboardPage";
import DemandeDetailPage from "./pages/DemandeDetailPage";
import EmployesPage from "./pages/EmployesPage";
import ParticipantsPage from "./pages/ParticipantsPage";
import SessionsPage from "./pages/SessionsPage";

import BudgetPage from "./pages/BudgetPage";
import DemandesPage from "./pages/DemandesPage";
import DepartementsPage from "./pages/DepartementsPage";
import FacturesPage from "./pages/FacturesPage";
// ...autres imports

import "./App.css";

import EmployeDetailPage from "./pages/EmployeDetailPage"; // importe ta page détail employé

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <Topbar sidebarCollapsed={sidebarCollapsed} />
      <div className={`main-content${sidebarCollapsed ? " collapsed" : ""}`}>
        <Routes>
          <Route path="/" element={<DashboardPage sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/cours" element={<CoursPage />} />
          <Route path="/sessions" element={<SessionsPage sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/employes" element={<EmployesPage sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/employes/:matricule" element={<EmployeDetailPage sidebarCollapsed={sidebarCollapsed} />} /> {/* <-- Nouvelle route */}
          <Route path="/participants" element={<ParticipantsPage sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/demandes" element={<DemandesPage sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/factures" element={<FacturesPage sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/departements" element={<DepartementsPage sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/budget" element={<BudgetPage sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/demandes-formation/:id" element={<DemandeDetailPage sidebarCollapsed={sidebarCollapsed} />}  />

          {/* autres routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
