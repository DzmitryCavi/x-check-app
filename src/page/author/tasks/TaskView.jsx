import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Tree, Typography } from 'antd'
import { CarryOutOutlined } from '@ant-design/icons'
import parse from 'react-html-parser'

import tasksService from '../../../services/tasks.service'
import categoriesService from '../../../services/categories.service'

const { Title } = Typography

const transformCategoriesForTree = (categories) =>
  categories.map((category) => ({
    key: String(category.id),
    title: (
      <span>
        {category.title} (<b>Max score:</b>
        {category.items.reduce((acc, curr) => acc + Number(curr.maxScore), 0)})
      </span>
    ),
    children: category.items.map((item) => ({
      key: item.id,
      title: (
        <span>
          {item.description} (<b>Score:</b> {item.minScore} - {item.maxScore})
        </span>
      ),
    })),
  }))

const Taskview = () => {
  const { taskId } = useParams()

  const [task, setTask] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    tasksService.getById(taskId).then((data) => setTask(data))
    categoriesService.getAllByTaskId(taskId).then((data) => setCategories(data))
  }, [taskId])

  const treeData = useMemo(() => transformCategoriesForTree(categories), [categories])
  const parentKeys = useMemo(() => treeData.map((item) => item.key), [treeData])

  return (
    <div className="task-view-page">
      <h1 className="page-title">{task.title}</h1>
      <div className="task">
        <div className="task__body">
          <div className="task__description">{parse(task.description)}</div>

          <div className="task-categories">
            <Title level={4} className="task-categories__title">
              Categories:
            </Title>
            <Tree expandedKeys={parentKeys} showLine={<CarryOutOutlined />} treeData={treeData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Taskview
