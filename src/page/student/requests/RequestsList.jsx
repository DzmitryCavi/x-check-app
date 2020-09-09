import React, { useEffect, useState } from 'react'

import { Table, Space, Button } from 'antd'

import ButtonLink from '../../../component/ButtonLink'

import requestService from '../../../services/requests.service'

const { Column } = Table

const RequestList = () => {
  const [requests, setRequsets] = useState([])

  useEffect(() => {
    requestService.getAll().then(setRequsets)
  }, [])

  return (
    <div className="tasks-list-page">
      <h1 className="page-title">Requests</h1>
      <div className="d-flex justify-content-end align-items-center mb-2">
        <ButtonLink type="primary" linkTo="/student/request">
          Sent
        </ButtonLink>
      </div>
      <Table dataSource={requests} rowKey="id">
        <Column width={60} title="#" dataIndex="id" key="id" />
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="State" dataIndex="state" key="state" />
        <Column
          title="Action"
          key="action"
          width={300}
          render={() => (
            <Space size="middle">
              <Button type="danger" onClick={() => {}}>
                Remove
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  )
}

export default RequestList
