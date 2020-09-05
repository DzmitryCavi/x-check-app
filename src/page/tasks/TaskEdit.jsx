import React from 'react'
import { useParams } from 'react-router-dom'

const CreateEdit = () => {
  const { taskId } = useParams()

  return (
    <div className="home-page">
      <h1>Edit Task #{taskId}</h1>
    </div>
  )
}

export default CreateEdit
