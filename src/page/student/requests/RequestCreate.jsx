import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select, Spin } from 'antd'
import { connect } from 'react-redux'
import RequestForm from '../../../component/forms/RequestFrom/RequestForm'
import tasksService from '../../../services/tasks.service'
import requestService from '../../../services/requests.service'

const { Option } = Select

const Reqest = ({ user }) => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isNewRequest, setIsNewRequest] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const taskResponse = await tasksService.getAll({ state: 'PUBLISHED' })
      const requestsResponse = await requestService.getByAuthor(user.login)
      setTasks(
        requestsResponse.reduce(
          (ac, request) => ac.filter((task) => task.id !== request.task),
          taskResponse,
        ),
      )
    }
    if (isNewRequest) {
      setIsLoading(true)
      fetchData()
      setIsLoading(false)
      setIsNewRequest(false)
    }
  }, [isNewRequest, user])

  const children = tasks.map((el) => <Option key={el.id}>{el.title}</Option>)

  const [task, changeTask] = useState()

  const handleChange = (selected) => {
    const selectedTask = tasks.find((el) => el.id === +selected)
    changeTask(selectedTask)
  }
  return (
    <>
      <Select
        size="large"
        defaultValue="Select a task"
        onChange={handleChange}
        style={{ width: 200 }}
      >
        {!isLoading ? (
          children
        ) : (
          <Option>
            <Spin />
          </Option>
        )}
      </Select>
      {task ? <RequestForm task={task} setIsNewRequest={setIsNewRequest} /> : <></>}
    </>
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
