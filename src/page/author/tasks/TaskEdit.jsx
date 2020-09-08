import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, Table, Space, Radio, notification } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import tasksService from '../../../services/tasks.service'
import categoriesService from '../../../services/categories.service'
import ButtonLink from '../../../component/ButtonLink'

const { TextArea } = Input
const { Column } = Table

const validateMessages = {
  required: 'Required',
}

const TaskEdit = () => {
  const [items, setCategories] = useState([])
  const { taskId } = useParams()
  const formRef = useRef(null)
  const [form] = Form.useForm()

  useEffect(() => {
    tasksService.getById(taskId).then((data) => form.setFieldsValue(data))
    categoriesService.getAllByTaskId(taskId).then((data) => setCategories(data))
  }, [taskId, form])

  const onFinish = async (data) => {
    await tasksService.edit(data, taskId)

    notification.success({
      className: 'app-notification app-notification--success',
      message: 'Success',
      description: 'Task updated successfully...',
    })
  }

  const destroyCategory = async (categoryId) => {
    await categoriesService.destroyById(categoryId)
    setCategories((prev) => prev.filter((category) => category.id !== categoryId))

    notification.success({
      className: 'app-notification app-notification--success',
      message: 'Success',
      description: 'Category deleted successfully...',
    })
  }

  return (
    <div className="task-edit-page">
      <h1 className="page-title">Task Edit</h1>
      <Form
        form={form}
        ref={formRef}
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <Form.Item
          label="State"
          name="state"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group>
            <Radio.Button value="DRAFT">DRAFT</Radio.Button>
            <Radio.Button value="PUBLISHED">PUBLISHED</Radio.Button>
            <Radio.Button value="ARCHIVED">ARCHIVED</Radio.Button>
          </Radio.Group>
        </Form.Item>

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
            Save
          </Button>
        </Form.Item>

        <div className="categories-list">
          <div className="d-flex justify-content-end align-items-center mb-2">
            <ButtonLink
              type="primary"
              icon={<PlusOutlined />}
              linkTo={`/author/tasks/${taskId}/categories/create`}
            >
              Category
            </ButtonLink>
          </div>
          <Table dataSource={items} rowKey="id">
            <Column width={60} title="#" dataIndex="id" key="id" />
            <Column title="Title" dataIndex="title" key="title" />
            <Column title="Description" dataIndex="description" key="description" />
            <Column
              title="Action"
              key="action"
              width={200}
              render={(row) => (
                <Space size="middle">
                  <ButtonLink icon={<EditOutlined />} linkTo={`/author/categories/${row.id}/edit`}>
                    Veiw
                  </ButtonLink>

                  <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={() => destroyCategory(row.id)}
                  >
                    Remove
                  </Button>
                </Space>
              )}
            />
          </Table>
        </div>
      </Form>
    </div>
  )
}

export default TaskEdit
