/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Form, notification, Spin } from 'antd'
import categoriesService from '../../services/categories.service'

const SelfReview = ({ task }) => {
  const [categories, setCategories] = useState()

  useEffect(() => {
    categoriesService.getAllByTaskId(task.id).then(setCategories)
  }, [task.id])

  console.log(categories)

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
      <Form ref={formRef} layout="vertical" onFinish={onFinish}>
        {categories ? (
          categories.map((category) => (
            <div key={category.id}>
              <div>{category.title}</div>
              {category.items.map((item) => (
                <div key={item.id}>
                  {`${item.description} (${item.minScore}-${item.maxScore})`}{' '}
                  <Form.Item name={item.id} label="Slider">
                    asdasd
                  </Form.Item>
                </div>
              ))}
            </div>
          ))
        ) : (
          <Spin size="large" />
        )}
      </Form>
    </div>
  )
}

SelfReview.propTypes = {
  task: PropTypes.instanceOf(Object).isRequired,
}

export default SelfReview
