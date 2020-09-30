import React, { useState } from 'react'
import { useAsync } from 'react-use'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import RequestForm from '../../../component/forms/RequestFrom/RequestForm'
import requestService from '../../../services/requests.service'
import tasksService from '../../../services/tasks.service'

const Reqest = () => {
  const [request, setRequest] = useState(null)
  const [task, setTask] = useState(null)
  const { requestId } = useParams()

  useAsync(async () => {
    const requestResponse = await requestService.getById(requestId)
    const taskResponse = await tasksService.getById(requestResponse.taskId)
    setRequest(requestResponse)
    setTask(taskResponse)
  }, [requestId])

  return (
    <div className="edit-request-page">
      <h1 className="page-title">Edit Request</h1>
      {task ? <RequestForm task={task} requestToEdit={request} /> : <Spin />}
    </div>
  )
}

export default Reqest
