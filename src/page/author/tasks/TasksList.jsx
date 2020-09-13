import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatRoute } from 'react-router-named-routes'
import { Table, Space, Button, Tag, notification } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons'
import ButtonLink from '../../../component/ButtonLink'
import { authorRoutes } from '../../../router/routes'

import tasksService from '../../../services/tasks.service'

const { Column } = Table

const TasksList = ({ user }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    tasksService.getAllByAuthorId(user.id).then((data) => {
      setTasks(data)
      setLoading(false)
    })
  }, [user.id])

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
        <ButtonLink type="primary" icon={<PlusOutlined />} linkTo={authorRoutes.tasks.create}>
          Create
        </ButtonLink>
      </div>
      <Table dataSource={tasks} rowKey="id" loading={loading}>
        <Column width={60} title="#" dataIndex="id" key="id" sorter={(a, b) => a.id - b.id} />
        <Column
          title="Title"
          key="title"
          sorter={(a, b) => a.title.localeCompare(b.title)}
          render={(row) => (
            <Link to={formatRoute(authorRoutes.tasks.view, { taskId: row.id })}>{row.title}</Link>
          )}
        />
        <Column
          title="State"
          dataIndex="state"
          key="state"
          render={(state) => (
            <Tag
              color={{ PUBLISHED: 'green', ARCHIVED: 'orange', DRAFT: 'red' }[state]}
              key={state}
            >
              {state}
            </Tag>
          )}
        />
        <Column
          title="Action"
          key="action"
          width={300}
          render={(row) => (
            <Space size="middle">
              <ButtonLink
                type="primary"
                icon={<PlusOutlined />}
                linkTo={formatRoute(authorRoutes.categories.create, { taskId: row.id })}
              >
                Category
              </ButtonLink>

              <ButtonLink
                icon={<EyeOutlined />}
                linkTo={formatRoute(authorRoutes.tasks.view, { taskId: row.id })}
              >
                View
              </ButtonLink>

              <ButtonLink
                icon={<EditOutlined />}
                linkTo={formatRoute(authorRoutes.tasks.edit, { taskId: row.id })}
              >
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

TasksList.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, null)(TasksList)
