/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ButtonLink from '../../component/ButtonLink'

import tasksService from '../../services/tasks.service'

import './style.scss'

const { TextArea } = Input

const validateMessages = {
  required: 'Required',
}

const TaskCreate = ({ user }) => {
  const [taskId, setTaskId] = useState(null)
  const formRef = useRef(null)

  const onFinish = async (data) => {
    const task = await tasksService.create(data, user.id)
    setTaskId(task.id)
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

      {taskId ? (
        <ButtonLink
          type="dashed"
          icon={<PlusOutlined />}
          linkTo={`/tasks/${taskId}/categories/create`}
          block
        >
          Category
        </ButtonLink>
      ) : (
        ''
      )}
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
