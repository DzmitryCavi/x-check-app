import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import PropTypes from 'prop-types'
import fakeData from './fakeData'

export default class MarkInfo extends Component {
  constructor() {
    super()
    this.state = {
      visible: false,
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { infoKey } = this.props
    const [element] = fakeData.filter((el) => el.key === infoKey)
    const { task, maxScore, reviewer, info, student, score } = element
    const { basicP1, extraP1, finesP1 } = info
    const { visible } = this.state
    const styleSheet = {
      modalText: { fontWeight: '500', fontSize: '15px' },
    }

    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          info
        </Button>
        <Modal
          title={`Task: ${task}   |    Student: ${student}`}
          visible={visible}
          onCancel={this.handleCancel}
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
}

MarkInfo.propTypes = {
  infoKey: PropTypes.number.isRequired,
}
