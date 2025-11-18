import { useCallback, useEffect, useMemo, useState } from 'react'
import CompanyFilters from './components/CompanyFilters.jsx'
import CompanyList from './components/CompanyList.jsx'
import PaginationControls from './components/PaginationControls.jsx'

const defaultFilters = {
  search: '',
  id: '',
  name: '',
  location: 'all',
  industry: 'all',
  size: 'all',
}

const PAGE_SIZE = 6
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8888/api'

function App() {
  const [companies, setCompanies] = useState([])
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [filters, setFilters] = useState(defaultFilters)
  const [currentPage, setCurrentPage] = useState(1)

  const loadCompanies = useCallback(async (filterParams = filters) => {
    setStatus('loading')
    setErrorMessage('')
    try {
      const params = new URLSearchParams()

      // ⭐ SAFE ID FILTER
      if (filterParams.id && filterParams.id.trim()) {
        params.append('id', filterParams.id.trim())
      }

      // ⭐ SAFE EXACT NAME FILTER
      if (filterParams.name && filterParams.name.trim()) {
        params.append('name', filterParams.name.trim())
      }

      // ⭐ SAFE PARTIAL SEARCH FILTER
      if (filterParams.search && filterParams.search.trim()) {
        params.append('search', filterParams.search.trim())
      }

      if (filterParams.location !== 'all') {
        params.append('location', filterParams.location)
      }
      if (filterParams.industry !== 'all') {
        params.append('industry', filterParams.industry)
      }
      if (filterParams.size !== 'all') {
        params.append('size', filterParams.size)
      }

      const url = `${API_BASE_URL}/companies${
        params.toString() ? `?${params.toString()}` : ''
      }`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Backend returned HTTP ${response.status}`)
      }

      const result = await response.json()
      const companiesData = result.data || []

      setCompanies(companiesData)
      setStatus('success')
    } catch (error) {
      setErrorMessage(error.message)
      setStatus('error')
    }
  }, [])

  // Load once
  useEffect(() => {
    loadCompanies(filters)
  }, [])

  // Reload when filters change
  useEffect(() => {
    const timer = setTimeout(() => loadCompanies(filters), filters.search ? 500 : 0)
    return () => clearTimeout(timer)
  }, [filters, loadCompanies])

  const uniqueFilters = useMemo(() => {
    const locations = Array.from(new Set(companies.map((c) => c.location))).sort()
    const industries = Array.from(new Set(companies.map((c) => c.industry))).sort()
    const sizes = Array.from(new Set(companies.map((c) => c.size))).sort()
    return { locations, industries, sizes }
  }, [companies])

  const totalPages = Math.max(1, Math.ceil(companies.length / PAGE_SIZE))

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages))
  }, [companies, totalPages])

  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    return companies.slice(startIndex, startIndex + PAGE_SIZE)
  }, [companies, currentPage])

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
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-8">

        <header>
          <h1 className="text-3xl font-semibold">Company Explorer</h1>
        </header>

        <CompanyFilters
          filters={filters}
          options={uniqueFilters}
          onChange={handleFilterChange}
          onReset={handleReset}
        />

        {status === 'loading' && <p>Loading...</p>}
        {status === 'error' && <p className="text-red-600">{errorMessage}</p>}

        {status === 'success' && (
          <>
            <CompanyList companies={paginatedCompanies} />

            {totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalResults={companies.length}
                pageSize={PAGE_SIZE}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App
