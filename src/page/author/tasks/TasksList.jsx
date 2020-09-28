import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { compareAsc } from 'date-fns'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAsync } from 'react-use'
import { formatRoute } from 'react-router-named-routes'
import {
  Form,
  Radio,
  Input,
  Row,
  Col,
  Table,
  Space,
  Button,
  Tag,
  message,
  Dropdown,
  Menu,
  Popconfirm,
  Collapse,
} from 'antd'
import { DeleteOutlined, DownOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import ButtonLink from '../../../component/ButtonLink'
import ImportTasks from '../../../component/ImportTasks'
import { authorRoutes } from '../../../router/routes'

import tasksService from '../../../services/tasks.service'

const { Column } = Table

const TasksList = ({ user }) => {
  const [tasks, setTasks] = useState([])
  const [paginator, setPaginator] = useState(null)
  const [loading, setLoading] = useState(true)

  const [filtersForm] = Form.useForm()

  const sortRules = {
    id: (a, b) => a.id - b.id,
    title: (a, b) => a.title.localeCompare(b.title),
    created_at: (a, b) => compareAsc(new Date(a.created_at), new Date(b.created_at)),
  }

  const fetchTasks = async (
    authorId,
    pagination = { current: 1, pageSize: 10 },
    filters = { title: '', state: '' },
  ) => {
    setLoading(true)
    const response = await tasksService.getAll({ pagination, filters, authorId })

    setPaginator(response.pagination)
    setTasks(response.data)
    setLoading(false)
  }

  useAsync(async () => {
    await fetchTasks(user.id)
  }, [user.id])

  const destroyTask = async (taskId) => {
    await tasksService.destroyById(taskId)
    const filterData = filtersForm.getFieldsValue(['title', 'state'])
    await fetchTasks(user.id, undefined, filterData)

    message.success('Task deleted successfully.')
  }

  const onFilter = async (filterData) => {
    await fetchTasks(user.id, undefined, filterData)
  }

  const onClearFilter = async () => {
    await fetchTasks(user.id)
    filtersForm.resetFields()
  }

  const exportById = async ({ id: taskId }, type) => {
    await tasksService.exportById(taskId, type)
  }

  const exportAll = async (type) => {
    await tasksService.exportAll(user.id, type)
  }

  const handleTableChange = async (pagination) => {
    const filterData = filtersForm.getFieldsValue(['title', 'state'])
    await fetchTasks(user.id, pagination, filterData)
  }

  return (
    <div className="tasks-list-page">
      <h1 className="page-title">Tasks</h1>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <Space>
          <ButtonLink type="primary" icon={<PlusOutlined />} linkTo={authorRoutes.tasks.create}>
            Create
          </ButtonLink>
          <Dropdown
            placement="bottomRight"
            overlay={
              <Menu>
                <Menu.ItemGroup title="Export">
                  <Menu.Item onClick={() => exportAll('custom')}>Export All (*.json)</Menu.Item>
                  <Menu.Item onClick={() => exportAll('rss')}>Export All (RSS *.json)</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Import">
                  <Menu.Item>
                    <ImportTasks
                      authorId={user.id}
                      label=" Import (*.json)"
                      type="custom"
                      onImportSuccess={() => fetchTasks(user.id)}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <ImportTasks
                      authorId={user.id}
                      label="Import (RSS *.json)"
                      type="rss"
                      onImportSuccess={() => fetchTasks(user.id)}
                    />
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu>
            }
          >
            <Button>
              Export / Import <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      </div>

      <div className="tasks-filters mb-3">
        <Form
          form={filtersForm}
          layout="vertical"
          onFinish={onFilter}
          initialValues={{
            title: '',
            state: '',
          }}
        >
          <Collapse className="tasks-filters-collapse">
            <Collapse.Panel header="Filter">
              <Row gutter={30}>
                <Col span={6}>
                  <Form.Item name="title" label="Title">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="State" name="state">
                    <Radio.Group>
                      <Radio.Button value="DRAFT">DRAFT</Radio.Button>
                      <Radio.Button value="PUBLISHED">PUBLISHED</Radio.Button>
                      <Radio.Button value="ARCHIVED">ARCHIVED</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item className="mb-0">
                    <Button type="primary" htmlType="submit">
                      Filter
                    </Button>
                    <Button style={{ margin: '0 8px' }} onClick={onClearFilter}>
                      Clear
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Collapse.Panel>
          </Collapse>
        </Form>
      </div>
      <Table
        dataSource={tasks}
        rowKey="id"
        loading={loading}
        pagination={paginator}
        onChange={handleTableChange}
        bordered
      >
        <Column width={60} title="#" dataIndex="id" key="id" sorter={sortRules.id} />
        <Column
          title="Title"
          key="title"
          sorter={sortRules.title}
          render={(row) => (
            <Link to={formatRoute(authorRoutes.tasks.view, { taskId: row.id })}>{row.title}</Link>
          )}
        />
        <Column
          title="Categories"
          dataIndex="categories"
          key="categories"
          render={(categories, row) => (
            <Space size="middle">
              {categories.length}
              <ButtonLink
                type="primary"
                icon={<PlusOutlined />}
                linkTo={formatRoute(authorRoutes.categories.create, { taskId: row.id })}
              >
                Add
              </ButtonLink>
            </Space>
          )}
        />
        <Column
          title="State"
          dataIndex="state"
          key="state"
          render={(state) => (
            <Tag
              color={{ PUBLISHED: 'green', ARCHIVED: 'orange', DRAFT: 'red' }[state]}
              key={state}
            >
              {state}
            </Tag>
          )}
        />
        <Column
          title="Created"
          dataIndex="created_at"
          key="created_at"
          sorter={sortRules.created_at}
          defaultSortOrder="descend"
        />
        <Column
          title="Action"
          key="action"
          width={200}
          render={(row, record) => (
            <Space size="middle">
              <Dropdown
                placement="topRight"
                overlay={
                  <Menu>
                    <Menu.Item onClick={() => exportById(record, 'custom')}>
                      Export (*.json)
                    </Menu.Item>
                    <Menu.Item onClick={() => exportById(record, 'rss')}>
                      Export (RSS *.json)
                    </Menu.Item>
                    <Menu.Item onClick={() => exportById(record, 'md')}>
                      Export (MarkDown *.md)
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button>Export</Button>
              </Dropdown>

              <ButtonLink
                icon={<EditOutlined />}
                linkTo={formatRoute(authorRoutes.tasks.edit, { taskId: row.id })}
              />

              <Popconfirm title="Sure to delete?" onConfirm={() => destroyTask(row.id)}>
                <Button type="danger" icon={<DeleteOutlined />} />
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </div>
  )
}

TasksList.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, null)(TasksList)
