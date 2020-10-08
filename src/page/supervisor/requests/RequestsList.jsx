import React, { useState } from 'react'
import { useAsync } from 'react-use'
import { Table, Tag, Typography } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import Column from 'antd/lib/table/Column'
import { formatRoute } from 'react-router-named-routes'
import ButtonLink from '../../../component/ButtonLink'
import { supervisorRoutes } from '../../../router/routes'
import requestService from '../../../services/requests.service'
import reviewService from '../../../services/review.service'

const { Title } = Typography

const RequestsList = () => {
  const [requests, setRequests] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useAsync(async () => {
    const requestResponse = await requestService.getAllSubmittedForMentor()
    const reviewsResponse = await reviewService.getAll()
    setRequests(requestResponse)
    setReviews(reviewsResponse)
    setLoading(false)
  }, [])

  return (
    <div className="requests-list-page">
      <Title level={2} className="page-title">
        Requests
      </Title>
      <Table
        dataSource={requests}
        pagination={{ pageSize: 10 }}
        rowKey="id"
        loading={loading}
        bordered
      >
        <Column
          title="Student"
          dataIndex="author"
          key="author"
          sorter={(a, b) => String(a.author).localeCompare(String(b.author))}
        />
        <Column
          title="Task"
          dataIndex="name"
          key="name"
          sorter={(a, b) => String(a.task).localeCompare(String(b.task))}
        />
        <Column title="Self-review" dataIndex="score" key="score" />
        <Column
          title="Status"
          key="status"
          sorter={(a, b) => a.state.localeCompare(b.state)}
          render={(col) => {
            const isWithReview = Object.keys(reviews).reduce(
              (ac, el) => ac || reviews[el].requestId === col.id,
              false,
            )
            const status = isWithReview ? 'DRAFT' : 'NEW'
            return (
              <Tag color={isWithReview ? 'red' : 'green'} key={status}>
                {status}
              </Tag>
            )
          }}
        />

        <Column
          title="Action"
          key="action"
          dataIndex="id"
          width={100}
          render={(id) => (
            <ButtonLink
              type="primary"
              icon={<EyeOutlined />}
              linkTo={formatRoute(supervisorRoutes.requests.review, { requestId: id })}
            >
              Review
            </ButtonLink>
          )}
        />
      </Table>
    </div>
  )
}

export default RequestsList
