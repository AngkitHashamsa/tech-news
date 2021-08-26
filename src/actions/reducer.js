import {
  SET_LOADING,
  GET_HITS,
  REMOVE_ARTICLE,
  HANDLE_SEARCH,
  HANDLE_PAGE,
} from './action'

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true }
    case GET_HITS:
      return {
        ...state,
        hits: action.payload.hits,
        page: action.payload.page,
        nbPages: action.payload.nbPages,
        isLoading: false,
      }
    case REMOVE_ARTICLE:
      const newHits = state.hits.filter(
        (item) => item.objectID !== action.payload
      )
      return { ...state, hits: newHits }
    case HANDLE_SEARCH:
      return { ...state, query: action.payload }

    case HANDLE_PAGE:
      if (action.payload === 'inc') {
        let nextPage = state.page + 1
        if (nextPage > state.nbPages - 1) {
          nextPage = 0
        }
        return { ...state, page: nextPage }
      }
      if (action.payload === 'dec') {
        let prevPage = state.page - 1
        if (prevPage < 0) {
          prevPage = state.nbPages - 1
        }
        return { ...state, page: prevPage }
      }

    default:
      throw new Error(`action doesn't match ${action.type} action`)
  }
}
