import React, { useState, useMemo } from 'react'
import { useAsync } from 'react-use'
import { useParams } from 'react-router-dom'
import { Tree, Typography, Empty, Spin, Tag } from 'antd'
import { CarryOutOutlined } from '@ant-design/icons'
import parse from 'react-html-parser'

import tasksService from '../../../services/tasks.service'

const { Title } = Typography

const transformCategoriesForTree = (categories) =>
  categories.map((category) => ({
    key: String(category.id),
    title: <span>{category.title}</span>,
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

const Taskview = () => {
  const { taskId } = useParams()

  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState([])

  useAsync(async () => {
    const taskResponse = await tasksService.getById(taskId)

    setTask(taskResponse)
    setLoading(false)
  }, [taskId])

  const treeData = useMemo(() => transformCategoriesForTree(task.categories || []), [
    task.categories,
  ])

  return (
    <div className="task-view-page">
      <h1 className="page-title">{task.title}</h1>
      {loading ? (
        <div className="content-loading">
          <Spin tip="Loading..." />
        </div>
      ) : (
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
                <Empty description="Categories not found :(" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Taskview
