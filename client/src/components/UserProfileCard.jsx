const cardSectionTitle = "text-xs font-semibold uppercase tracking-wide text-slate-500";

const SubmissionItem = ({ item }) => {
  const title = item.type === "internship"
    ? item.data?.companyName || "Internship"
    : item.data?.hackathonName || "Hackathon";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold capitalize text-brand-700">
          {item.type}
        </span>
      </div>
      <p className="mt-1 text-xs text-slate-600">Role/Position: {item.data?.role || item.data?.position || "N/A"}</p>
      <p className="mt-1 text-xs text-slate-600">Date: {item.data?.date || item.data?.startDate || "N/A"}</p>
      {item.data?.description && (
        <p className="mt-1 line-clamp-2 text-xs text-slate-500">{item.data.description}</p>
      )}
    </div>
  );
};

const UserProfileCard = ({ userProfile, submissions, loading }) => {
  const internshipCount = submissions.filter((item) => item.type === "internship").length;
  const hackathonCount = submissions.filter((item) => item.type === "hackathon").length;

  return (
    <div className="absolute right-0 top-12 z-30 w-[min(92vw,430px)] rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-2xl">
      <section>
        <p className={cardSectionTitle}>Registered Details</p>
        <div className="mt-2 grid gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 sm:grid-cols-2">
          <p><span className="font-semibold">Name:</span> {userProfile?.name || "N/A"}</p>
          <p><span className="font-semibold">Email:</span> {userProfile?.email || "N/A"}</p>
          <p><span className="font-semibold">PRN:</span> {userProfile?.prn || "N/A"}</p>
          <p><span className="font-semibold">Division:</span> {userProfile?.division || "N/A"}</p>
        </div>
      </section>

      <section className="mt-4">
        <p className={cardSectionTitle}>Submitted Details</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
          <span className="rounded-full bg-white px-2 py-1">Total: {submissions.length}</span>
          <span className="rounded-full bg-white px-2 py-1">Internships: {internshipCount}</span>
          <span className="rounded-full bg-white px-2 py-1">Hackathons: {hackathonCount}</span>
        </div>

        <div className="mt-3 max-h-64 space-y-2 overflow-auto pr-1">
          {loading ? (
            <p className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600">Loading submissions...</p>
          ) : submissions.length === 0 ? (
            <p className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600">
              No submissions yet.
            </p>
          ) : (
            submissions.map((item) => <SubmissionItem key={item._id} item={item} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default UserProfileCard;
