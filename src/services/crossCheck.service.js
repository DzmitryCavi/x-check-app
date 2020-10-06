import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { format } from 'date-fns'
import { API_URL } from '../config'

const getAll = async () => {
  const { data, status } = await axios.get(`${API_URL}/crossCheckSession`)
  return status === 200 && data ? data : []
}

const getById = async (id) => {
  const { data, status } = await axios.get(`${API_URL}/crossCheckSession/${id}`)
  return status === 200 && data ? data : []
}

const getByTaskId = async (taskId) => {
  const { data, status } = await axios.get(`${API_URL}/crossCheckSession?taskId=${taskId}`)
  return status === 200 && data ? data.pop() : null
}

const create = async (taskId) => {
  const { data, status } = await axios.post(`${API_URL}/crossCheckSession`, {
    id: uuid(),
    taskId,
    students: [],
    createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    closedAt: null,
  })

  return status === 201 && data ? data : null
}

const edit = async (session, id) => {
  const { data, status } = await axios.patch(`${API_URL}/crossCheckSession/${id}`, {
    ...session,
    updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
  return status === 200 ? data : null
}

const addStudent = async (name, taskId, requestId) => {
  const session = await getByTaskId(taskId)
  return edit(
    {
      students: [...session.students, { id: uuid(), requestId, name, reviewGroup: [] }],
    },
    session.id,
  )
}

const openById = async (id) => {
  if (!id) return false
  const { data, status } = await axios.patch(`${API_URL}/crossCheckSession/${id}`, {
    closedAt: null,
  })
  return status === 200 && data ? data : null
}
const closeById = async (id) => {
  if (!id) return false
  const { data, status } = await axios.patch(`${API_URL}/crossCheckSession/${id}`, {
    closedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
  return status === 200 && data ? data : null
}

const destroyById = async (id) => {
  if (!id) return false
  const { status } = await axios.delete(`${API_URL}/crossCheckSession/${id}`)
  return status === 200 ? id : null
}

const startReviewsById = async (id) => {
  const session = await getById(id)

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))

      // eslint-disable-next-line no-param-reassign
      ;[a[i], a[j]] = [a[j], a[i]]
    }

    return a
  }

  const result = [...session.students]
  const students = shuffle(session.students).reduce(
    (ac, el) => ac.concat([el.name, el.name, el.name, el.name]),
    [],
  )

  let counter = 0

  while (students.length) {
    result[counter].group = result[counter].group.concat([students.pop()])
    counter += counter === result.length - 1 ? -counter : 1
  }

  return edit({ students: result }, id)
}

export default {
  startReviewsById,
  getAll,
  create,
  openById,
  getById,
  closeById,
  destroyById,
  addStudent,
}
