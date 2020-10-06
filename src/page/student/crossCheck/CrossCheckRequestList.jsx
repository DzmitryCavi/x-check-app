import React, { useState } from 'react'
import { useAsync } from 'react-use'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Table, Tag, Typography } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import Column from 'antd/lib/table/Column'
import { formatRoute } from 'react-router-named-routes'
import ButtonLink from '../../../component/ButtonLink'
import { studentRoutes } from '../../../router/routes'
import requestService from '../../../services/requests.service'
import reviewService from '../../../services/review.service'
import crossCheckService from '../../../services/crossCheck.service'

const { Title } = Typography

const CrossCheckRequestList = ({ user }) => {
  const [requests, setRequests] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useAsync(async () => {
    const crossCheckResponse = await crossCheckService.getByStudentName(user.login)

    const studentsToReview = crossCheckResponse
      .reduce((ac, el) => ac.concat(el.students), [])
      .reduce((ac, el) => (el.name === user.login ? ac.concat(el.reviewGroup) : ac), [])

    const requestResponse = await requestService.getByStudentForCrossCheck(studentsToReview)
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
              linkTo={formatRoute(studentRoutes.crossCheck.review, { requestId: id })}
            >
              Review
            </ButtonLink>
          )}
        />
      </Table>
    </div>
  )
}

CrossCheckRequestList.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, null)(CrossCheckRequestList)
