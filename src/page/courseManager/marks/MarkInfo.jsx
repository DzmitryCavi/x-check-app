import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import PropTypes from 'prop-types'

const MarkInfo = (props) => {
  const [state, setState] = useState({
    visible: false,
  })

  const showModal = () => {
    setState({ ...state, visible: true })
  }

  const handleCancel = () => {
    setState({ ...state, visible: false })
  }

  const { data } = props
  const { task, maxScore, reviewer, info, student, score } = data
  const { basicP1, extraP1, finesP1 } = info
  const { visible } = state
  const styleSheet = {
    modalText: { fontWeight: '500', fontSize: '15px' },
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        info
      </Button>
      <Modal
        title={`Task: ${task}   |    Student: ${student}`}
        visible={visible}
        onCancel={handleCancel}
        footer={[]}
      >
        <h3>reviewer: {reviewer}</h3>
        <h4>score: {score}</h4>
        <p style={styleSheet.modalText}>max_score: {maxScore}</p>
        <p style={styleSheet.modalText}>basic scope: {basicP1.score}</p>
        <p style={styleSheet.modalText}>extra scope: {extraP1.score}</p>
        <p style={styleSheet.modalText}>comment: {basicP1.comment}</p>
        <p style={styleSheet.modalText}>comment: {extraP1.comment}</p>
        <p style={styleSheet.modalText}>comment: {finesP1.comment}</p>
        <p style={styleSheet.modalText}>errors: {finesP1.score}</p>
      </Modal>
    </>
  )
}

MarkInfo.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
}

export default MarkInfo
