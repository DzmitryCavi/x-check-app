/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, notification, Spin, Button } from 'antd'
import ReviewFormItem from './ReviewFormItem'
import categoriesService from '../../services/categories.service'
import requestsService from '../../services/requests.service'

const SelfReview = ({ task, user, requestToEdit }) => {
  const [categories, setCategories] = useState()

  useEffect(() => {
    categoriesService.getAllByTaskId(task.id).then(setCategories)
  }, [task.id])

  const formRef = useRef(null)

  const onFinish = async (data) => {
    const requestData = { task: task.id, ...data }
    if (requestToEdit) requestsService.create(requestData, user)
    else requestsService.edit(data, requestToEdit.id)
    notification.success({
      className: 'app-notification app-notification--success',
      message: 'Success',
      description: 'Request sent successfully...',
    })
  }
  return (
    <div className="task-create-page">
      <Form ref={formRef} layout="vertical" onFinish={onFinish} initialValues={requestToEdit || {}}>
        {categories ? (
          categories.map((category) => (
            <div key={category.id}>
              <div>{category.title}</div>
              {category.items.map((item) => (
                <div key={item.id}>
                  <Form.Item
                    name={['selfGrade', category.title, item.id]}
                    label={`${item.description} (0-${item.score})`}
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
