/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, notification, Spin, Button, Input } from 'antd'
import ReviewFormItem from './ReviewFormItem'
import requestsService from '../../services/requests.service'
import { urlWithIpPattern } from '../../services/validators'

const SelfReview = ({ task, user, requestToEdit }) => {
  const { categories } = task
  const formRef = useRef(null)
  const onFinish = async (data) => {
    const requestData = { task: task.id, ...data }
    if (requestToEdit) requestsService.edit(data, requestToEdit.id)
    else requestsService.create(requestData, user)
    notification.success({
      className: 'app-notification app-notification--success',
      message: 'Success',
      description: 'Request sent successfully...',
    })
  }
  return (
    <div className="task-create-page">
      <Form ref={formRef} layout="vertical" onFinish={onFinish} initialValues={requestToEdit || {}}>
        <Form.Item
          name="url"
          label="Solution URL"
          rules={[
            { required: true, pattern: urlWithIpPattern, message: 'Please provide a valid link' },
          ]}
        >
          <Input />
        </Form.Item>
        {categories ? (
          categories.map((category) => (
            <div key={category.id}>
              <div>{category.title}</div>
              {category.criteria.map((item, index) => (
                <div key={`criteria-${index + 1}`}>
                  <Form.Item
                    name={['selfGrade', category.title, index]}
                    label={`${item.text} (0-${item.score})`}
                    rules={[{ required: true, message: 'Please grade all' }]}
                  >
                    <ReviewFormItem maxScore={item.score} />
                  </Form.Item>
                </div>
              ))}
            </div>
          ))
        ) : (
          <Spin size="large" />
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

SelfReview.propTypes = {
  task: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.string.isRequired,
  requestToEdit: PropTypes.instanceOf(Object),
}

SelfReview.defaultProps = {
  requestToEdit: null,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user.login,
  }
}

export default connect(mapStateToProps, null)(SelfReview)
