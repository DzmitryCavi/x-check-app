import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import SelfReview from '../../../component/forms/SelfReview'
import requestService from '../../../services/requests.service'
import tasksService from '../../../services/tasks.service'

const Reqest = () => {
  const [request, setRequest] = useState(null)
  const [task, setTask] = useState(null)
  const { requestId } = useParams()
  console.log(task)
  useEffect(() => {
    const fatchData = async () => {
      const requestResponse = await requestService.getById(requestId)
      const taskResponse = await tasksService.getById(requestResponse.task)
      setRequest(requestResponse)
      setTask(taskResponse)
    }
    fatchData()
  }, [requestId])
  return <>{task ? <SelfReview task={task} requestToEdit={request} /> : <Spin />}</>
}

export default Reqest
