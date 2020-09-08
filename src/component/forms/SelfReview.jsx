/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, notification } from 'antd'

const SelfReview = ({ task }) => {
  const formRef = useRef(null)

  const onFinish = async () => {
    notification.success({
      className: 'app-notification app-notification--success',
      message: 'Success',
      description: 'Request sent successfully...',
    })
  }

  return (
    <div className="task-create-page">
      <h1 className="page-title">Create request ({task})</h1>
      <Form ref={formRef} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  )
}

SelfReview.propTypes = {
  task: PropTypes.string.isRequired,
}

export default SelfReview
