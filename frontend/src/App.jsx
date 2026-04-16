import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleProtectedRoute from "./components/RoleProtectedRoute.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <RoleProtectedRoute allowedRole="user">
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <RoleProtectedRoute allowedRole="admin">
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          </RoleProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
