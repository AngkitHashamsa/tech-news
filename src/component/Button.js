import React from 'react'
import { useGlobalContext } from '../actions/context'
const Button = () => {
  const { isLoading, page, nbPages, handlePage } = useGlobalContext()
  return (
    <div className='btn-container'>
      <button disabled={isLoading} onClick={() => handlePage('dec')}>
        prev
      </button>
      <p>
        {page + 1} | {nbPages}
      </p>
      <button disabled={isLoading} onClick={() => handlePage('inc')}>
        prev
      </button>
    </div>
  )
}

export default Button
