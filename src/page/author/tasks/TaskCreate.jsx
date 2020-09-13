/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Input, Button, notification } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ButtonLink from '../../../component/ButtonLink'
import AntdTinymce from '../../../component/AntdTinymce'

import tasksService from '../../../services/tasks.service'

import './style.scss'

const validateMessages = {
  required: 'Required',
}

const TaskCreate = ({ user }) => {
  const [taskId, setTaskId] = useState(null)
  const [isBusy, setIsBusy] = useState(false)
  const formRef = useRef(null)

  const onFinish = async (data) => {
    setIsBusy(true)

    const task = await tasksService.create(data, user.id)
    setTaskId(task.id)

    notification.success({
      className: 'app-notification app-notification--success',
      message: 'Success',
      description: 'Task created successfully...',
    })

    setIsBusy(false)
  }

  return (
    <div className="task-create-page">
      <h1 className="page-title">Task Create</h1>
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
          <AntdTinymce options={{ height: 400 }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isBusy}>
            Create
          </Button>
        </Form.Item>
      </Form>

      {taskId ? (
        <ButtonLink
          type="dashed"
          icon={<PlusOutlined />}
          linkTo={`/author/tasks/${taskId}/categories/create`}
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
