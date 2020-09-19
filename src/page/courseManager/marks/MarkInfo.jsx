import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin, Descriptions, Tag } from 'antd'
import marksService from '../../../services/marks.service'

const MarkInfo = () => {
  const { marksId } = useParams()

  const [loading, setLoading] = useState(true)

  const [mark, setMark] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const markResponse = await marksService.getMarksById(marksId)
      setMark(markResponse)
      setLoading(false)
    }
    fetchData()
  }, [marksId])

  const { task, student, author, state, grade } = mark

  return (
    <div className="mark-view-page">
      {loading ? (
        <div className="content-loading">
          <Spin tip="Loading..." />
        </div>
      ) : (
        <Descriptions title="Mark Info" layout="vertical" bordered="true">
          <Descriptions.Item label="Task">{task}</Descriptions.Item>
          <Descriptions.Item label="Student">{student}</Descriptions.Item>
          <Descriptions.Item label="Mentor">{author}</Descriptions.Item>
          <Descriptions.Item label="State">
            <Tag
              color={{ ACCEPTED: 'green', DISPUTED: 'orange', REJECTED: 'red' }[state]}
              key={state}
            >
              {state}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Score">{grade.score}</Descriptions.Item>
          <Descriptions.Item label="Max Score">{grade.maxScore}</Descriptions.Item>
          <Descriptions.Item span={3}>
            <br />
          </Descriptions.Item>
          <Descriptions.Item label="Basic Scope" span={2}>
            {grade.basic_p1.comment}
          </Descriptions.Item>
          <Descriptions.Item label="Basic Score">{grade.basic_p1.score}</Descriptions.Item>
          <Descriptions.Item label="Extra Scope" span={2}>
            {grade.extra_p1.comment}
          </Descriptions.Item>
          <Descriptions.Item label="Extra Score">{grade.extra_p1.score}</Descriptions.Item>
          <Descriptions.Item label="Errors" span={2}>
            {grade.fines_p1.comment}
          </Descriptions.Item>
          <Descriptions.Item label="Removed Score">-{grade.fines_p1.score}</Descriptions.Item>
        </Descriptions>
      )}
    </div>
  )
}

export default MarkInfo
