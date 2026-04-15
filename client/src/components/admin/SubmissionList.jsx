const getSubmissionName = (submission) => {
  return submission?.data?.companyName || submission?.data?.hackathonName || submission?.data?.name || "N/A";
};

const getSubmissionRole = (submission) => submission?.data?.role || "N/A";

const getSubmissionUser = (submission) => {
  return (
    submission?.userName ||
    submission?.userId?.name ||
    submission?.userEmail ||
    submission?.userId?.email ||
    submission?.data?.userName ||
    "N/A"
  );
};

const SubmissionList = ({ submissions }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">User</th>
              <th className="px-4 py-3 font-semibold">Company / Hackathon</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {submissions.map((submission) => (
              <tr key={submission._id} className="align-top hover:bg-slate-50/60">
                <td className="px-4 py-4 capitalize text-slate-700">{submission.type}</td>
                <td className="px-4 py-4 text-slate-700">{getSubmissionUser(submission)}</td>
                <td className="px-4 py-4 text-slate-700">{getSubmissionName(submission)}</td>
                <td className="px-4 py-4 text-slate-700">{getSubmissionRole(submission)}</td>
                <td className="px-4 py-4 text-slate-700">{submission.data?.date || "N/A"}</td>
                <td className="px-4 py-4 text-slate-700">{submission.data?.description || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionList;
