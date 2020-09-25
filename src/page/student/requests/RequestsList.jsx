import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Space, Button, notification, Tag } from 'antd'
import { connect } from 'react-redux'
import { formatRoute } from 'react-router-named-routes'
import { DeleteOutlined, EditOutlined, CarryOutTwoTone } from '@ant-design/icons'

import ButtonLink from '../../../component/ButtonLink'
import { studentRoutes } from '../../../router/routes'
import requestService from '../../../services/requests.service'

const { Column } = Table

const RequestList = ({ user }) => {
  const [requests, setRequsets] = useState([])
  useEffect(() => {
    requestService.getByAuthor(user).then(setRequsets)
  }, [user])

  const destroyRequest = async (requestId) => {
    await requestService.destroyById(requestId)
    setRequsets((prev) => prev.filter((request) => request.id !== requestId))

    notification.success({
      className: 'app-notification app-notification--info',
      message: 'Success',
      description: 'Request deleted successfully...',
    })
  }

  return (
    <div className="tasks-list-page">
      <h1 className="page-title">Requests</h1>
      <div className="d-flex justify-content-end align-items-center mb-2">
        <ButtonLink type="primary" linkTo={studentRoutes.requests.create}>
          Sent
        </ButtonLink>
      </div>
      <Table dataSource={requests} rowKey="id">
        <Column title="Task" dataIndex="name" key="name" />
        <Column title="Created at" dataIndex="created_at" key="created_at" />
        <Column title="Updated at" dataIndex="updated_at" key="updated_at" />
        <Column
          title="State"
          key="state"
          render={({ state, id }) => {
            let color = ''
            let isGraduated = false
            switch (state) {
              case 'SUBMITTED':
                color = 'geekblue'
                break
              case 'GRADED':
                color = 'green'
                isGraduated = true
                break
              default:
                color = 'volcano'
            }
            return (
              <Space size="middle">
                <Tag color={color} key={state}>
                  {state}
                </Tag>
                {isGraduated && (
                  <ButtonLink
                    type="ghost"
                    size="small"
                    style={{ fontSize: 12, color: '#52c41a' }}
                    icon={<CarryOutTwoTone twoToneColor="#52c41a" />}
                    linkTo={formatRoute(studentRoutes.requests.grade, { requestId: id })}
                  >
                    View Grade
                  </ButtonLink>
                )}
              </Space>
            )
          }}
        />
        <Column
          title="Action"
          key="action"
          width={100}
          render={(row) => (
            <Space size="middle">
              <ButtonLink
                size="small"
                icon={<EditOutlined />}
                linkTo={formatRoute(studentRoutes.requests.edit, { requestId: row.id })}
              />

              <Button
                size="small"
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => {
                  destroyRequest(row.id)
                }}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  )
}

RequestList.propTypes = {
  user: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user.login,
  }
}

export default connect(mapStateToProps, null)(RequestList)
