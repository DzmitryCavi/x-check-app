import React, { useState, useEffect } from 'react'
import { Table, Tag } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import Axios from 'axios'
import Column from 'antd/lib/table/Column'
import ButtonLink from '../../component/ButtonLink'

const RequestsList = () => {
  const [infoTask, setInfoTask] = useState()

  useEffect(() => {
    // Axios.get(`${REACT_APP_API_URL}/reviewRequest`)
    Axios.get('http://localhost:50005/reviewRequest')
      .then((resp) => {
        const { data } = resp
        setInfoTask(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    setInfoTask(infoTask)
  }, [infoTask])

  return (
    <Table dataSource={infoTask} pagination={{ pageSize: 10 }} rowKey="author">
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
        render={() => (
          <ButtonLink
            type="primary"
            icon={<EditOutlined />}
            linkTo="/review"
            key={`${'action'}-btn`}
          >
            Review
          </ButtonLink>
        )}
      />
    </Table>
  )
}

export default RequestsList
