import React, { useState, useRef } from 'react'
import { useAsync } from 'react-use'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, Spin, message, Alert, Select } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

import AntdTinymce from '../../../component/AntdTinymce'
import NumericInput from '../../../component/NumericInput'

import tasksService from '../../../services/tasks.service'
import categoriesService from '../../../services/categories.service'

import './style.scss'

const { TextArea } = Input

const validateMessages = {
  required: 'Required',
}

const availabilities = [
  { key: 'mentor', label: 'Mentor' },
  { key: 'student', label: 'Student' },
]

const CategoryEdit = () => {
  const task = useRef(null)
  const [loading, setLoading] = useState(true)
  const [isEdited, setIsEdited] = useState(false)
  const [isBusy, setIsBusy] = useState(false)

  const { taskId, categoryId } = useParams()
  const [form] = Form.useForm()

  useAsync(async () => {
    const taskResponse = await tasksService.getById(taskId)
    task.current = taskResponse

    const data = taskResponse.categories.find((category) => category.id === categoryId)

    setLoading(false)
    form.setFieldsValue(data)
  }, [categoryId, form, taskId])

  const onFinish = async (formData) => {
    setIsBusy(true)

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
                          <div className="category-items-list__item category-items-list__item--availability">
                            <Form.Item
                              {...field}
                              style={{ marginBottom: 0 }}
                              name={[field.name, 'availability']}
                              fieldKey={[field.fieldKey, 'availability']}
                              initialValue={[]}
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
                              <AntdTinymce
                                isQuickBars
                                options={{
                                  inline: true,
                                  quickbars_insert_toolbar:
                                    'bullist numlist outdent indent | quicklink',
                                  quickbars_selection_toolbar:
                                    'bold italic underline | formatselect | blockquote quicklink | code',
                                }}
                                menubar={false}
                                toolbar={[]}
                              />
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
