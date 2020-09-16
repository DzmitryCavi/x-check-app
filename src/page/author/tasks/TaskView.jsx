import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Tree, Typography, Empty, Spin, Tag } from 'antd'
import { CarryOutOutlined } from '@ant-design/icons'
import parse from 'react-html-parser'

import ButtonLink from '../../../component/ButtonLink'

import tasksService from '../../../services/tasks.service'
import categoriesService from '../../../services/categories.service'

const { Title } = Typography

const transformCategoriesForTree = (categories) =>
  categories.map((category) => ({
    key: String(category.id),
    title: <span>{category.title}</span>,
    children: category.items.map((item) => ({
      key: item.id,
      title: (
        <div className="item">
          {parse(item.description)}&nbsp;
          <Tag color="default">{Number(item.score) > 0 ? `+${item.score}` : item.score}</Tag>
        </div>
      ),
    })),
  }))

const Taskview = () => {
  const { taskId } = useParams()

  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const taskResponse = await tasksService.getById(taskId)
      setTask(taskResponse)

      const categoriesResponse = await categoriesService.getAllByTaskId(taskId)
      setCategories(categoriesResponse)

      setLoading(false)
    }
    fetchData()
  }, [taskId])

  const treeData = useMemo(() => transformCategoriesForTree(categories), [categories])

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
                Criteria:
              </Title>
              {treeData.length ? (
                <Tree showLine={<CarryOutOutlined />} treeData={treeData} />
              ) : (
                <Empty description="Criteria not found :(">
                  <ButtonLink type="primary" linkTo={`/author/tasks/${taskId}/categories/create`}>
                    Create Now
                  </ButtonLink>
                </Empty>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Taskview
