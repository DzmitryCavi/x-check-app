import React, { useState } from 'react'
import { useAsync } from 'react-use'
import PropTypes from 'prop-types'
import { Select, Spin, Tag } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import RequestForm from '../../../component/forms/RequestFrom/RequestForm'
import tasksService from '../../../services/tasks.service'
import requestService from '../../../services/requests.service'

const { Option } = Select
const Reqest = ({ user }) => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isNewRequest, setIsNewRequest] = useState(true)

  const statusIsActive = ({ startDate, endDate }) => {
    const start = startDate ? moment(startDate) : null
    const end = endDate ? moment(endDate) : null
    const date = moment()
    return (
      (start && end && date.isBetween(start, endDate)) ||
      (start && !end && date.isAfter(start)) ||
      (!start && end && date.isBefore(end))
    )
  }

  useAsync(async () => {
    if (isNewRequest) {
      setIsLoading(true)
      const taskResponse = await tasksService.getAll({ state: 'PUBLISHED' })
      const requestsResponse = await requestService.getByAuthor(user.login)
      const tasksToSelect = requestsResponse
        .reduce((ac, request) => ac.filter(({ id }) => id !== request.taskId), taskResponse)
        .filter(({ startDate, endDate }) => statusIsActive({ startDate, endDate }))

      setTasks(tasksToSelect)
      setIsLoading(false)
    }
    setIsNewRequest(false)
  }, [isNewRequest, user])

  const children = tasks.map(({ id, title, assessmentType }) => (
    <Option key={id}>
      <Tag
        style={{ width: 100, textAlign: 'center' }}
        color={assessmentType === 'MENTOR' ? 'green' : 'pink'}
      >
        {assessmentType}
      </Tag>{' '}
      {title}
    </Option>
  ))

  const [task, changeTask] = useState()

  const handleChange = (selected) => {
    const selectedTask = tasks.find(({ id }) => id === +selected)
    changeTask(selectedTask)
  }

  return (
    <div className="sent-request-page">
      <h1 className="page-title">Sent Request</h1>
      <Select
        size="large"
        defaultValue="Select a task"
        onChange={handleChange}
        style={{ width: '100%' }}
      >
        {!isLoading ? (
          children
        ) : (
          <Option>
            <Spin style={{ display: 'block', margin: '0 auto' }} />
          </Option>
        )}
      </Select>
      {task ? <RequestForm task={task} setIsNewRequest={setIsNewRequest} /> : <></>}
    </div>
  )
}

Reqest.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, null)(Reqest)
