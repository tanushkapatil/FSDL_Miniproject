const EditModal = ({ opportunity, onClose, onSave, isSaving }) => {
  if (!opportunity) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSave({
      title: formData.get("title"),
      company: formData.get("company"),
      role: formData.get("role"),
      description: formData.get("description"),
      deadline: formData.get("deadline"),
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
            Deadline
            <input type="date" name="deadline" defaultValue={String(opportunity.deadline).slice(0, 10)} required className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500" />
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
