import { useCallback, useEffect, useMemo, useState } from 'react'
import CompanyFilters from './components/CompanyFilters.jsx'
import CompanyList from './components/CompanyList.jsx'
import PaginationControls from './components/PaginationControls.jsx'

const defaultFilters = {
  search: '',
  location: 'all',
  industry: 'all',
  size: 'all',
}

const PAGE_SIZE = 6
const API_URL = import.meta.env.VITE_API_URL || '/mock-api/db.json'

function App() {
  const [companies, setCompanies] = useState([])
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [filters, setFilters] = useState(defaultFilters)
  const [currentPage, setCurrentPage] = useState(1)

  const loadCompanies = useCallback(async () => {
    setStatus('loading')
    setErrorMessage('')
    try {
      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error(
          `Unable to load company data (HTTP ${response.status}). Please verify API_URL.`,
        )
      }

      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        const snippet = (await response.text()).slice(0, 120)
        throw new Error(
          'The companies endpoint did not return JSON. Check that API_URL points to a JSON API or /mock-api/db.json. ' +
            `First bytes: ${snippet}`,
        )
      }

      const payload = await response.json()
      setCompanies(Array.isArray(payload) ? payload : payload.companies || [])
      setStatus('success')
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong while fetching companies.')
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    loadCompanies()
  }, [loadCompanies])

  const uniqueFilters = useMemo(() => {
    const locations = Array.from(new Set(companies.map((c) => c.location))).sort()
    const industries = Array.from(new Set(companies.map((c) => c.industry))).sort()
    const sizes = Array.from(new Set(companies.map((c) => c.size))).sort()
    return { locations, industries, sizes }
  }, [companies])

  const filteredCompanies = useMemo(() => {
    const searchValue = filters.search.trim().toLowerCase()
    return companies.filter((company) => {
      const matchesSearch =
        !searchValue ||
        company.name.toLowerCase().includes(searchValue) ||
        company.description.toLowerCase().includes(searchValue)

      const matchesLocation =
        filters.location === 'all' || company.location === filters.location
      const matchesIndustry =
        filters.industry === 'all' || company.industry === filters.industry
      const matchesSize = filters.size === 'all' || company.size === filters.size

      return matchesSearch && matchesLocation && matchesIndustry && matchesSize
    })
  }, [companies, filters])

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / PAGE_SIZE))

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages))
  }, [filteredCompanies, totalPages])

  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    return filteredCompanies.slice(startIndex, startIndex + PAGE_SIZE)
  }, [filteredCompanies, currentPage])

  const resultRangeLabel = filteredCompanies.length
    ? `${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(
        currentPage * PAGE_SIZE,
        filteredCompanies.length,
      )}`
    : '0'

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
    setCurrentPage(1)
  }

  const handleReset = () => {
    setFilters(defaultFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <header className="text-left">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Company Explorer
          </p>
          <h1 className="mb-2 text-3xl font-semibold text-slate-900 md:text-4xl">
            Find the right partner faster
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            Browse a curated directory of high-growth companies and narrow down the list with
            filters for location, industry, and size.
          </p>
        </header>

        <CompanyFilters
          filters={filters}
          options={uniqueFilters}
          onChange={handleFilterChange}
          onReset={handleReset}
        />

        {status === 'loading' && (
          <div className="flex items-center justify-between gap-4 rounded-2xl border-l-4 border-indigo-500 bg-white px-5 py-4 shadow-md">
            <p className="text-sm text-slate-700">Loading companies…</p>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center justify-between gap-4 rounded-2xl border-l-4 border-red-500 bg-white px-5 py-4 shadow-md">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Something went wrong</h3>
              <p className="text-sm text-slate-700">{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={loadCompanies}
              className="rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {status === 'success' && (
          <>
            <div className="text-sm font-medium text-slate-600">
              Showing{' '}
              <span className="font-semibold text-slate-900">{resultRangeLabel}</span> of{' '}
              <span className="font-semibold text-slate-900">
                {filteredCompanies.length}
              </span>{' '}
              matches (
              <span className="font-semibold text-slate-900">{companies.length}</span>{' '}
              total)
            </div>

            {filteredCompanies.length > 0 ? (
              <>
                <CompanyList companies={paginatedCompanies} />
                {totalPages > 1 && (
                  <PaginationControls
                    currentPage={currentPage}
                    totalResults={filteredCompanies.length}
                    pageSize={PAGE_SIZE}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="rounded-3xl bg-white px-6 py-10 text-center shadow-xl">
                <h3 className="mb-1 text-lg font-semibold text-slate-900">
                  No companies match your filters
                </h3>
                <p className="mb-4 text-sm text-slate-600">
                  Try searching for a different term or clearing your filters.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Reset filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App
