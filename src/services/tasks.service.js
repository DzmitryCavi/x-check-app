import axios from 'axios'
import { API_URL } from '../config'

const getAll = async () => {
  const { data: tasks, status } = await axios.get(`${API_URL}/tasks`)
  return status === 200 && tasks ? tasks : []
}

// const getById = async (id) => {}

// const create = async (task) => {}

// const edit = async (task) => {}

// const destroyById = async (id) => {}

export default {
  getAll,
  //   getById,
  //   create,
  //   edit,
  //   destroyById,
}
