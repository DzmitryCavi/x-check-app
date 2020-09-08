import React from 'react'
import { Table, Button, Space } from 'antd'

const dataSource = [
  {
    key: 1,
    task: 'Songbird',
    student: 'multeng',
    reviewer: 'ButterBrot777',
    score: 30,
    max_score: 30,
  },
  {
    key: 2,
    task: 'X-check',
    student: 'GurbanovAli',
    reviewer: 'cardamo',
    score: 20,
    max_score: 30,
  },
  {
    key: 3,
    task: 'Codewars React',
    student: 'Ftorik',
    reviewer: 'torvalds',
    score: 10,
    max_score: 30,
  },
]

class MarksList extends React.Component {
  constructor() {
    super()
    this.state = {
      filteredInfo: null,
    }
  }

  handleChange = (pagination, filters) => {
    this.setState({
      filteredInfo: filters,
    })
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null })
  }

  render() {
    let { filteredInfo } = this.state
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
        dataIndex: 'max_score',
        sorter: {
          compare: (a, b) => a.max_score - b.max_score,
          multiple: 1,
        },
      },
      {
        title: 'Action',
        dataindex: 'action',
        render: () => (
          <Button type="primary" size="large">
            Info
          </Button>
        ),
      },
    ]
    return (
      <>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={this.clearFilters}>Clear filters</Button>
        </Space>
        <Table columns={columns} dataSource={dataSource} onChange={this.handleChange} />
      </>
    )
  }
}

export default MarksList
