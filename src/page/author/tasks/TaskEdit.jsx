import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, Table, Space, Radio, Spin, notification } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import AntdTinymce from '../../../component/AntdTinymce'

import tasksService from '../../../services/tasks.service'
import categoriesService from '../../../services/categories.service'
import ButtonLink from '../../../component/ButtonLink'

const { Column } = Table

const validateMessages = {
  required: 'Required',
}

const TaskEdit = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [isBusy, setIsBusy] = useState(false)

  const { taskId } = useParams()
  const formRef = useRef(null)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchData = async () => {
      const taskResponse = await tasksService.getById(taskId)

      const categoriesResponse = await categoriesService.getAllByTaskId(taskId)

      setLoading(false)

      form.setFieldsValue(taskResponse)
      setCategories(categoriesResponse)
    }
    fetchData()
  }, [form, taskId])

  const onFinish = async (data) => {
    setIsBusy(true)
    await tasksService.edit(data, taskId)

    notification.success({
      className: 'app-notification app-notification--success',
      message: 'Success',
      description: 'Task updated successfully...',
    })

    setIsBusy(false)
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
      {loading ? (
        <div className="content-loading">
          <Spin tip="Loading..." />
        </div>
      ) : (
        <>
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
              <AntdTinymce options={{ height: 400 }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isBusy}>
                Save
              </Button>
            </Form.Item>
          </Form>
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
            <Table dataSource={categories} rowKey="id">
              <Column width={60} title="#" dataIndex="id" key="id" />
              <Column title="Title" dataIndex="title" key="title" />
              <Column title="Description" dataIndex="description" key="description" />
              <Column
                title="Action"
                key="action"
                width={200}
                render={(row) => (
                  <Space size="middle">
                    <ButtonLink
                      icon={<EditOutlined />}
                      linkTo={`/author/categories/${row.id}/edit`}
                    >
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
        </>
      )}
    </div>
  )
}

export default TaskEdit
