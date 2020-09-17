import React, { useState } from 'react'
import { Table, Button, Space } from 'antd'
import fakeData from './fakeData'
import MarkInfo from './MarkInfo'

const MarksList = () => {
  const [state, setState] = useState({
    filteredInfo: null,
  })

  const handleChange = (pagination, filters) => {
    setState({ ...state, filteredInfo: filters })
  }

  const clearFilters = () => {
    setState({ ...state, filteredInfo: null })
  }

  let { filteredInfo } = state
  filteredInfo = filteredInfo || {}
  const columns = [
    {
      title: 'Task',
      dataIndex: 'task',
      filters: [
        { text: 'Songbird', value: 'Songbird' },
        { text: 'X-check', value: 'X-check' },
      ],
      filteredValue: filteredInfo.task || null,
      onFilter: (value, record) => record.task.includes(value),
    },
    {
      title: 'Student',
      dataIndex: 'student',
      filters: [
        { text: 'multeng', value: 'multeng' },
        { text: 'GurbanovAli', value: 'GurbanovAli' },
      ],
      filteredValue: filteredInfo.student || null,
      onFilter: (value, record) => record.student.includes(value),
    },
    {
      title: 'Reviewer',
      dataIndex: 'reviewer',
      filters: [
        { text: 'ButterBrot777', value: 'ButterBrot777' },
        { text: 'cardamo', value: 'cardamo' },
      ],
      filteredValue: filteredInfo.reviewer || null,
      onFilter: (value, record) => record.reviewer.includes(value),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      sorter: {
        compare: (a, b) => a.score - b.score,
        multiple: 1,
      },
    },
    {
      title: 'Max Score',
      dataIndex: 'maxScore',
      sorter: {
        compare: (a, b) => a.maxScore - b.maxScore,
        multiple: 1,
      },
    },
    {
      title: 'Action',
      dataindex: 'action',
      render: (row) => <MarkInfo data={row} />,
    },
  ]
  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={clearFilters}>Clear filters</Button>
      </Space>
      <Table columns={columns} dataSource={fakeData} onChange={handleChange} />
    </>
  )
}

export default MarksList
