import axios from 'axios'
import slug from 'slug'
import { API_URL } from '../config'

const getAll = async () => {
  const { data: tasks, status } = await axios.get(`${API_URL}/tasks`)
  return status === 200 && tasks ? tasks : []
}

const getById = async (id) => {
  const { data: task, status } = await axios.get(`${API_URL}/tasks/${id}`)
  return status === 200 && task ? task : null
}

const create = async (task, authorId = -1) => {
  await axios.post(`${API_URL}/tasks`, {
    ...task,
    authorId,
    slug: slug(task.title),
    state: 'PUBLISHED',
  })
}

const edit = async (task, taskId) => {
  await axios.patch(`${API_URL}/tasks/${taskId}`, {
    ...task,
    slug: slug(task.title),
    state: 'PUBLISHED',
  })
}

const destroyById = async (id) => {
  const { data, status } = await axios.delete(`${API_URL}/tasks/${id}`)
  return status === 200 ? data : null
}

export default {
  getAll,
  getById,
  create,
  edit,
  destroyById,
}
