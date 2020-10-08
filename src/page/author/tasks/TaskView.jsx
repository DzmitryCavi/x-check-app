import React, { useState, useMemo } from 'react'
import { useAsync } from 'react-use'
import { Link, useParams } from 'react-router-dom'
import { Tree, Typography, Empty, Spin, Tag } from 'antd'
import { CarryOutOutlined, EditOutlined } from '@ant-design/icons'
import parse from 'react-html-parser'
import { formatRoute } from 'react-router-named-routes'

import ButtonLink from '../../../component/ButtonLink'

import { authorRoutes } from '../../../router/routes'

import tasksService from '../../../services/tasks.service'

const { Title } = Typography

const transformCategoriesForTree = (categories, taskId) =>
  categories.map((category) => ({
    key: String(category.id),
    title: (
      <>
        {category.title}&nbsp;
        <Link
          to={formatRoute(authorRoutes.categories.edit, {
            taskId,
            categoryId: category.id,
          })}
        >
          <EditOutlined /> click to edit
        </Link>
      </>
    ),
    children: category.criteria.map((criterion, idx) => ({
      key: `${String(category.id)}-${idx}`,
      title: (
        <div className="item">
          {parse(criterion.text)}&nbsp;
          <Tag color="default">
            {Number(criterion.score) > 0 ? `+${criterion.score}` : criterion.score}
          </Tag>
        </div>
      ),
    })),
  }))

const TaskView = () => {
  const { taskId } = useParams()

  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState([])

  useAsync(async () => {
    const taskResponse = await tasksService.getById(taskId)

    setTask(taskResponse || {})
    setLoading(false)
  }, [taskId])

  const treeData = useMemo(() => transformCategoriesForTree(task.categories || [], taskId), [
    task.categories,
    taskId,
  ])

  return (
    <div className="task-view-page">
      {loading ? (
        <div className="content-loading">
          <Spin tip="Loading..." />
        </div>
      ) : (
        <>
          <h1 className="page-title">
            {task.title}&nbsp;
            <Link
              to={formatRoute(authorRoutes.tasks.edit, {
                taskId,
              })}
            >
              <small>
                <EditOutlined /> click to edit
              </small>
            </Link>
          </h1>
          <div className="task">
            <div className="task__body">
              <div className="task__description">{parse(task.description)}</div>

              <div className="task-categories">
                <Title level={4} className="task-categories__title">
                  Categories:
                </Title>
                {treeData.length ? (
                  <Tree showLine={<CarryOutOutlined />} treeData={treeData} defaultExpandAll />
                ) : (
                  <Empty description="Categories not found :(">
                    <ButtonLink
                      type="primary"
                      linkTo={formatRoute(authorRoutes.categories.create, { taskId })}
                    >
                      Create Now
                    </ButtonLink>
                  </Empty>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TaskView
