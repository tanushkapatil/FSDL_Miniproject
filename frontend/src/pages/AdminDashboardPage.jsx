import { useEffect, useMemo, useState } from "react";
import axiosClient from "../api/axiosClient";
import LoadingSpinner from "../components/LoadingSpinner";
import ToastStack from "../components/ToastStack";
import AdminNavbar from "../components/admin/AdminNavbar";
import EditModal from "../components/admin/EditModal";
import OpportunityForm from "../components/admin/OpportunityForm";
import OpportunityList from "../components/admin/OpportunityList";
import SubmissionList from "../components/admin/SubmissionList";

const AdminDashboardPage = () => {
  const [activeSection, setActiveSection] = useState("submissions");
  const [submissions, setSubmissions] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [submissionFilters, setSubmissionFilters] = useState({
    type: "all",
    date: "",
    search: "",
  });
  const [opportunitySearch, setOpportunitySearch] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingOpportunity, setSavingOpportunity] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [submissionsResponse, opportunitiesResponse] = await Promise.all([
        axiosClient.get("/api/submissions"),
        axiosClient.get("/api/opportunities"),
      ]);

      setSubmissions(Array.isArray(submissionsResponse.data) ? submissionsResponse.data : []);
      setOpportunities(Array.isArray(opportunitiesResponse.data) ? opportunitiesResponse.data : []);
    } catch (error) {
      showToast(error.response?.data?.message || error.message || "Failed to load admin data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const upcomingDeadlineCount = useMemo(() => {
    return opportunities.filter((opportunity) => {
      if (!opportunity.deadline) return false;
      const deadline = new Date(opportunity.deadline).getTime();
      return !Number.isNaN(deadline) && deadline >= Date.now();
    }).length;
  }, [opportunities]);

  const urgentOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      if (!opportunity.deadline) return false;
      const deadline = new Date(opportunity.deadline).getTime();
      if (Number.isNaN(deadline)) return false;
      const daysLeft = Math.ceil((deadline - Date.now()) / (1000 * 60 * 60 * 24));
      return daysLeft >= 0 && daysLeft < 3;
    });
  }, [opportunities]);

  const filteredSubmissions = useMemo(() => {
    const search = submissionFilters.search.trim().toLowerCase();

    return submissions.filter((submission) => {
      const name = `${submission.data?.companyName || ""} ${submission.data?.hackathonName || ""}`.toLowerCase();
      const matchesSearch = search === "" || name.includes(search);
      const matchesType = submissionFilters.type === "all" || submission.type === submissionFilters.type;
      const matchesDate =
        submissionFilters.date === "" ||
        (submission.data?.date && new Date(submission.data.date).toDateString() === new Date(submissionFilters.date).toDateString());

      return matchesSearch && matchesType && matchesDate;
    });
  }, [submissions, submissionFilters]);

  const filteredOpportunities = useMemo(() => {
    const search = opportunitySearch.trim().toLowerCase();

    return opportunities.filter((opportunity) => {
      const searchable = `${opportunity.title || ""} ${opportunity.company || ""} ${opportunity.role || ""}`.toLowerCase();
      return search === "" || searchable.includes(search);
    });
  }, [opportunities, opportunitySearch]);

  const handleSaveOpportunity = async (formData) => {
    const payload = {
      title: formData.title,
      company: formData.company,
      role: formData.role,
      description: formData.description,
      deadline: formData.deadline,
      applyLink: formData.applyLink,
      domain: formData.domain,
    };

    try {
      setSavingOpportunity(true);
      if (selectedOpportunity) {
        await axiosClient.put(`/api/opportunities/${selectedOpportunity._id}`, payload);
        showToast("Opportunity updated successfully", "success");
      } else {
        await axiosClient.post("/api/opportunities", payload);
        showToast("Opportunity added successfully", "success");
      }

      setSelectedOpportunity(null);
      await fetchAdminData();
    } catch (error) {
      showToast(error.response?.data?.message || error.message || "Unable to save opportunity", "error");
    } finally {
      setSavingOpportunity(false);
    }
  };

  const handleDeleteOpportunity = async (opportunity) => {
    const confirmed = window.confirm(`Delete opportunity from ${opportunity.company}?`);
    if (!confirmed) return;

    try {
      await axiosClient.delete(`/api/opportunities/${opportunity._id}`);
      showToast("Opportunity deleted successfully", "success");
      await fetchAdminData();
    } catch (error) {
      showToast(error.response?.data?.message || error.message || "Unable to delete opportunity", "error");
    }
  };

  return (
    <div className="min-h-screen bg-site px-4 py-0 font-body text-slate-900">
      <AdminNavbar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="mx-auto max-w-7xl space-y-6 px-0 py-6 sm:px-2 lg:px-4">
        <ToastStack toasts={toasts} />

        {loading ? (
          <LoadingSpinner label="Loading admin dashboard..." />
        ) : activeSection === "submissions" ? (
          <section className="space-y-5">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <p className="text-sm text-slate-600">Total Submissions</p>
                <p className="mt-2 font-heading text-3xl font-bold text-slate-900">{submissions.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <p className="text-sm text-slate-600">Internship</p>
                <p className="mt-2 font-heading text-3xl font-bold text-slate-900">
                  {submissions.filter((submission) => submission.type === "internship").length}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <p className="text-sm text-slate-600">Hackathon</p>
                <p className="mt-2 font-heading text-3xl font-bold text-slate-900">
                  {submissions.filter((submission) => submission.type === "hackathon").length}
                </p>
              </div>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
              <h2 className="font-heading text-2xl font-semibold text-slate-900">User Submissions</h2>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <label className="flex flex-col gap-2 text-sm text-slate-600">
                  Search by company/hackathon name
                  <input
                    type="text"
                    value={submissionFilters.search}
                    onChange={(event) => setSubmissionFilters((prev) => ({ ...prev, search: event.target.value }))}
                    placeholder="Search..."
                    className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-slate-600">
                  Type
                  <select
                    value={submissionFilters.type}
                    onChange={(event) => setSubmissionFilters((prev) => ({ ...prev, type: event.target.value }))}
                    className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
                  >
                    <option value="all">All</option>
                    <option value="internship">Internship</option>
                    <option value="hackathon">Hackathon</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm text-slate-600">
                  Filter by date
                  <input
                    type="date"
                    value={submissionFilters.date}
                    onChange={(event) => setSubmissionFilters((prev) => ({ ...prev, date: event.target.value }))}
                    className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
                  />
                </label>
              </div>

              <div className="mt-6">
                <SubmissionList submissions={filteredSubmissions} />
              </div>
            </section>
          </section>
        ) : (
          <section className="space-y-5">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <p className="text-sm text-slate-600">Total Opportunities</p>
                <p className="mt-2 font-heading text-3xl font-bold text-slate-900">{opportunities.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <p className="text-sm text-slate-600">Upcoming Deadlines</p>
                <p className="mt-2 font-heading text-3xl font-bold text-slate-900">{upcomingDeadlineCount}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <p className="text-sm text-slate-600">Urgent Deadlines (&lt; 3 days)</p>
                <p className="mt-2 font-heading text-3xl font-bold text-alert-500">{urgentOpportunities.length}</p>
              </div>
            </div>

            <OpportunityForm
              initialValues={null}
              onSubmit={handleSaveOpportunity}
              isSaving={savingOpportunity}
            />

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-heading text-2xl font-semibold text-slate-900">Manage Internship Opportunities</h2>
                <label className="flex flex-col gap-2 text-sm text-slate-600">
                  Search by company or role
                  <input
                    type="text"
                    value={opportunitySearch}
                    onChange={(event) => setOpportunitySearch(event.target.value)}
                    placeholder="Search opportunities..."
                    className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
                  />
                </label>
              </div>

              <div className="mt-6">
                <OpportunityList opportunities={filteredOpportunities} onEdit={setSelectedOpportunity} onDelete={handleDeleteOpportunity} />
              </div>
            </section>
          </section>
        )}
      </main>

      <EditModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        onSave={handleSaveOpportunity}
        isSaving={savingOpportunity}
      />
    </div>
  );
};

export default AdminDashboardPage;
