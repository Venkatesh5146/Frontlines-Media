import PropTypes from 'prop-types'

function PaginationControls({ currentPage, totalResults, pageSize, onPageChange }) {
  const totalPages = Math.ceil(totalResults / pageSize)
  if (totalPages <= 1) {
    return null
  }

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    onPageChange(page)
  }

  const createPageList = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = start + maxVisible - 1

    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i += 1) {
      pages.push(i)
    }
    return pages
  }

  const pageList = createPageList()

  return (
    <nav
      className="mt-4 flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-white p-3 shadow-md"
      aria-label="Pagination"
    >
      <button
        type="button"
        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <div className="flex items-center gap-1" role="list">
        {pageList.map((page) => (
          <button
            type="button"
            key={page}
            className={`h-9 w-9 rounded-xl border text-xs font-semibold transition ${
              page === currentPage
                ? 'border-indigo-500 bg-indigo-600 text-white shadow-md'
                : 'border-transparent bg-slate-50 text-slate-700 hover:border-indigo-500 hover:text-indigo-600'
            }`}
            onClick={() => goToPage(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      <p className="ml-1 text-xs font-medium text-slate-500">
        Page {currentPage} of {totalPages}
      </p>
    </nav>
  )
}

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default PaginationControls

