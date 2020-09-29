import axios from 'axios'
import slug from 'slug'
import { format } from 'date-fns'
import { API_URL, SERVER_URL } from '../config'

const getTasksQueryParams = (params) => {
  const { pagination, filters, ...other } = params

  const queryOtherParams = []
  Object.keys(other).forEach((key) => {
    queryOtherParams.push(`${key}=${other[key]}`)
  })

  const queryFiltersParams = []
  if (filters) {
    const { title, state } = filters
    queryFiltersParams.push(`title_like=${title}`, `state_like=${state}`)
  }

  const queryPaginationParams = []
  if (pagination) {
    const { current, pageSize } = pagination
    queryPaginationParams.push(`_page=${current}`, `_limit=${pageSize}`)
  }

  const queryParams = [...queryPaginationParams, ...queryFiltersParams, ...queryOtherParams].join(
    '&',
  )

  return queryParams ? `?${queryParams}` : ''
}

/**
 * Get All Tasks - pagination && filters (optionals)
 * @param {Object} pagination
 * @param {Object} filters
 * @param  {...any} other
 */
const getAll = async ({ pagination, filters, ...other } = {}) => {
  const queryParams = getTasksQueryParams({ pagination, filters, ...other })

  const { data, status, headers } = await axios.get(`${API_URL}/tasks${queryParams}`)
  const isSuccess = status === 200 && data

  if (!pagination) return isSuccess ? data : []

  return {
    data: isSuccess ? data : [],
    pagination: {
      ...pagination,
      total: isSuccess ? headers['x-total-count'] : 0,
    },
  }
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
    state: 'DRAFT',
    categories: [],

    startDate: null,
    endDate: null,

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
  const { data } = await axios.post(`${SERVER_URL}/tasks/import?type=${type}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
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

  const {
    data: { id, startDate, endDate },
    status,
  } = await axios.patch(`${API_URL}/tasks/${taskId}`, {
    startDate: start ? start.format('YYYY-MM-DD HH:mm:ss') : null,
    endDate: end ? end.format('YYYY-MM-DD HH:mm:ss') : null,
  })

  return status === 200 && id ? { startDate, endDate } : { startDate: null, endDate: null }
}

export default {
  getAll,
  getById,
  create,
  edit,
  destroyById,
  importTasks,
  exportById,
  exportAll,
  сhangeDateConstraints,
}
