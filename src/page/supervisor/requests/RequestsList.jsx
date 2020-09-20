import React, { useState, useEffect } from 'react'
import { Table, Tag, Spin } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import Column from 'antd/lib/table/Column'
import { formatRoute } from 'react-router-named-routes'
import ButtonLink from '../../../component/ButtonLink'
import { supervisorRoutes } from '../../../router/routes'
import requestService from '../../../services/requests.service'

const RequestsList = () => {
  const [infoTask, setInfoTask] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    requestService.getAll().then((data) => {
      // initRequests = data
      setInfoTask(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    setInfoTask(infoTask)
  }, [infoTask])

  return loading ? (
    <div className="content-loading">
      <Spin tip="Loading..." />
    </div>
  ) : (
    <Table dataSource={infoTask} pagination={{ pageSize: 10 }} rowKey="author">
      <>
        <Column
          title="Name"
          dataIndex="author"
          key="author"
          sorter={(a, b) => a.author.localeCompare(b.author)}
        />
        <Column
          title="Task"
          dataIndex="task"
          key="task"
          sorter={(a, b) => a.task.localeCompare(b.task)}
        />
        <Column
          title="Status"
          dataIndex="state"
          key="state"
          sorter={(a, b) => a.state.localeCompare(b.state)}
          render={(state) => {
            let color
            if (state === 'PUBLISHED') {
              color = 'green'
            } else if (state === 'COMPLETED') {
              color = 'blue'
            } else if (state === 'DRAFT') {
              color = 'red'
            } else {
              color = 'blue'
            }

            return (
              <>
                <Tag color={color} key={state}>
                  {state}
                </Tag>
              </>
            )
          }}
        />

        <Column
          title="Action"
          key="action"
          dataIndex="id"
          render={(id) => (
            <ButtonLink
              type="primary"
              icon={<EditOutlined />}
              linkTo={formatRoute(supervisorRoutes.requests.review, { requestId: id })}
            >
              Review
            </ButtonLink>
          )}
        />
      </>
    </Table>
  )
}

export default RequestsList
