import React, { useState, useEffect } from 'react'
import { Table, Tag } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import Column from 'antd/lib/table/Column'
import { formatRoute } from 'react-router-named-routes'
import ButtonLink from '../../../component/ButtonLink'
import { supervisorRoutes } from '../../../router/routes'
import requestService from '../../../services/requests.service'
import reviewService from '../../../services/review.service'

const RequestsList = () => {
  const [requests, setRequests] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const requestResponse = await requestService.getAllSubmitted()
      const reviewsResponse = await reviewService.getAll()
      setRequests(requestResponse)
      setReviews(reviewsResponse)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <Table dataSource={requests} pagination={{ pageSize: 10 }} rowKey="id" loading={loading}>
      <>
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
          render={(id) => (
            <ButtonLink
              type="primary"
              icon={<EditOutlined />}
              linkTo={formatRoute(supervisorRoutes.requests.review, { requestId: id })}
            >
              Review
            </ButtonLink>
          )}
        />
      </>
    </Table>
  )
}

export default RequestsList
