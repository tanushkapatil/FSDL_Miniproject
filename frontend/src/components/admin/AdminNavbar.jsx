import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = ({ activeSection, onSectionChange }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="font-heading text-2xl font-bold text-slate-900">Admin Dashboard</p>
          <p className="text-sm text-slate-600">
            Manage submissions and internship opportunities
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onSectionChange("submissions")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeSection === "submissions"
                ? "bg-brand-500 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            User Submissions
          </button>
          <button
            type="button"
            onClick={() => onSectionChange("opportunities")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeSection === "opportunities"
                ? "bg-brand-500 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Manage Opportunities
          </button>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            {user?.name || user?.email || "Admin"}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
