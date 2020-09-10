import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Space, Button, notification } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons'
import ButtonLink from '../../../component/ButtonLink'

import tasksService from '../../../services/tasks.service'

const { Column } = Table

const TasksList = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    tasksService.getAll().then(setTasks)
  }, [])

  const destroyTask = async (taskId) => {
    await tasksService.destroyById(taskId)
    setTasks((prev) => prev.filter((task) => task.id !== taskId))

    notification.success({
      className: 'app-notification app-notification--info',
      message: 'Success',
      description: 'Task deleted successfully...',
    })
  }

  return (
    <div className="tasks-list-page">
      <h1 className="page-title">Tasks</h1>
      <div className="d-flex justify-content-end align-items-center mb-2">
        <ButtonLink type="primary" icon={<PlusOutlined />} linkTo="/author/tasks/create">
          Create
        </ButtonLink>
      </div>
      <Table dataSource={tasks} rowKey="id">
        <Column width={60} title="#" dataIndex="id" key="id" />
        <Column
          title="Title"
          dataIndex="title"
          key="title"
          render={(row) => <Link to={`/author/tasks/${row.id}/view`}>{row.title}</Link>}
        />
        <Column title="State" dataIndex="state" key="state" />
        <Column
          title="Action"
          key="action"
          width={300}
          render={(row) => (
            <Space size="middle">
              <ButtonLink
                type="primary"
                icon={<PlusOutlined />}
                linkTo={`/author/tasks/${row.id}/categories/create`}
              >
                Category
              </ButtonLink>

              <ButtonLink icon={<EyeOutlined />} linkTo={`/author/tasks/${row.id}/view`}>
                View
              </ButtonLink>

              <ButtonLink icon={<EditOutlined />} linkTo={`/author/tasks/${row.id}/edit`}>
                Edit
              </ButtonLink>

              <Button type="danger" icon={<DeleteOutlined />} onClick={() => destroyTask(row.id)}>
                Remove
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  )
}

export default TasksList
