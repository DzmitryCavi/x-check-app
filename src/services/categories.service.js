import axios from 'axios'
import slug from 'slug'
import { v4 as uuid } from 'uuid'
import { format } from 'date-fns'
import { API_URL } from '../config'

const getMaxScore = (category) => {
  return category.criteria.reduce(
    (acc, curr) => (Number(curr.score) > 0 ? acc + Number(curr.score) : curr),
    0,
  )
}

const getAllByTaskId = async (taskId = -1) => {
  const { data: categories, status } = await axios.get(`${API_URL}/tasks/${taskId}/categories`)
  return status === 200 && categories ? categories : []
}

const getById = async (id) => {
  const { data: task, status } = await axios.get(`${API_URL}/categories/${id}`)
  return status === 200 && task ? task : null
}

/**
 * Create category
 * @param {Object} task
 * @param {Object} category
 */
const create = async (task, category) => {
  const { data, status } = await axios.patch(`${API_URL}/tasks/${task.id}`, {
    ...task,
    categories: [
      ...task.categories,
      {
        ...category,
        id: uuid(),
        slug: slug(category.title),
        maxScore: getMaxScore(category),
        created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        updated_at: null,
      },
    ],
  })

  return status === 200 ? data : task
}

/**
 * Edit category
 * @param {Object} task
 * @param {Object} payload - category
 * @param {String|Number} categoryId
 */
const edit = async (task, payload, categoryId) => {
  const { data, status } = await axios.patch(`${API_URL}/tasks/${task.id}`, {
    ...task,
    categories: task.categories.map((category) => {
      if (category.id !== categoryId) return category
      return {
        ...category,
        ...payload,
        slug: slug(payload.title),
        maxScore: getMaxScore(category),
        updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      }
    }),
  })

  return status === 200 ? data : task
}

const destroyById = async (task, categoryId) => {
  const { data, status } = await axios.patch(`${API_URL}/tasks/${task.id}`, {
    ...task,
    categories: task.categories.filter((category) => category.id !== categoryId),
  })
  return status === 200 ? data : task
}

export default {
  getAllByTaskId,
  getById,
  create,
  edit,
  destroyById,
}
