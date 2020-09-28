import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { DatePicker, Space, Spin } from 'antd'

import tasksService from '../services/tasks.service'

const TaskDateConstraints = ({ task, onChange }) => {
  const [isBusy, setIsBusy] = useState(false)
  const сhangeDateConstraints = async (taskId, dateRange) => {
    setIsBusy(true)
    const { startDate, endDate } = await tasksService.сhangeDateConstraints(taskId, dateRange)

    onChange(taskId, { startDate, endDate })
    setIsBusy(false)
  }
  return (
    <Space size="middle" className="start-end-date-task">
      <DatePicker.RangePicker
        defaultValue={[
          task.startDate ? moment(task.startDate) : null,
          task.endDate ? moment(task.endDate) : null,
        ]}
        allowEmpty={[true, true]}
        onChange={(dateRange) => сhangeDateConstraints(task.id, dateRange)}
        showTime
      />
      {isBusy ? <Spin style={{ marginTop: 5 }} /> : null}
    </Space>
  )
}

TaskDateConstraints.defaultProps = {
  onChange: () => {},
}

TaskDateConstraints.propTypes = {
  task: PropTypes.instanceOf(Object).isRequired,
  onChange: PropTypes.func,
}

export default TaskDateConstraints
