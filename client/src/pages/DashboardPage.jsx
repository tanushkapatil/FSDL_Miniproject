import { useEffect, useMemo, useState } from "react";
import axiosClient from "../api/axiosClient";
import AddOpportunityForm from "../components/AddOpportunityForm";
import FilterBar from "../components/FilterBar";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import OpportunityCard from "../components/OpportunityCard";
import OpportunityModal from "../components/OpportunityModal";
import ToastStack from "../components/ToastStack";

const normalizeType = (value = "") => value.toString().trim().toLowerCase();

const normalizeOpportunity = (item) => {
  const domains = Array.isArray(item.domains)
    ? item.domains
    : Array.isArray(item.tags)
      ? item.tags
      : [];

  return {
    ...item,
    _id: item._id || item.id,
    companyName: item.companyName || item.company || item.organization || "",
    hackathonName: item.hackathonName || item.eventName || "",
    role: item.role || item.position || "",
    deadline: item.deadline || item.date || null,
    type: normalizeType(item.type || item.opportunityType || ""),
    description: item.description || item.details || "",
    applyLink: item.applyLink || item.link || "",
    domains,
  };
};

const DashboardPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toasts, setToasts] = useState([]);

  const [filters, setFilters] = useState({
    domain: "all",
    type: "all",
    deadline: "all",
    search: "",
  });

  const showToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/opportunities");
      const items = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.opportunities)
          ? response.data.opportunities
          : [];

      const normalized = items.map(normalizeOpportunity);
      setOpportunities(normalized);

      const bookmarkedIds = normalized
        .filter((item) => item.isBookmarked || item.bookmarked)
        .map((item) => item._id);
      setBookmarks(bookmarkedIds);
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to load opportunities", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const domainOptions = useMemo(() => {
    const set = new Set();
    opportunities.forEach((item) => {
      (item.domains || []).forEach((domain) => set.add(domain));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [opportunities]);

  useEffect(() => {
    const next = opportunities.filter((item) => {
      const searchMatch =
        filters.search.trim() === "" ||
        `${item.companyName} ${item.hackathonName} ${item.role}`
          .toLowerCase()
          .includes(filters.search.trim().toLowerCase());

      const domainMatch =
        filters.domain === "all" ||
        (item.domains || []).some((domain) => domain.toLowerCase() === filters.domain.toLowerCase());

      const typeMatch = filters.type === "all" || normalizeType(item.type) === normalizeType(filters.type);

      const deadlineMatch =
        filters.deadline !== "upcoming" ||
        (item.deadline && new Date(item.deadline).getTime() >= Date.now());

      return searchMatch && domainMatch && typeMatch && deadlineMatch;
    });

    setFilteredOpportunities(next);
  }, [filters, opportunities]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleBookmark = async (id, isBookmarked) => {
    if (!id) {
      showToast("Invalid opportunity id", "error");
      return;
    }

    try {
      if (isBookmarked) {
        await axiosClient.delete(`/api/bookmarks/${id}`);
        setBookmarks((prev) => prev.filter((entry) => entry !== id));
        showToast("Bookmark removed", "success");
      } else {
        await axiosClient.post(`/api/bookmarks/${id}`);
        setBookmarks((prev) => [...new Set([...prev, id])]);
        showToast("Bookmarked", "success");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Bookmark update failed", "error");
    }
  };

  const handleSubmitDetails = async (selectedType, formData, resetForm) => {
    const payload = {
      type: selectedType,
      data: {
        ...formData,
      },
    };

    try {
      setSubmitting(true);
      console.log("Submitting:", payload);
      await axiosClient.post("/submissions", payload);
      showToast("Submission added successfully", "success");
      resetForm();
    } catch (error) {
      showToast(error.response?.data?.message || error.message || "Submission failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-site bg-cover bg-fixed bg-top font-body text-slate-900">
      <Navbar bookmarkedCount={bookmarks.length} />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <AddOpportunityForm onSubmit={handleSubmitDetails} isSubmitting={submitting} />

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-semibold">View Opportunities</h2>
            <p className="text-sm text-slate-600">{filteredOpportunities.length} result(s)</p>
          </div>

          <FilterBar filters={filters} domainOptions={domainOptions} onFilterChange={handleFilterChange} />

          {loading ? (
            <LoadingSpinner label="Fetching opportunities..." />
          ) : filteredOpportunities.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-card">
              No opportunities match your current filters.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredOpportunities.map((item) => (
                <OpportunityCard
                  key={item._id}
                  opportunity={item}
                  isBookmarked={bookmarks.includes(item._id)}
                  onToggleBookmark={handleToggleBookmark}
                  onViewMore={setSelectedOpportunity}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <OpportunityModal
        opportunity={selectedOpportunity}
        isBookmarked={selectedOpportunity ? bookmarks.includes(selectedOpportunity._id) : false}
        onToggleBookmark={handleToggleBookmark}
        onClose={() => setSelectedOpportunity(null)}
      />

      <ToastStack toasts={toasts} />
    </div>
  );
};

export default DashboardPage;
