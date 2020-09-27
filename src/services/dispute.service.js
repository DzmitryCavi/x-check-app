import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { format } from 'date-fns'
import { API_URL } from '../config'

const getAll = async () => {
  const { data: tasks, status } = await axios.get(`${API_URL}/dispute`)
  return status === 200 && tasks ? tasks : []
}

const getById = async (id) => {
  const { data: task, status } = await axios.get(`${API_URL}/dispute/${id}`)
  return status === 200 && task ? task : null
}

const getByReviewId = async (id) => {
  const { data: task, status } = await axios.get(`${API_URL}/dispute?reviewId=${id}`)
  return status === 200 && task ? task : null
}

const create = async (dispute) => {
  const { data, status } = await axios.post(`${API_URL}/dispute`, {
    ...dispute,
    id: `dispute-${uuid()}`,
    created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    updated_at: null,
    closed_at: null,
  })
  return status === 201 && data ? data : null
}

const edit = async (dispute, id) => {
  await axios.patch(`${API_URL}/dispute/${id}`, {
    ...dispute,
    updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
}

const destroyById = async (id) => {
  const { data, status } = await axios.delete(`${API_URL}/reviews/${id}`)
  return status === 200 ? data : null
}

export default {
  getAll,
  create,
  edit,
  destroyById,
  getById,
  getByReviewId,
}
