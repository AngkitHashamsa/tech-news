import React from 'react'
import { useGlobalContext } from '../actions/context'
const SearchForm = () => {
  const { handleQuery, query } = useGlobalContext()
  return (
    <form className='search-form'>
      <h2 className='title'>Search Hacker News</h2>
      <input
        type='text'
        className='form-input'
        value={query}
        onChange={(e) => handleQuery(e.target.value)}
      />
    </form>
  )
}

export default SearchForm
