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
  //   state = {
  //     filteredInfo: null,
  //     sortedInfo: null,
  //   }

  //   handleChange = (pagination, filters, sorter) => {
  //     console.log('Various parameters', pagination, filters, sorter)
  //     this.setState({
  //       filteredInfo: filters,
  //       sortedInfo: sorter,
  //     })
  //   }

  //   clearFilters = () => {
  //     this.setState({ filteredInfo: null })
  //   }

  render() {
    // let { sortedInfo, filteredInfo } = this.state
    // sortedInfo = sortedInfo || {}
    // filteredInfo = filteredInfo || {}
    const columns = [
      {
        title: 'Task',
        dataIndex: 'task',
      },
      {
        title: 'Student',
        dataIndex: 'student',
      },
      {
        title: 'Reviewer',
        dataIndex: 'reviewer',
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
