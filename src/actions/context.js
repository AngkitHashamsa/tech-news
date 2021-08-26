import React, { useContext, useReducer, useEffect } from 'react'
import {
  SET_LOADING,
  GET_HITS,
  REMOVE_ARTICLE,
  HANDLE_SEARCH,
  HANDLE_PAGE,
} from './action'
import { reducer } from './reducer'
const End_Point = `http://hn.algolia.com/api/v1/search?`
const AppContext = React.createContext()
const initialState = {
  isLoading: false,
  hits: [],
  page: 0,
  nbPages: 0,
  query: 'react',
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const fetchData = async (url) => {
    dispatch({ type: SET_LOADING })
    try {
      const res = await fetch(url)
      const data = await res.json()

      dispatch({
        type: GET_HITS,
        payload: { hits: data.hits, page: data.page, nbPages: data.nbPages },
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData(`${End_Point}query=${state.query}&page=${state.page}`)
  }, [state.query, state.page])

  // *remove article
  const removeArticle = (id) => {
    console.log(id)
    dispatch({ type: REMOVE_ARTICLE, payload: id })
  }
  //* Handle_query
  const handleQuery = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query })
  }
  // *HANDLE PAGE
  const handlePage = (page) => {
    dispatch({ type: HANDLE_PAGE, payload: page })
  }
  return (
    <AppContext.Provider
      value={{ ...state, removeArticle, handleQuery, handlePage }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext)
}
export { useGlobalContext, AppProvider }
