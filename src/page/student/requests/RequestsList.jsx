import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Space, Button } from 'antd'
import { connect } from 'react-redux'
import { formatRoute } from 'react-router-named-routes'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import ButtonLink from '../../../component/ButtonLink'
import { studentRoutes } from '../../../router/routes'
import requestService from '../../../services/requests.service'

const { Column } = Table

const RequestList = ({ user }) => {
  const [requests, setRequsets] = useState([])
  useEffect(() => {
    requestService.getByAuthor(user).then(setRequsets)
  }, [user])

  return (
    <div className="tasks-list-page">
      <h1 className="page-title">Requests</h1>
      <div className="d-flex justify-content-end align-items-center mb-2">
        <ButtonLink type="primary" linkTo={studentRoutes.requests.create}>
          Sent
        </ButtonLink>
      </div>
      <Table dataSource={requests} rowKey="id">
        <Column title="Task" dataIndex="task" key="title" />
        <Column title="State" dataIndex="state" key="state" />
        <Column
          title="Action"
          key="action"
          width={300}
          render={(row) => (
            <Space size="middle">
              <ButtonLink
                icon={<EditOutlined />}
                linkTo={formatRoute(studentRoutes.requests.edit, { requestId: row.id })}
              >
                Edit
              </ButtonLink>
              <Button type="danger" icon={<DeleteOutlined />} onClick={() => {}}>
                Remove
              </Button>
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
