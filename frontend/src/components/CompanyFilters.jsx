import PropTypes from 'prop-types'

function CompanyFilters({ filters, options, onChange, onReset }) {
  const handleChange = (event) => {
    const { name, value } = event.target
    onChange(name, value)
  }

  const renderSelect = (name, label, values) => (
    <label
      className="flex flex-col gap-1 text-sm font-medium text-slate-700"
      key={name}
    >
      <span>{label}</span>
      <select
        name={name}
        value={filters[name]}
        onChange={handleChange}
        className="mt-0.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition hover:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
        <option value="all">All {label.toLowerCase()}</option>
        {values.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  )

  return (
    <section
      className="grid gap-4 rounded-2xl bg-white p-4 shadow-xl sm:p-6 md:grid-cols-4"
      aria-label="Filter companies"
    >
      <label className="md:col-span-2 flex flex-col gap-1 text-sm font-medium text-slate-700">
        <span>Search</span>
        <input
          type="search"
          name="search"
          placeholder="Search by name or keyword"
          value={filters.search}
          onChange={handleChange}
          className="mt-0.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition hover:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </label>

      {renderSelect('location', 'Location', options.locations)}
      {renderSelect('industry', 'Industry', options.industries)}
      {renderSelect('size', 'Company size', options.sizes)}

      <div className="flex items-end justify-start">
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          Reset filters
        </button>
      </div>
    </section>
  )
}

CompanyFilters.propTypes = {
  filters: PropTypes.shape({
    search: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    industry: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
  }).isRequired,
  options: PropTypes.shape({
    locations: PropTypes.arrayOf(PropTypes.string).isRequired,
    industries: PropTypes.arrayOf(PropTypes.string).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
}

export default CompanyFilters

