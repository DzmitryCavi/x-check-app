import axios from 'axios'
import { API_URL } from '../config'

const getAllMarks = async () => {
  const { data: marks, status } = await axios.get(`${API_URL}/reviews`)
  return status === 200 && marks ? marks : []
}

const getMarksById = async (id) => {
  const { data: marks, status } = await axios.get(`${API_URL}/review/${id}`)
  return status === 200 && marks ? marks : null
}

export default { getAllMarks, getMarksById }
