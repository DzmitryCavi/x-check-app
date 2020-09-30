import React from 'react'
import { Typography } from 'antd'
import ReviewForm from '../../../component/forms/ReviewFrom/ReviewForm'

const { Title } = Typography

const RequestView = () => {
  return (
    <div className="request-review-page">
      <Title level={2} className="page-title">
        Review
      </Title>
      <ReviewForm />
    </div>
  )
}

export default RequestView
