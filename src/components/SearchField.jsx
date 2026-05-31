function SearchField({ className = '', placeholder = 'Search products', value, onChange, onClear }) {
  return (
    <label className={`search-field ${className}`.trim()}>
      <span className="sr-only">Search products</span>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={placeholder}
      />
      {value && onClear ? (
        <button type="button" className="search-clear" onClick={onClear} aria-label="Clear search">
          ×
        </button>
      ) : null}
    </label>
  )
}

export default SearchField