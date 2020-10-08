import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown, Menu } from 'antd'
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'

import crossCheckService from '../services/crossCheck.service'

const CrossCheckDropdown = ({ task, crossCheckTask, onOpen, onClose, onDestroy }) => {
  const crossCheckClose = async (crossCheckId) => {
    // eslint-disable-next-line no-alert
    const isconfirm = window.confirm('Sure to close?')
    if (!isconfirm) return
    const { id, closedAt } = await crossCheckService.closeById(crossCheckId)
    crossCheckService.startReviewsById(crossCheckId)
    if (id) onClose(id, closedAt)
  }

  const crossCheckOpen = async (crossCheckId) => {
    // eslint-disable-next-line no-alert
    const isConfirm = window.confirm('Sure to open?')
    if (!isConfirm) return

    const { id } = await crossCheckService.openById(crossCheckId)
    if (id) onOpen(id)
  }

  const crossCheckDestroy = async (crossCheckId) => {
    // eslint-disable-next-line no-alert
    const isConfirm = window.confirm('Sure to delete?')
    if (!isConfirm) return

    const id = await crossCheckService.destroyById(crossCheckId)
    if (id) onDestroy(id)
  }

  const crossCheckOverlay = () => {
    if (task.assessmentType === 'CROSS_CHECK' && crossCheckTask) {
      return (
        <Menu>
          {crossCheckTask && !crossCheckTask.closedAt ? (
            <Menu.Item
              style={{
                color: 'red',
              }}
              onClick={() => crossCheckClose(crossCheckTask.id)}
            >
              Close
            </Menu.Item>
          ) : (
            <Menu.Item onClick={() => crossCheckOpen(crossCheckTask.id)}>Open</Menu.Item>
          )}
          <Menu.Item
            style={{
              color: 'red',
              opacity: crossCheckTask === undefined ? '.25' : '1',
            }}
            onClick={() => crossCheckDestroy(crossCheckTask.id)}
            disabled={crossCheckTask === undefined}
          >
            Destroy
          </Menu.Item>
        </Menu>
      )
    }
    return null
  }

  const overlay = crossCheckOverlay()

  if (crossCheckTask && crossCheckTask.closedAt && task.assessmentType !== 'CROSS_CHECK') {
    return (
      <Button
        icon={<DeleteOutlined />}
        type="danger"
        onClick={() => crossCheckDestroy(crossCheckTask.id)}
      >
        Cross-check
      </Button>
    )
  }

  if (!overlay) {
    return (
      <Button icon={<SettingOutlined />} type="primary" disabled>
        Cross-check
      </Button>
    )
  }

  return (
    <Dropdown placement="topRight" overlay={crossCheckOverlay()}>
      <Button icon={<SettingOutlined />} type="primary">
        Cross-check
      </Button>
    </Dropdown>
  )
}

CrossCheckDropdown.defaultProps = {
  crossCheckTask: undefined,
}

CrossCheckDropdown.propTypes = {
  task: PropTypes.instanceOf(Object).isRequired,
  crossCheckTask: PropTypes.instanceOf(Object),
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
}

export default CrossCheckDropdown
