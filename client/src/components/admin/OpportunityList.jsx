const toDaysLeft = (deadline) => {
  if (!deadline) return null;

  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return null;

  const diff = date.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const OpportunityList = ({ opportunities, onEdit, onDelete }) => {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {opportunities.map((opportunity) => {
        const daysLeft = toDaysLeft(opportunity.deadline);
        const urgent = typeof daysLeft === "number" && daysLeft >= 0 && daysLeft < 3;

        return (
          <article key={opportunity._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-xl font-bold text-slate-900">{opportunity.company}</h3>
                <p className="mt-1 text-sm font-medium text-slate-700">{opportunity.role}</p>
              </div>
              <div className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                {opportunity.domain}
              </div>
            </div>

            <p className={`mt-4 text-sm ${urgent ? "font-semibold text-alert-500" : "text-slate-600"}`}>
              Deadline: {opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString() : "N/A"}
            </p>
            {typeof daysLeft === "number" && daysLeft >= 0 && (
              <p className={`mt-1 text-xs ${urgent ? "font-semibold text-alert-500" : "text-slate-500"}`}>
                {daysLeft === 0 ? "Ends today" : `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`}
              </p>
            )}

            <p className="mt-4 line-clamp-3 text-sm text-slate-600">{opportunity.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onEdit(opportunity)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(opportunity)}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default OpportunityList;
