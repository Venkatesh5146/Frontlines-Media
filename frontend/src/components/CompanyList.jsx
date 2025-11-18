import PropTypes from 'prop-types'
import CompanyCard from './CompanyCard.jsx'

function CompanyList({ companies }) {
  if (!companies.length) {
    return null
  }

  return (
    <section
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      aria-live="polite"
    >
      {companies.map((company, index) => (
        <div
          key={company.id || company._id}
          className="animate-fade-in"
          style={{
            animationDelay: `${index * 50}ms`,
            animationFillMode: 'both',
          }}
        >
          <CompanyCard company={company} />
        </div>
      ))}
    </section>
  )
}

CompanyList.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CompanyList

