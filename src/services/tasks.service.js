import axios from 'axios'
import slug from 'slug'
import { API_URL } from '../config'

const getAll = async () => {
  const { data: tasks, status } = await axios.get(`${API_URL}/tasks`)
  return status === 200 && tasks ? tasks : []
}

const getAllPublished = async () => {
  const { data: tasks, status } = await axios.get(`${API_URL}/tasks?state=PUBLISHED`)
  return status === 200 && tasks ? tasks : []
}

const getById = async (id) => {
  const { data: task, status } = await axios.get(`${API_URL}/tasks/${id}`)
  return status === 200 && task ? task : null
}

const create = async (task, authorId = -1) => {
  const { data, status } = await axios.post(`${API_URL}/tasks`, {
    ...task,
    authorId,
    slug: slug(task.title),
    state: 'PUBLISHED',
  })
  return status === 201 && data ? data : null
}

const edit = async (task, taskId) => {
  await axios.patch(`${API_URL}/tasks/${taskId}`, {
    ...task,
    slug: slug(task.title),
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
  getAllPublished,
}
