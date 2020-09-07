/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'

import tasksService from '../../services/tasks.service'

import './style.scss'

const { TextArea } = Input

const validateMessages = {
  required: 'Required',
}

const TaskCreate = ({ user }) => {
  const formRef = useRef(null)

  const onFinish = async (task) => {
    await tasksService.create(task, user.id)
    formRef.current.resetFields()
  }

  return (
    <div className="task-create-page">
      <Form ref={formRef} layout="vertical" validateMessages={validateMessages} onFinish={onFinish}>
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

        <Form.Item name="description" label="Description">
          <TextArea rows={5} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

TaskCreate.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, null)(TaskCreate)
