import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'

import tasksService from '../../services/tasks.service'

const validateMessages = {
  required: 'Required',
}

const CreateTask = ({ user }) => {
  const formRef = useRef(null)

  const onFinish = async (task) => {
    await tasksService.create(task, user.id)
    formRef.current.resetFields()
  }

  return (
    <div className="task-create-page">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        ref={formRef}
        layout="horizontal"
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
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

CreateTask.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, null)(CreateTask)
