import axios from 'axios'
import slug from 'slug'
import { format } from 'date-fns'
import { API_URL, SERVER_URL } from '../config'

const getAllByAuthorId = async (authorId) => {
  const { data: tasks, status } = await axios.get(`${API_URL}/tasks?authorId=${authorId}`)
  return status === 200 && tasks ? tasks : []
}

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
    created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    updated_at: null,
    categories: [],
  })
  return status === 201 && data ? data : null
}

const edit = async (task, taskId) => {
  await axios.patch(`${API_URL}/tasks/${taskId}`, {
    ...task,
    slug: slug(task.title),
    updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
}

const destroyById = async (id) => {
  const { data, status } = await axios.delete(`${API_URL}/tasks/${id}`)
  return status === 200 ? data : null
}

const importTasks = async (file, authorId, type) => {
  const formData = new FormData()
  formData.append('authorId', authorId)
  formData.append('file', file)
  await axios.post(`${SERVER_URL}/tasks/import?type=${type}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

const exportById = async (taskId, type = 'rss') => {
  // type = rss | custom | md
  window.location.href = `${SERVER_URL}/tasks/${taskId}/export?type=${type}`
}

const exportAll = async (authorId, type = 'rss') => {
  // type = rss | custom
  window.location.href = `${SERVER_URL}/tasks/export?authorId=${authorId}&type=${type}`
}

export default {
  getAllByAuthorId,
  getAll,
  getById,
  create,
  edit,
  destroyById,
  getAllPublished,
  importTasks,
  exportById,
  exportAll,
}
