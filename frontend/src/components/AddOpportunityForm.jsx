import { useEffect, useMemo, useState } from "react";

const internFields = [
  { name: "companyName", label: "Company Name", required: true },
  { name: "role", label: "Role", required: true },
  { name: "prn", label: "PRN", required: true },
  { name: "division", label: "Division", required: true },
  { name: "startDate", label: "Start Date", type: "date", required: true },
  { name: "endDate", label: "End Date", type: "date", required: true },
  { name: "duration", label: "Duration", required: true },
  { name: "stipend", label: "Stipend (Optional)", required: false },
  { name: "description", label: "Description", required: true, textarea: true },
];

const hackathonFields = [
  { name: "hackathonName", label: "Hackathon Name", required: true },
  { name: "teamName", label: "Team Name", required: true },
  { name: "teamSize", label: "Team Size", type: "number", required: true },
  { name: "position", label: "Position (Winner/Participant)", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "description", label: "Description", required: true, textarea: true },
];

const initialData = {
  companyName: "",
  role: "",
  prn: "",
  division: "",
  startDate: "",
  endDate: "",
  duration: "",
  stipend: "",
  date: "",
  description: "",
  hackathonName: "",
  teamName: "",
  teamSize: "",
  position: "",
  members: [],
};

const AddOpportunityForm = ({ onSubmit, isSubmitting }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("internship");
  const [formData, setFormData] = useState(initialData);

  const activeFields = useMemo(
    () => (selectedType === "internship" ? internFields : hackathonFields),
    [selectedType]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (index, key, value) => {
    setFormData((prev) => {
      const nextMembers = [...prev.members];
      nextMembers[index] = {
        ...nextMembers[index],
        [key]: value,
      };

      return {
        ...prev,
        members: nextMembers,
      };
    });
  };

  useEffect(() => {
    if (selectedType !== "hackathon") {
      return;
    }

    const normalizedSize = Number(formData.teamSize || 0);

    if (!Number.isInteger(normalizedSize) || normalizedSize < 0) {
      return;
    }

    if (formData.members.length === normalizedSize) {
      return;
    }

    setFormData((prev) => {
      const resizedMembers = prev.members.slice(0, normalizedSize);

      while (resizedMembers.length < normalizedSize) {
        resizedMembers.push({ name: "", prn: "", division: "" });
      }

      return {
        ...prev,
        members: resizedMembers,
      };
    });
  }, [selectedType, formData.teamSize, formData.members.length]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedType, formData, () => setFormData(initialData));
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-slate-900">Add Opportunity Obtained</h2>
          <p className="mt-1 text-sm text-slate-600">
            Share your internships or hackathon participations.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          {isOpen ? "Hide Form" : "Add Opportunity"}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setSelectedType("internship")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                selectedType === "internship"
                  ? "bg-brand-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Add Internship
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("hackathon")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                selectedType === "hackathon"
                  ? "bg-brand-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Add Hackathon Participation
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {activeFields.map((field) => (
              <div
                key={field.name}
                className={`${field.textarea ? "md:col-span-2" : ""} ${
                  field.name === "teamSize" ? "md:col-span-2" : ""
                }`}
              >
                <label className="flex flex-col gap-2 text-sm text-slate-600">
                  {field.label}
                  {field.textarea ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      rows={4}
                      required={field.required}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-brand-500"
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      min={field.name === "teamSize" ? 1 : undefined}
                      required={field.required}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-brand-500"
                    />
                  )}
                </label>

                {field.name === "teamSize" && selectedType === "hackathon" && Number(formData.teamSize) > 0 && (
                  <div className="mt-3 space-y-3">
                    <p className="text-sm font-semibold text-slate-700">Team Members</p>
                    {formData.members.map((member, index) => (
                      <div key={`member-${index}`} className="rounded-xl border border-slate-200 p-3">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Member {index + 1}
                        </p>
                        <div className="grid gap-3 md:grid-cols-3">
                          <label className="flex flex-col gap-1 text-sm text-slate-600">
                            Name
                            <input
                              type="text"
                              value={member.name}
                              onChange={(event) => handleMemberChange(index, "name", event.target.value)}
                              required
                              className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-brand-500"
                            />
                          </label>
                          <label className="flex flex-col gap-1 text-sm text-slate-600">
                            PRN
                            <input
                              type="text"
                              value={member.prn}
                              onChange={(event) => handleMemberChange(index, "prn", event.target.value)}
                              required
                              className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-brand-500"
                            />
                          </label>
                          <label className="flex flex-col gap-1 text-sm text-slate-600">
                            Division
                            <input
                              type="text"
                              value={member.division}
                              onChange={(event) => handleMemberChange(index, "division", event.target.value)}
                              required
                              className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-brand-500"
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Submitting..." : "Submit Details"}
          </button>
        </form>
      )}
    </section>
  );
};

export default AddOpportunityForm;
