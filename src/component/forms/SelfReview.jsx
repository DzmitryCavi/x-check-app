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
      <h1 className="page-title">Create request ({task.title})</h1>
      <Form ref={formRef} layout="vertical" onFinish={onFinish}>
        {categories ? (
          categories.map((category) => <div key={category.id}>{category.title}</div>)
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
