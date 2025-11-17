import PropTypes from 'prop-types'

function CompanyCard({ company }) {
  const { name, description, location, industry, size, founded, website } = company

  return (
    <article
      className="flex min-h-[260px] flex-col gap-4 rounded-3xl bg-white p-6 shadow-xl outline-none transition hover:-translate-y-0.5 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-indigo-500"
      tabIndex={0}
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Founded {founded}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">{name}</h3>
        </div>
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
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
        className="mt-2 w-fit text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
      >
        Visit website
      </a>
    </article>
  )
}

CompanyCard.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.string.isRequired,
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

