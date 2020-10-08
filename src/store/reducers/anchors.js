import * as types from '../types/anchors'

const initialState = {
  list: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ANCHORS: {
      return { list: action.payload }
    }
    case types.CLEAR_ANCHORS: {
      return { list: [] }
    }
    default:
      return state
  }
}

export default reducer
