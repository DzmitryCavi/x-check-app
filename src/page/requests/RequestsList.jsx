import React from 'react'
import { List, Avatar } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import ButtonLink from '../../component/ButtonLink'

const data = [
  {
    title: 'Task 1',
  },
  {
    title: 'Task 2',
  },
  {
    title: 'Task 3',
  },
  {
    title: 'Task 4',
  },
]

const RequestsList = () => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[
            <ButtonLink type="primary" icon={<EditOutlined />} linkTo={`/request/${item.title}`}>
              Review
            </ButtonLink>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  )
}

export default RequestsList
