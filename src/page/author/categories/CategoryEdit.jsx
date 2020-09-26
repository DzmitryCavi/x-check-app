/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, Spin, message, Alert } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

import AntdTinymce from '../../../component/AntdTinymce'
import tasksService from '../../../services/tasks.service'
import categoriesService from '../../../services/categories.service'

import './style.scss'

const { TextArea } = Input

const validateMessages = {
  required: 'Required',
}

const CategoryEdit = () => {
  const task = useRef(null)
  const [loading, setLoading] = useState(true)
  const [isEdited, setIsEdited] = useState(false)
  const [isBusy, setIsBusy] = useState(false)

  const { taskId, categoryId } = useParams()
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchData = async () => {
      const taskResponse = await tasksService.getById(taskId)
      task.current = taskResponse

      const data = taskResponse.categories.find((category) => category.id === categoryId)

      setLoading(false)
      form.setFieldsValue(data)
    }
    fetchData()
  }, [categoryId, form, taskId])

  const onFinish = async (formData) => {
    setIsBusy(true)

    console.log(task.current)
    const updatedTask = await categoriesService.edit(task.current, formData, categoryId)
    task.current = updatedTask

    const data = updatedTask.categories.find((category) => category.id === categoryId)
    form.setFieldsValue(data)

    message.success('Category updated successfully.')
    setIsEdited(true)
    setIsBusy(false)
  }

  return (
    <div className="category-edit-page">
      <h1 className="page-title">Category Edit</h1>
      {task.current ? (
        <div className="category-task">
          <b>Task:</b> {task.current.title}
        </div>
      ) : null}
      {loading ? (
        <div className="content-loading">
          <Spin tip="Loading..." />
        </div>
      ) : (
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
                          <div className="category-items-list__item category-items-list__item--score">
                            <Form.Item
                              {...field}
                              style={{ marginBottom: 0 }}
                              name={[field.name, 'score']}
                              fieldKey={[field.fieldKey, 'score']}
                              rules={[{ required: true, message: 'Missing score' }]}
                            >
                              <Input placeholder="Score" />
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
      )}

      {isEdited ? (
        <Alert message="Category updated successfully" type="success" showIcon closable />
      ) : null}
    </div>
  )
}

export default CategoryEdit
