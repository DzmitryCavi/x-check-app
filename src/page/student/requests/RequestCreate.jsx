import React, { useState } from 'react'
import { Select } from 'antd'
import SelfReview from '../../../component/forms/SelfReview'

const { Option } = Select

const children = []
for (let i = 10; i < 36; i += 1) {
  children.push(<Option key={`task${i}`}>{`task${i}`}</Option>)
}

const Reqest = () => {
  const [task, changeTask] = useState()

  const handleChange = (props) => {
    changeTask(props)
  }

  return (
    <div>
      <Select size="large" defaultValue="task1" onChange={handleChange} style={{ width: 200 }}>
        {children}
      </Select>
      {task ? <SelfReview task={task} /> : <div>Выберите таску</div>}
    </div>
  )
}

export default Reqest
