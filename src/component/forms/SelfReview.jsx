/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, notification, Spin, Button } from 'antd'
import ReviewFormItem from './ReviewFormItem'
import categoriesService from '../../services/categories.service'
import requestsService from '../../services/requests.service'

const SelfReview = ({ task, user }) => {
  const [categories, setCategories] = useState()

  useEffect(() => {
    categoriesService.getAllByTaskId(task.id).then(setCategories)
  }, [task.id])

  const formRef = useRef(null)

  const onFinish = async (data) => {
    const requestData = { task: task.id, ...data }
    requestsService.create(requestData, user)
    notification.success({
      className: 'app-notification app-notification--success',
      message: 'Success',
      description: 'Request sent successfully...',
    })
  }
  const init = {
    grade:
      categories && categories.items !== undefined
        ? categories.items.reduce((ac, e) => {
            const result = { ...ac }
            result[e.id] = e
            return result
          }, {})
        : {},
  }

  return (
    <div className="task-create-page">
      <Form ref={formRef} layout="vertical" onFinish={onFinish} initialValues={init}>
        {categories ? (
          categories.map((category) => (
            <div key={category.id}>
              <div>{category.title}</div>
              {category.items.map((item) => (
                <div key={item.id}>
                  <Form.Item
                    name={['selfGrade', category.title, item.id]}
                    label={`${item.description} (${item.minScore}-${item.maxScore})`}
                  >
                    <ReviewFormItem />
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
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user.login,
  }
}

export default connect(mapStateToProps, null)(SelfReview)
