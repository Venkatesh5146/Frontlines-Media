import PropTypes from 'prop-types'

function CompanyCard({ company }) {
  const { name, description, location, industry, size, founded, website } = company

  return (
    <article
      className="group flex min-h-[280px] flex-col gap-4 rounded-3xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg outline-none transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-100 focus-visible:ring-2 focus-visible:ring-indigo-500"
      tabIndex={0}
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Founded {founded}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">{name}</h3>
        </div>
        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition group-hover:from-indigo-100 group-hover:to-purple-100">
          {industry}
        </span>
      </header>

      <p className="flex-1 text-sm text-slate-600">{description}</p>

      <dl className="grid gap-3 text-sm text-slate-800 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 px-3 py-2">
          <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Location
          </dt>
          <dd className="mt-1 font-semibold">{location}</dd>
        </div>
        <div className="rounded-2xl bg-slate-50 px-3 py-2">
          <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Company size
          </dt>
          <dd className="mt-1 font-semibold">{size}</dd>
        </div>
      </dl>

      <a
        href={website}
        target="_blank"
        rel="noreferrer"
        className="mt-2 flex w-fit items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100 hover:text-indigo-700 group-hover:bg-indigo-100"
      >
        Visit website
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </article>
  )
}

CompanyCard.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    industry: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    founded: PropTypes.number.isRequired,
    website: PropTypes.string.isRequired,
  }).isRequired,
}

export default CompanyCard

