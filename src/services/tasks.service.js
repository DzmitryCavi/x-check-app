import axios from 'axios'
import slug from 'slug'
import { format } from 'date-fns'
import { API_URL, SERVER_URL } from '../config'

const getAllByAuthorId = async (authorId, { title, state } = { title: '', state: '' }) => {
  const queryParams = [`authorId=${authorId}`, `title_like=${title}`, `state_like=${state}`]
  const { data: tasks, status } = await axios.get(`${API_URL}/tasks?${queryParams.join('&')}`)
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
    categories: [],

    start_date: null,
    end_date: null,

    created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    updated_at: null,
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

/**
 * Change Date Constraints
 * @param {[moment || null, moment || null] || null} date
 */
const сhangeDateConstraints = async (taskId, dateRange) => {
  const [start, end] = dateRange || [null, null]

  await axios.patch(`${API_URL}/tasks/${taskId}`, {
    startDate: start ? start.format('YYYY-MM-DD HH:mm:ss') : null,
    endDate: end ? end.format('YYYY-MM-DD HH:mm:ss') : null,
  })
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
  сhangeDateConstraints,
}
