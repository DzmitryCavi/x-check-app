/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import tasksService from '../../services/tasks.service'

import './style.scss'

const { TextArea } = Input

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
          name="categories"
          label="Categories"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Form.List name="categories">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <div className="task-category-item" key={field.key}>
                      <div className="task-categories">
                        <div className="task-categories__item task-categories__item--title">
                          <Form.Item
                            {...field}
                            style={{ marginBottom: 0 }}
                            name={[field.name, 'title']}
                            fieldKey={[field.fieldKey, 'title']}
                            rules={[{ required: true, message: 'Missing title' }]}
                          >
                            <Input placeholder="Title" />
                          </Form.Item>
                        </div>
                        <div className="task-categories__item task-categories__item--category">
                          <Form.Item
                            {...field}
                            style={{ marginBottom: 0 }}
                            name={[field.name, 'category']}
                            fieldKey={[field.fieldKey, 'category']}
                            rules={[{ required: true, message: 'Missing category' }]}
                          >
                            <Input placeholder="Category" />
                          </Form.Item>
                        </div>
                        <div className="task-categories__item task-categories__item--description">
                          <Form.Item
                            {...field}
                            style={{ marginBottom: 0 }}
                            name={[field.name, 'description']}
                            fieldKey={[field.fieldKey, 'description']}
                            rules={[{ required: true, message: 'Missing description' }]}
                          >
                            <TextArea placeholder="Description" rows={4} />
                          </Form.Item>
                        </div>
                        <div className="task-categories__item task-categories__item--minScore">
                          <Form.Item
                            {...field}
                            style={{ marginBottom: 0 }}
                            name={[field.name, 'minScore']}
                            fieldKey={[field.fieldKey, 'minScore']}
                            rules={[{ required: true, message: 'Missing min score' }]}
                          >
                            <Input placeholder="Min Score" />
                          </Form.Item>
                        </div>
                        <div className="task-categories__item task-categories__item--maxScore">
                          <Form.Item
                            {...field}
                            style={{ marginBottom: 0 }}
                            name={[field.name, 'maxScore']}
                            fieldKey={[field.fieldKey, 'maxScore']}
                            rules={[{ required: true, message: 'Missing max score' }]}
                          >
                            <Input placeholder="Max Score" />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="task-category-item__remove">
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name)
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add()
                      }}
                      block
                    >
                      <PlusOutlined /> Add category
                    </Button>
                  </Form.Item>
                </div>
              )
            }}
          </Form.List>
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
