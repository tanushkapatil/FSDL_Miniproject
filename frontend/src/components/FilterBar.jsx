const FilterBar = ({ filters, domainOptions, onFilterChange }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
      <div className="grid gap-3 md:grid-cols-4">
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Search
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={onFilterChange}
            placeholder="Company or role"
            className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-brand-500"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Domain
          <select
            name="domain"
            value={filters.domain}
            onChange={onFilterChange}
            className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-brand-500"
          >
            <option value="all">All Domains</option>
            {domainOptions.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Type
          <select
            name="type"
            value={filters.type}
            onChange={onFilterChange}
            className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-brand-500"
          >
            <option value="all">All Types</option>
            <option value="internship">Internship</option>
            <option value="hackathon">Hackathon</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Deadline
          <select
            name="deadline"
            value={filters.deadline}
            onChange={onFilterChange}
            className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-brand-500"
          >
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default FilterBar;
