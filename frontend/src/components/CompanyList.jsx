import PropTypes from 'prop-types'
import CompanyCard from './CompanyCard.jsx'

function CompanyList({ companies }) {
  if (!companies.length) {
    return null
  }

  return (
    <section
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      aria-live="polite"
    >
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </section>
  )
}

CompanyList.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CompanyList

