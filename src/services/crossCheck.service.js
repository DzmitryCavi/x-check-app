import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { format } from 'date-fns'
import { API_URL } from '../config'

const getAll = async () => {
  const { data, status } = await axios.get(`${API_URL}/crossCheckSession`)
  return status === 200 && data ? data : []
}

const create = async (taskId) => {
  const { data, status } = await axios.post(`${API_URL}/crossCheckSession`, {
    id: uuid(),
    taskId,
    students: [],
    createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    closedAt: null,
  })

  return status === 201 && data ? data : null
}

const openById = async (id) => {
  if (!id) return false
  const { data, status } = await axios.patch(`${API_URL}/crossCheckSession/${id}`, {
    closedAt: null,
  })
  return status === 200 && data ? data : null
}
const closeById = async (id) => {
  if (!id) return false
  const { data, status } = await axios.patch(`${API_URL}/crossCheckSession/${id}`, {
    closedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
  return status === 200 && data ? data : null
}

const destroyById = async (id) => {
  if (!id) return false
  const { status } = await axios.delete(`${API_URL}/crossCheckSession/${id}`)
  return status === 200 ? id : null
}

export default {
  getAll,
  create,
  openById,
  closeById,
  destroyById,
}
