import axios from 'axios'
import slug from 'slug'
import { API_URL } from '../config'

const getAllByTaskId = async (taskId = -1) => {
  const { data: categories, status } = await axios.get(`${API_URL}/tasks/${taskId}/categories`)
  return status === 200 && categories ? categories : []
}

const getById = async (id) => {
  const { data: task, status } = await axios.get(`${API_URL}/categories/${id}`)
  return status === 200 && task ? task : null
}

const create = async (category, taskId = -1) => {
  await axios.post(`${API_URL}/tasks/${taskId}/categories`, {
    ...category,
    slug: slug(category.title),
  })
}

const edit = async (category, categoryId) => {
  await axios.patch(`${API_URL}/categories/${categoryId}`, {
    ...category,
    slug: slug(category.title),
  })
}

const destroyById = async (id) => {
  const { data, status } = await axios.delete(`${API_URL}/categories/${id}`)
  return status === 200 ? data : null
}

export default {
  getAllByTaskId,
  getById,
  create,
  edit,
  destroyById,
}
