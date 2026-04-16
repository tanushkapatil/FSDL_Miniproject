const toDate = (value) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const getDaysLeft = (deadline) => {
  const date = toDate(deadline);
  if (!date) return null;

  const diff = date.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const formatDeadline = (value) => {
  const date = toDate(value);
  if (!date) return "N/A";

  return date.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const OpportunityCard = ({ opportunity, isBookmarked, onToggleBookmark, onViewMore }) => {
  const deadline = opportunity.deadline || opportunity.date;
  const daysLeft = getDaysLeft(deadline);
  const urgent = typeof daysLeft === "number" && daysLeft >= 0 && daysLeft < 3;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-card transition hover:-translate-y-1 hover:border-brand-100">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-heading text-lg font-bold text-slate-900">
            {opportunity.companyName || opportunity.hackathonName || "Untitled"}
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-700">{opportunity.role || "Role not specified"}</p>
        </div>
        <button
          type="button"
          onClick={() => onToggleBookmark(opportunity._id, isBookmarked)}
          className={`rounded-full p-2 text-lg transition ${
            isBookmarked ? "bg-amber-100 text-amber-500" : "bg-slate-100 text-slate-500 hover:text-amber-500"
          }`}
          aria-label="Toggle bookmark"
        >
          {isBookmarked ? "★" : "☆"}
        </button>
      </div>

      <p className={`mt-4 text-sm ${urgent ? "font-semibold text-alert-500" : "text-slate-600"}`}>
        Deadline: {formatDeadline(deadline)}
      </p>

      {typeof daysLeft === "number" && daysLeft >= 0 && (
        <p className={`mt-1 text-xs ${urgent ? "font-semibold text-alert-500" : "text-slate-500"}`}>
          {daysLeft === 0 ? "Ends today" : `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`}
        </p>
      )}

      <button
        type="button"
        onClick={() => onViewMore(opportunity)}
        className="mt-5 rounded-lg border border-brand-500 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
      >
        View More
      </button>
    </article>
  );
};

export default OpportunityCard;
