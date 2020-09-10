/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, notification } from 'antd'

import './style.scss'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import categoriesService from '../../../services/categories.service'

const { TextArea } = Input

const validateMessages = {
  required: 'Required',
}

const CategoryCreate = () => {
  const [isBusy, setIsBusy] = useState(false)

  const { taskId } = useParams()
  const formRef = useRef(null)

  const onFinish = async (data) => {
    setIsBusy(true)

    await categoriesService.create(data, taskId)

    notification.success({
      className: 'app-notification app-notification--success',
      message: 'Success',
      description: 'Category created successfully...',
    })

    setIsBusy(false)
  }

  return (
    <div className="category-create-page">
      <h1 className="page-title">Category Create</h1>
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

        <Form.Item
          name="items"
          label="Items"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Form.List name="items">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <div className="category-item" key={field.key}>
                      <div className="category-items-list">
                        <div className="category-items-list__item category-items-list__item--minScore">
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
                        <div className="category-items-list__item category-items-list__item--maxScore">
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
                        <div className="category-items-list__item category-items-list__item--description">
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
    </div>
  )
}

export default CategoryCreate
