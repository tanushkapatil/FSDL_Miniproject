import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleProtectedRoute from "./components/RoleProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

const HomeRedirect = () => {
  const { isLoadingAuth, isAuthenticated, user } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={user?.role === "admin" ? "/admin-dashboard" : "/dashboard"} replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
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
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}

export default App;
