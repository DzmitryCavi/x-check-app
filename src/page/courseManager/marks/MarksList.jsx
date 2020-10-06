import React, { useState } from 'react'
import { useAsync } from 'react-use'
import { Link } from 'react-router-dom'
import { Table, Button, Space, Tag } from 'antd'
import { formatRoute } from 'react-router-named-routes'
import { EyeOutlined } from '@ant-design/icons'
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

  useAsync(async () => {
    const markResponse = await rviewService.getAllGraded()
    setMarks(markResponse)
    setLoading(false)
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
      <h1 className="page-title">Grade</h1>
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
          render={(row, record) => (
            <Link to={formatRoute(courseManagerRoutes.reviews.info, { reviewId: record.id })}>
              {row}
            </Link>
          )}
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
          render={({ state: status, id }) => {
            return (
              <>
                <Tag
                  color={{ ACCEPTED: 'green', GRADED: 'green', DISPUTE: 'red' }[status]}
                  key={status}
                >
                  {status}
                </Tag>
                {status === 'DISPUTE' && (
                  <ButtonLink
                    type="primary"
                    size="small"
                    style={{ fontSize: 12 }}
                    icon={<EyeOutlined />}
                    linkTo={formatRoute(courseManagerRoutes.reviews.dispute, { reviewId: id })}
                  >
                    View
                  </ButtonLink>
                )}
              </>
            )
          }}
          filters={makeFilters('state')}
          onFilter={(value, record) => record.state.includes(value)}
          filteredValue={filteredInfo.state || null}
        />
        <Column
          title="Score"
          dataIndex="score"
          key="score"
          sorter={(a, b) => a.grade.score - b.grade.score}
        />
        <Column
          title="Action"
          key="action"
          width={80}
          render={(row) => (
            <ButtonLink
              type="primary"
              linkTo={formatRoute(courseManagerRoutes.reviews.info, { reviewId: row.id })}
              icon={<EyeOutlined />}
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
