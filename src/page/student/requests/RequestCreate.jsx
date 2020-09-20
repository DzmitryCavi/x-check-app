import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import SelfReview from '../../../component/forms/SelfReview'
import tasksService from '../../../services/tasks.service'

const { Option } = Select

const Reqest = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    tasksService.getAllPublished().then(setTasks)
  }, [])

  const children = tasks.map((el) => <Option key={el.id}>{el.title}</Option>)

  const [task, changeTask] = useState()

  const handleChange = (selected) => {
    changeTask(tasks[selected - 1])
  }
  return (
    <div>
      <Select
        size="large"
        defaultValue="Таски тут ..."
        onChange={handleChange}
        style={{ width: 200 }}
      >
        {children}
      </Select>
      {task ? <SelfReview task={task} /> : <div>Выберите таску</div>}
    </div>
  )
}

export default Reqest
