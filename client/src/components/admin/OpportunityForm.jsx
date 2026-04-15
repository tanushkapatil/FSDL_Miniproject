import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  company: "",
  role: "",
  description: "",
  deadlineDate: "",
  deadlineTime: "",
  applyLink: "",
  domain: "",
};

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

const OpportunityForm = ({ initialValues, onSubmit, isSaving, onCancelEdit }) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (initialValues) {
      const deadlineParts = getDeadlineParts(initialValues.deadline);

      setFormData({
        title: initialValues.title || "",
        company: initialValues.company || "",
        role: initialValues.role || "",
        description: initialValues.description || "",
        deadlineDate: deadlineParts.deadlineDate,
        deadlineTime: deadlineParts.deadlineTime,
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
    onSubmit({
      ...formData,
      deadline: buildDeadlineIso(formData.deadlineDate, formData.deadlineTime),
    });
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
          Deadline Date
          <input
            type="date"
            name="deadlineDate"
            value={formData.deadlineDate}
            onChange={handleChange}
            required
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Deadline Time
          <input
            type="time"
            name="deadlineTime"
            value={formData.deadlineTime}
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
