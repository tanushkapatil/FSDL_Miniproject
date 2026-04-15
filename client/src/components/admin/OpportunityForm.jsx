import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  company: "",
  role: "",
  description: "",
  deadline: "",
  applyLink: "",
  domain: "",
};

const OpportunityForm = ({ initialValues, onSubmit, isSaving, onCancelEdit }) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title || "",
        company: initialValues.company || "",
        role: initialValues.role || "",
        description: initialValues.description || "",
        deadline: initialValues.deadline ? String(initialValues.deadline).slice(0, 10) : "",
        applyLink: initialValues.applyLink || "",
        domain: initialValues.domain || "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <h2 className="font-heading text-2xl font-semibold text-slate-900">
        {initialValues ? "Edit Opportunity" : "Add Opportunity"}
      </h2>
      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
          Title
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Company
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Role
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Deadline
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Domain
          <input
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            placeholder="e.g. Web Dev"
            required
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
          Apply Link
          <input
            name="applyLink"
            value={formData.applyLink}
            onChange={handleChange}
            placeholder="https://..."
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>

        <div className="flex gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSaving ? "Saving..." : initialValues ? "Update Opportunity" : "Add Opportunity"}
          </button>
          {initialValues && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default OpportunityForm;
