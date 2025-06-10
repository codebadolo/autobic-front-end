import { useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import AdminAddUserPage from "./pages/AdminAddUserPage";
import CoursPage from "./pages/CoursPage";
import Dashboard from "./pages/Dashboard";
import DemandesFormationPage from "./pages/DemandesFormationPage";
import DepartementsPage from "./pages/DepartementsPage";
import EmployesPage from "./pages/EmployesPage";
import EtatBudgetPage from "./pages/EtatBudgetPage";
import FacturesPage from "./pages/FacturesPage";
import LignesBudgetPage from "./pages/LignesBudgetPage";
import LoginPage from "./pages/LoginPage";
import OrganismesPage from "./pages/OrganismesPage";
import ParticipantsPage from "./pages/ParticipantsPage";
import SessionsPage from "./pages/SessionsPage";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <Router>
      {token && (
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}
      {token && <Topbar sidebarCollapsed={sidebarCollapsed} />}
      <div className={`main-content${sidebarCollapsed ? " collapsed" : ""}`}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard sidebarCollapsed={sidebarCollapsed} />
              </PrivateRoute>
            }
          />
          <Route
            path="/cours"
            element={
              <PrivateRoute>
                <CoursPage sidebarCollapsed={sidebarCollapsed} />
              </PrivateRoute>
            }
          />
          <Route
            path="/sessions"
            element={
              <PrivateRoute>
                <SessionsPage sidebarCollapsed={sidebarCollapsed} />
              </PrivateRoute>
            }
          />
          <Route
            path="/employes"
            element={
              <PrivateRoute>
                <EmployesPage sidebarCollapsed={sidebarCollapsed} />
              </PrivateRoute>
            }
          />
          <Route
            path="/participants"
            element={
              <PrivateRoute>
                <ParticipantsPage sidebarCollapsed={sidebarCollapsed} />
              </PrivateRoute>
            }
          />
          <Route
            path="/demandes"
            element={
              <PrivateRoute>
                <DemandesFormationPage sidebarCollapsed={sidebarCollapsed} />
              </PrivateRoute>
            }
          />
          <Route
            path="/factures"
            element={
              <PrivateRoute>
                <FacturesPage sidebarCollapsed={sidebarCollapsed} />
              </PrivateRoute>
            }
          />
          <Route
            path="/departements"
            element={
              <PrivateRoute>
                <DepartementsPage sidebarCollapsed={sidebarCollapsed} />
              </PrivateRoute>
            }
          />
          <Route
            path="/etat-budget"
            element={
              <PrivateRoute>
                <EtatBudgetPage sidebarCollapsed={sidebarCollapsed} />
              </PrivateRoute>
            }
          />
          <Route
            path="/lignes-budget"
            element={
              <PrivateRoute>
                <LignesBudgetPage sidebarCollapsed={sidebarCollapsed} />
              </PrivateRoute>
            }
          />
          <Route
            path="/organismes"
            element={
              <PrivateRoute>
                <OrganismesPage sidebarCollapsed={sidebarCollapsed} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add-user"
            element={
              <PrivateRoute requiredRole="ADMIN">
                <AdminAddUserPage sidebarCollapsed={sidebarCollapsed} />
              </PrivateRoute>
            }
          />
          {/* Ajoute d'autres routes ici */}
          <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
          <Route path="*" element={<div>404 - Page non trouvée</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
