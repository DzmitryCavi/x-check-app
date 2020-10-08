import * as types from '../types/anchors'

export const setAnchors = (anchors) => ({
  type: types.SET_ANCHORS,
  payload: anchors,
})

export const clearAnchors = () => ({
  type: types.CLEAR_ANCHORS,
})
