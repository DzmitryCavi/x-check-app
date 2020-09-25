import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Tree, Typography, Empty, Spin, Tag } from 'antd'
import { CarryOutOutlined } from '@ant-design/icons'

import requestsService from '../../../services/requests.service'

const { Title } = Typography

const transformCategoriesForTree = (grade) =>
  Object.keys(grade).map((category) => ({
    key: category,
    title: <span>{category}</span>,
    children: grade[category].map((criterion, idx) => ({
      key: category + idx,
      title: (
        <div className="item">
          {criterion.discription}&nbsp;
          <Tag color="default">{Number(criterion.number)}</Tag>
        </div>
      ),
    })),
  }))

const Grade = () => {
  const { requestId } = useParams()

  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const requestResponse = await requestsService.getById(requestId)

      setRequest(requestResponse)
      setLoading(false)
    }
    fetchData()
  }, [requestId])

  const treeData = useMemo(() => transformCategoriesForTree(request.selfGrade || []), [
    request.selfGrade,
  ])

  return (
    <div className="task-view-page">
      <h1 className="page-title">{request.title}</h1>
      {loading ? (
        <div className="content-loading">
          <Spin tip="Loading..." />
        </div>
      ) : (
        <div className="task">
          <div className="task__body">
            <div className="task-categories">
              <Title level={4} className="task-categories__title">
                Grade:
              </Title>
              {treeData.length ? (
                <Tree showLine={<CarryOutOutlined />} treeData={treeData} defaultExpandAll />
              ) : (
                <Empty description="Grade not found :(" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Grade
