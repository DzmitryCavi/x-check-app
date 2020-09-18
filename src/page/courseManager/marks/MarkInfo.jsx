import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import marksService from '../../../services/marks.service'

const MarkInfo = () => {
  const { marksId } = useParams()

  const [loading, setLoading] = useState(true)

  const [mark, setMark] = useState(null)
  useEffect(() => {
    marksService.getMarksById(marksId).then((data) => {
      setMark(data)
      setLoading(false)
    })
  }, [marksId])

  const { task } = mark

  return (
    <div className="task-view-page">
      <h1 className="page-title">Title</h1>
      {loading ? (
        <div className="content-loading">
          <Spin tip="Loading..." />
        </div>
      ) : (
        <div className="task">
          <div className="task__body">{task}</div>
        </div>
      )}
    </div>
  )
}

export default MarkInfo
