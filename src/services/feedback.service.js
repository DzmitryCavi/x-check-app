import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { format } from 'date-fns'
import { API_URL } from '../config'

const getByRequestId = async (id) => {
  const { data: task, status } = await axios.get(`${API_URL}/feedbacks?requestId=${id}`)
  return status === 200 && task ? task : null
}

const create = async (feedback) => {
  const { data, status } = await axios.post(`${API_URL}/feedbacks`, {
    ...feedback,
    id: uuid(),
    created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
  return status === 201 && data ? data : null
}

const edit = async (feedback, id) => {
  await axios.patch(`${API_URL}/feedbacks/${id}`, {
    ...feedback,
  })
}

const destroyById = async (id) => {
  const { data, status } = await axios.delete(`${API_URL}/feedbacks/${id}`)
  return status === 200 ? data : null
}

export default {
  create,
  edit,
  destroyById,
  getByRequestId,
}
