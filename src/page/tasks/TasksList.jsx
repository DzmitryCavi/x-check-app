import React from 'react'
import { Table, Space, Button } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import ButtonLink from '../../component/ButtonLink'

const { Column } = Table

const dataSource = [
  {
    id: 1,
    slug: 'task-1',
    title: 'Task 1',
    authorId: 11542402,
    state: 'DRAFT',
    categoriesOrder: ['Basic Scope', 'Extra Scope', 'Fines'],
  },
  {
    id: 2,
    slug: 'task-2',
    title: 'Task 2',
    authorId: 11542402,
    state: 'PUBLISHED',
    categoriesOrder: ['Basic Scope', 'Extra Scope', 'Fines'],
  },
]

const TasksList = () => {
  return (
    <div className="tasks-list-page">
      <div className="d-flex justify-content-end align-items-center mb-2">
        <ButtonLink type="primary" icon={<PlusOutlined />} linkTo="/tasks/create">
          Create
        </ButtonLink>
      </div>
      <Table dataSource={dataSource} rowKey="id">
        <Column width={60} title="#" dataIndex="id" key="id" />
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="State" dataIndex="state" key="state" />
        <Column
          title="Action"
          key="action"
          width={300}
          render={(row) => (
            <Space size="middle">
              <ButtonLink icon={<EditOutlined />} linkTo={`/tasks/edit/${row.id}`}>
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

export default TasksList
