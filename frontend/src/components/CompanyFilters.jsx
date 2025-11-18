import PropTypes from 'prop-types'

function CompanyFilters({ filters, options, onChange, onReset }) {
  const handleChange = (event) => {
    const { name, value } = event.target
    onChange(name, value)
  }

  const renderSelect = (name, label, values) => (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700" key={name}>
      <span>{label}</span>
      <select
        name={name}
        value={filters[name] || ''}
        onChange={handleChange}
        className="mt-0.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
      >
        <option value="all">All {label.toLowerCase()}</option>
        {values.map((value) => (
          <option value={value} key={value}>{value}</option>
        ))}
      </select>
    </label>
  )

  return (
    <section className="grid gap-4 rounded-2xl bg-gradient-to-br from-white to-slate-50 p-4 shadow-lg sm:p-6 md:grid-cols-4">

      {/* Partial Search */}
      <label className="md:col-span-2 flex flex-col gap-1 text-sm font-medium text-slate-700">
        <span>Search</span>
        <input
          type="search"
          name="search"
          placeholder="Search by name or keyword"
          value={filters.search || ''}
          onChange={handleChange}
          className="mt-0.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
        />
      </label>

      {/* Exact Name Filter */}
      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        <span>Search by Exact Name</span>
        <input
          type="text"
          name="name"
          placeholder="e.g., Company1"
          value={filters.name || ''}
          onChange={handleChange}
          className="mt-0.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
        />
      </label>

      {/* Exact ID Filter */}
      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        <span>Search by ID</span>
        <input
          type="text"
          name="id"
          placeholder="e.g., cmp001"
          value={filters.id || ''}
          onChange={handleChange}
          className="mt-0.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
        />
      </label>

      {renderSelect('location', 'Location', options.locations)}
      {renderSelect('industry', 'Industry', options.industries)}
      {renderSelect('size', 'Company size', options.sizes)}

      <div className="flex items-end justify-start">
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
        >
          Reset filters
        </button>
      </div>
    </section>
  )
}

CompanyFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
}

export default CompanyFilters
