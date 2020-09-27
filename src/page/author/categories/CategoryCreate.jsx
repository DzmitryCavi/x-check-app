/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, Spin, message, Result, Select } from 'antd'

import { PlusOutlined, MinusCircleOutlined, ApartmentOutlined } from '@ant-design/icons'
import AntdTinymce from '../../../component/AntdTinymce'
import NumericInput from '../../../component/NumericInput'

import tasksService from '../../../services/tasks.service'
import categoriesService from '../../../services/categories.service'

import ButtonLink from '../../../component/ButtonLink'

import { authorRoutes } from '../../../router/routes'

import './style.scss'

const { TextArea } = Input

const validateMessages = {
  required: 'Required',
}

const availabilities = [
  { key: 'mentor', label: 'Mentor' },
  { key: 'student', label: 'Student' },
]

const CategoryCreate = () => {
  const task = useRef(null)
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isBusy, setIsBusy] = useState(false)

  const { taskId } = useParams()
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchData = async () => {
      const taskResponse = await tasksService.getById(taskId)
      task.current = taskResponse

      setLoading(false)
    }
    fetchData()
  }, [taskId])

  const onFinish = async (data) => {
    setIsBusy(true)

    const updatedTask = await categoriesService.create(task.current, data)
    task.current = updatedTask

    message.success('Category created successfully')

    setIsBusy(false)
    setCategory(data)
    form.resetFields()
  }

  let content = null
  if (loading) {
    content = (
      <div className="content-loading">
        <Spin tip="Loading..." />
      </div>
    )
  } else if (category) {
    content = (
      <Result
        status="success"
        title="Category created successfully!"
        subTitle={`Category name: ${category.title}.`}
        extra={[
          <Button key="category-create" type="primary" onClick={() => setCategory(null)}>
            Create New Category
          </Button>,
          <ButtonLink
            key="tasks-list"
            type="default"
            icon={<ApartmentOutlined />}
            linkTo={authorRoutes.tasks.list}
          >
            Go Tasks List
          </ButtonLink>,
        ]}
      />
    )
  } else {
    content = (
      <Form form={form} layout="vertical" validateMessages={validateMessages} onFinish={onFinish}>
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

        <Form.Item
          name="criteria"
          label="Criteria"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Form.List name="criteria">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <div className="category-item" key={field.key}>
                      <div className="category-items-list">
                        <div className="category-items-list__item category-items-list__item--availability">
                          <Form.Item
                            {...field}
                            style={{ marginBottom: 0 }}
                            name={[field.name, 'availability']}
                            fieldKey={[field.fieldKey, 'availability']}
                          >
                            <Select mode="tags" placeholder="Available to all">
                              {availabilities.map((availability) => (
                                <Select.Option key={availability.key}>
                                  {availability.label}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                        <div className="category-items-list__item category-items-list__item--score">
                          <Form.Item
                            {...field}
                            style={{ marginBottom: 0 }}
                            name={[field.name, 'score']}
                            fieldKey={[field.fieldKey, 'score']}
                            rules={[{ required: true, message: 'Missing score' }]}
                          >
                            <NumericInput placeholder="Score" />
                          </Form.Item>
                        </div>
                        <div className="category-items-list__item category-items-list__item--text">
                          <Form.Item
                            {...field}
                            style={{ marginBottom: 0 }}
                            name={[field.name, 'text']}
                            fieldKey={[field.fieldKey, 'text']}
                            rules={[{ required: true, message: 'Missing text' }]}
                          >
                            <AntdTinymce options={{ height: 160 }} />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="category-item__remove">
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
                      <PlusOutlined /> Add item
                    </Button>
                  </Form.Item>
                </div>
              )
            }}
          </Form.List>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isBusy}>
            Save
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <div className="category-create-page">
      <h1 className="page-title">Category Create</h1>
      {task.current ? (
        <div className="category-task">
          <b>Task:</b> {task.current.title}
        </div>
      ) : null}
      {content}
    </div>
  )
}

export default CategoryCreate
