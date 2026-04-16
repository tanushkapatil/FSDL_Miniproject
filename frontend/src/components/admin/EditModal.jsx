const EditModal = ({ opportunity, onClose, onSave, isSaving }) => {
  if (!opportunity) return null;

  const getDeadlineParts = (deadline) => {
    if (!deadline) {
      return { deadlineDate: "", deadlineTime: "" };
    }

    const date = new Date(deadline);
    if (Number.isNaN(date.getTime())) {
      return { deadlineDate: "", deadlineTime: "" };
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return {
      deadlineDate: `${year}-${month}-${day}`,
      deadlineTime: `${hours}:${minutes}`,
    };
  };

  const buildDeadlineIso = (deadlineDate, deadlineTime) => {
    if (!deadlineDate || !deadlineTime) {
      return "";
    }

    const [hourString, minuteString] = deadlineTime.split(":");
    const hour = Number(hourString);
    const minute = Number(minuteString);

    if (Number.isNaN(hour) || Number.isNaN(minute)) {
      return "";
    }

    const localDate = new Date(
      Number(deadlineDate.slice(0, 4)),
      Number(deadlineDate.slice(5, 7)) - 1,
      Number(deadlineDate.slice(8, 10)),
      hour,
      minute,
      0,
      0
    );

    return localDate.toISOString();
  };

  const deadlineParts = getDeadlineParts(opportunity.deadline);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSave({
      title: formData.get("title"),
      company: formData.get("company"),
      role: formData.get("role"),
      description: formData.get("description"),
      deadline: buildDeadlineIso(formData.get("deadlineDate"), formData.get("deadlineTime")),
      applyLink: formData.get("applyLink"),
      domain: formData.get("domain"),
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-heading text-2xl font-bold text-slate-900">Edit Opportunity</h3>
          <button type="button" onClick={onClose} className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700">
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
            Title
            <input name="title" defaultValue={opportunity.title} required className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-600">
            Company
            <input name="company" defaultValue={opportunity.company} required className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-600">
            Role
            <input name="role" defaultValue={opportunity.role} required className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
            Description
            <textarea name="description" defaultValue={opportunity.description} rows={4} required className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-600">
            Deadline Date
            <input type="date" name="deadlineDate" defaultValue={deadlineParts.deadlineDate} required className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-600">
            Deadline Time
            <input type="time" name="deadlineTime" defaultValue={deadlineParts.deadlineTime} required className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-600">
            Domain
            <input name="domain" defaultValue={opportunity.domain} required className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
            Apply Link
            <input name="applyLink" defaultValue={opportunity.applyLink} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500" />
          </label>

          <div className="flex gap-3 md:col-span-2">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSaving ? "Updating..." : "Save Changes"}
            </button>
            <button type="button" onClick={onClose} className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
