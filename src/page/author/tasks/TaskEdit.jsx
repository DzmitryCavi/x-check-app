import React, { useState, useRef } from 'react'
import { useAsync } from 'react-use'
import { useParams, useHistory } from 'react-router-dom'
import { Form, Input, Button, Table, Space, Radio, Spin, Alert, message, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { formatRoute } from 'react-router-named-routes'
import AntdTinymce from '../../../component/AntdTinymce'

import tasksService from '../../../services/tasks.service'
import categoriesService from '../../../services/categories.service'
import ButtonLink from '../../../component/ButtonLink'

import { authorRoutes } from '../../../router/routes'

const { Column } = Table

const validateMessages = {
  required: 'Required',
}

const TaskEdit = () => {
  const history = useHistory()
  const task = useRef(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEdited, setIsEdited] = useState(false)
  const [isBusy, setIsBusy] = useState(false)

  const { taskId } = useParams()
  const formRef = useRef(null)
  const [form] = Form.useForm()

  useAsync(async () => {
    const taskResponse = await tasksService.getById(taskId)
    task.current = taskResponse

    setLoading(false)

    setCategories(taskResponse.categories)
    form.setFieldsValue(taskResponse)
  }, [form, taskId])

  const onFinish = async (data) => {
    setIsBusy(true)
    await tasksService.edit(data, taskId)

    message.success('Task updated successfully.')
    setIsEdited(true)
    setIsBusy(false)
  }

  const destroyCategory = async (categoryId) => {
    const taskResponse = await categoriesService.destroyById(task.current, categoryId)
    task.current = taskResponse

    setCategories((prev) => prev.filter((category) => category.id !== categoryId))

    message.success('Category deleted successfully.')
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
              <AntdTinymce options={{ height: 360 }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isBusy}>
                Save
              </Button>
            </Form.Item>
          </Form>

          {isEdited ? (
            <Alert
              style={{ marginBottom: 30 }}
              message="Task updated successfully"
              type="success"
              showIcon
              closable
            />
          ) : null}

          <div className="categories-list">
            <div className="d-flex justify-content-end align-items-center mb-2">
              <ButtonLink
                type="primary"
                icon={<PlusOutlined />}
                linkTo={formatRoute(authorRoutes.categories.create, { taskId })}
              >
                Category
              </ButtonLink>
            </div>
            <Table dataSource={categories} rowKey="id">
              <Column title="Title" dataIndex="title" key="title" />
              <Column title="Description" dataIndex="description" key="description" />
              <Column
                title="Action"
                key="action"
                width={100}
                render={(row) => (
                  <Space size="middle">
                    <Popconfirm
                      title="You have unsaved changes! Continue?"
                      onConfirm={() =>
                        history.push(
                          formatRoute(authorRoutes.categories.edit, {
                            taskId,
                            categoryId: row.id,
                          }),
                        )
                      }
                    >
                      <Button icon={<EditOutlined />} />
                    </Popconfirm>

                    <Popconfirm title="Sure to delete?" onConfirm={() => destroyCategory(row.id)}>
                      <Button type="danger" icon={<DeleteOutlined />} />
                    </Popconfirm>
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
