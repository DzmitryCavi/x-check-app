import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Input, Button, message, Result } from 'antd'
import { ApartmentOutlined, PlusOutlined } from '@ant-design/icons'
import { formatRoute } from 'react-router-named-routes'

import ButtonLink from '../../../component/ButtonLink'
import AntdTinymce from '../../../component/AntdTinymce'
import { authorRoutes } from '../../../router/routes'

import tasksService from '../../../services/tasks.service'

import './style.scss'

const validateMessages = {
  required: 'Required',
}

const TaskCreate = ({ user }) => {
  const [task, setTask] = useState(null)
  const [isBusy, setIsBusy] = useState(false)
  const formRef = useRef(null)

  const onFinish = async (data) => {
    setIsBusy(true)

    const responseTask = await tasksService.create(data, user.id)

    setTask(responseTask)

    message.success('Task created successfully')
    setIsBusy(false)
  }

  return (
    <div className="task-create-page">
      <h1 className="page-title">Task Create</h1>
      {!task ? (
        <Form
          ref={formRef}
          layout="vertical"
          validateMessages={validateMessages}
          onFinish={onFinish}
        >
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
            <AntdTinymce options={{ height: 360 }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isBusy}>
              Create
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Result
          status="success"
          title="Task created successfully!"
          subTitle={`Task name: ${task.title}.`}
          extra={[
            <Button key="task-create" type="primary" onClick={() => setTask(null)}>
              Create New Task
            </Button>,
            <ButtonLink
              key="tasks-list"
              type="default"
              icon={<ApartmentOutlined />}
              linkTo={authorRoutes.tasks.list}
            >
              Go Tasks List
            </ButtonLink>,
            <ButtonLink
              key="category-create"
              type="primary"
              icon={<PlusOutlined />}
              linkTo={formatRoute(authorRoutes.categories.create, { taskId: task.id })}
            >
              Category
            </ButtonLink>,
          ]}
        />
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
