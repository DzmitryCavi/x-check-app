/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Form, notification, Spin, Button } from 'antd'
import ReviewFormItem from './ReviewFormItem'
import categoriesService from '../../services/categories.service'

const SelfReview = ({ task }) => {
  const [categories, setCategories] = useState()

  useEffect(() => {
    categoriesService.getAllByTaskId(task.id).then(setCategories)
  }, [task.id])

  const formRef = useRef(null)

  const onFinish = async () => {
    notification.success({
      className: 'app-notification app-notification--success',
      message: 'Success',
      description: 'Request sent successfully...',
    })
  }

  const init = {
    score:
      categories && categories.items !== undefined
        ? categories.items.reduce((ac, e) => {
            const result = { ...ac }
            result[e.id] = e
            return result
          }, {})
        : {},
    data: 232134234,
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
                  {`${item.description} (${item.minScore}-${item.maxScore})`}
                  <Form.Item name={item.id} label={item.description}>
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
}

export default SelfReview
