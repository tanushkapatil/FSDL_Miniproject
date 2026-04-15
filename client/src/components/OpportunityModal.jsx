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

const OpportunityModal = ({ opportunity, isBookmarked, onToggleBookmark, onClose }) => {
  if (!opportunity) return null;

  const deadline = opportunity.deadline || opportunity.date;
  const daysLeft = getDaysLeft(deadline);
  const domains = opportunity.domains || opportunity.tags || [];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-heading text-2xl font-bold text-slate-900">
              {opportunity.companyName || opportunity.hackathonName || "Untitled"}
            </h3>
            <p className="mt-1 text-slate-600">{opportunity.role || "Role not specified"}</p>
          </div>
          <button
            type="button"
            className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm text-slate-700">
          <p>
            <span className="font-semibold text-slate-900">Full Description:</span>{" "}
            {opportunity.description || "Not provided"}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Deadline:</span>{" "}
            {formatDeadline(deadline)}
          </p>
          {typeof daysLeft === "number" && daysLeft >= 0 && (
            <p className="font-semibold text-brand-700">
              {daysLeft === 0 ? "Ends today" : `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`}
            </p>
          )}

          {opportunity.applyLink && (
            <p>
              <span className="font-semibold text-slate-900">Apply Link:</span>{" "}
              <a
                href={opportunity.applyLink}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-brand-700 underline hover:text-brand-500"
              >
                Apply Here
              </a>
            </p>
          )}

          <div>
            <p className="font-semibold text-slate-900">Domain Tags:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {domains.length > 0 ? (
                domains.map((domain) => (
                  <span
                    key={domain}
                    className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
                  >
                    {domain}
                  </span>
                ))
              ) : (
                <span className="text-slate-500">No domain tags</span>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleBookmark(opportunity._id, isBookmarked)}
          className={`mt-6 rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
            isBookmarked ? "bg-amber-500 hover:bg-amber-600" : "bg-brand-500 hover:bg-brand-700"
          }`}
        >
          {isBookmarked ? "Remove Bookmark" : "Bookmark"}
        </button>
      </div>
    </div>
  );
};

export default OpportunityModal;
