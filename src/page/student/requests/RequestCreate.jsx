import React, { useState, useEffect } from 'react'
import { Select, Spin } from 'antd'
import RequestForm from '../../../component/forms/RequestForm'
import tasksService from '../../../services/tasks.service'
import requestService from '../../../services/requests.service'

const { Option } = Select

const Reqest = () => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isNewRequest, setIsNewRequest] = useState(true)

  const fetchData = async () => {
    const taskResponse = await tasksService.getAllPublished()
    const requestsResponse = await requestService.getAll()
    setTasks(
      requestsResponse.reduce(
        (ac, request) => ac.filter((task) => task.id !== request.task),
        taskResponse,
      ),
    )
  }

  useEffect(() => {
    if (isNewRequest) {
      setIsLoading(true)
      fetchData()
      setIsLoading(false)
      setIsNewRequest(false)
    }
  }, [isNewRequest])

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

export default Reqest
