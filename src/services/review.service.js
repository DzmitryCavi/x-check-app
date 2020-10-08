import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { format } from 'date-fns'
import { API_URL } from '../config'

const getAll = async () => {
  const { data: tasks, status } = await axios.get(`${API_URL}/reviews`)
  return status === 200 && tasks ? tasks : []
}

const getAllGraded = async () => {
  const { data: tasks, status } = await axios.get(
    `${API_URL}/reviews?state=GRADED&state=DISPUTE&state=ACCEPTED`,
  )
  return status === 200 && tasks ? tasks : []
}

const getAllGradedByAuthor = async (author) => {
  const { data: tasks, status } = await axios.get(`${API_URL}/reviews?author=${author}`)
  return status === 200 && tasks ? tasks : []
}

const getById = async (id) => {
  const { data: task, status } = await axios.get(`${API_URL}/reviews/${id}`)
  return status === 200 && task ? task : null
}

const getByRequestId = async (id) => {
  const { data: task, status } = await axios.get(`${API_URL}/reviews?requestId=${id}`)
  return status === 200 && task ? task : null
}

const create = async (review, author = -1) => {
  const { data, status } = await axios.post(`${API_URL}/reviews`, {
    ...review,
    author,
    id: `review-${uuid()}`,
    created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    updated_at: null,
    closed_at: null,
  })
  return status === 201 && data ? data : null
}

const edit = async (review, reviewId) => {
  await axios.patch(`${API_URL}/reviews/${reviewId}`, {
    ...review,
    updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
}

const destroyById = async (id) => {
  const { data, status } = await axios.delete(`${API_URL}/reviews/${id}`)
  return status === 200 ? data : null
}

export default {
  getAllGradedByAuthor,
  getAllGraded,
  getAll,
  create,
  edit,
  destroyById,
  getById,
  getByRequestId,
}
