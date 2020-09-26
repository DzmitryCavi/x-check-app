import React, { useState, useEffect } from 'react'
import { Table, Button, Space, Tag } from 'antd'
import { formatRoute } from 'react-router-named-routes'
import ButtonLink from '../../../component/ButtonLink'
import { courseManagerRoutes } from '../../../router/routes'

import rviewService from '../../../services/review.service'

const { Column } = Table

const MarksList = () => {
  const [marks, setMarks] = useState([])
  const [loading, setLoading] = useState(true)

  const [state, setState] = useState({
    filteredInfo: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      const markResponse = await rviewService.getAllGraded()
      setMarks(markResponse)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleChange = (pagination, filters) => {
    setState({ ...state, filteredInfo: filters })
  }

  const clearFilters = () => {
    setState({ ...state, filteredInfo: null })
  }

  const makeFilters = (value) => {
    let filters = marks.reduce((acc, current) => {
      return [...acc, current[value]]
    }, [])
    filters = [...new Set(filters)]
    return filters.map((filter) => {
      return {
        text: filter,
        value: filter,
      }
    })
  }

  let { filteredInfo } = state
  filteredInfo = filteredInfo || {}

  return (
    <>
      <h1 className="page-title">Marks</h1>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={clearFilters}>Clear filters</Button>
      </Space>
      <Table dataSource={marks} onChange={handleChange} rowKey="id" loading={loading}>
        <Column
          title="Task"
          dataIndex="name"
          filters={makeFilters('name')}
          onFilter={(value, record) => record.task.includes(value)}
          filteredValue={filteredInfo.task || null}
        />
        <Column
          title="Student"
          dataIndex="student"
          filters={makeFilters('student')}
          onFilter={(value, record) => record.student.includes(value)}
          filteredValue={filteredInfo.student || null}
        />
        <Column
          title="Mentor"
          dataIndex="author"
          filters={makeFilters('author')}
          onFilter={(value, record) => record.author.includes(value)}
          filteredValue={filteredInfo.author || null}
        />
        <Column
          title="State"
          dataIndex="state"
          render={(element) => (
            <Tag
              color={{ ACCEPTED: 'green', DISPUTED: 'orange', REJECTED: 'red' }[element]}
              key={element}
            >
              {element}
            </Tag>
          )}
          filters={makeFilters('state')}
          onFilter={(value, record) => record.state.includes(value)}
          filteredValue={filteredInfo.state || null}
        />
        <Column
          title="Score"
          dataIndex="score"
          key="score"
          render={(el) => <p key={el}>{el.score}</p>}
          sorter={(a, b) => a.grade.score - b.grade.score}
        />
        <Column
          title="Max score"
          dataIndex="grade"
          key="Maxscore"
          render={(el) => <p key={el}>{el.maxScore}</p>}
          sorter={(a, b) => a.grade.maxScore - b.grade.maxScore}
        />
        <Column
          title="Action"
          key="action"
          render={(row) => (
            <ButtonLink
              type="primary"
              size="large"
              linkTo={formatRoute(courseManagerRoutes.marks.info, { marksId: row.id })}
            >
              Info
            </ButtonLink>
          )}
        />
      </Table>
    </>
  )
}

export default MarksList
