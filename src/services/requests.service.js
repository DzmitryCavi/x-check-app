import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { format } from 'date-fns'
import { API_URL } from '../config'

const getAll = async () => {
  const { data: tasks, status } = await axios.get(`${API_URL}/reviewRequest`)
  return status === 200 && tasks ? tasks : []
}

const getAllPublished = async () => {
  const { data: tasks, status } = await axios.get(`${API_URL}/reviewRequest?state=PUBLISHED`)
  return status === 200 && tasks ? tasks : []
}

const getByAuthor = async (author) => {
  const { data: task, status } = await axios.get(`${API_URL}/reviewRequest?author=${author}`)
  return status === 200 && task ? task : null
}

const getById = async (id) => {
  const { data: task, status } = await axios.get(`${API_URL}/reviewRequest/${id}`)
  return status === 200 && task ? task : null
}

const create = async (request, author = -1) => {
  const { data, status } = await axios.post(`${API_URL}/reviewRequest`, {
    ...request,
    author,
    id: `request-${uuid()}`,
    created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    updated_at: null,
    closed_at: null,
  })
  return status === 201 && data ? data : null
}

const edit = async (request, requestId) => {
  await axios.patch(`${API_URL}/reviewRequest/${requestId}`, {
    ...request,
    updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
}

const destroyById = async (id) => {
  const { data, status } = await axios.delete(`${API_URL}/reviewRequest/${id}`)
  return status === 200 ? data : null
}

export default {
  getAll,
  getByAuthor,
  create,
  edit,
  destroyById,
  getAllPublished,
  getById,
}
