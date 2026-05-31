import { createContext, useContext, useMemo, useState } from 'react'

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('')

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      clearSearch: () => setSearchQuery(''),
    }),
    [searchQuery]
  )

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}