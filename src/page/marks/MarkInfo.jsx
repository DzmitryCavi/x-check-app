import React from 'react'
import { useParams } from 'react-router-dom'
import fakeData from './fakeData'

const MarkInfo = () => {
  const { key } = useParams()
  const [element] = fakeData.filter((el) => el.key === +key)
  const { task, maxScore, reviewer, info, student, score } = element
  const { basicP1, extraP1, finesP1 } = info
  return (
    <div>
      <div>Task: {task}</div>
      <div>max_score: {maxScore}</div>
      <div>reviewer: {reviewer}</div>
      <div>student: {student}</div>
      <div>score: {score}</div>
      <div>
        <div>basic scope: {basicP1.score}</div>
        <div>comment: {basicP1.comment}</div>
        <div>extra scope: {extraP1.score}</div>
        <div>comment: {extraP1.comment}</div>
        <div>errors: {finesP1.score}</div>
        <div>comment: {finesP1.comment}</div>
      </div>
    </div>
  )
}

export default MarkInfo
