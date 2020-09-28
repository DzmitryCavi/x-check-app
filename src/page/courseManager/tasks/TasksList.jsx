import React, { useState } from 'react'
import { useAsync } from 'react-use'
import PropTypes from 'prop-types'
import moment from 'moment'
import { compareAsc } from 'date-fns'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
  Dropdown,
  Menu,
  Collapse,
} from 'antd'
import { DownOutlined } from '@ant-design/icons'
import ImportTasks from '../../../component/ImportTasks'
import TaskDateConstraints from '../../../component/TaskDateConstraints'
import { courseManagerRoutes } from '../../../router/routes'

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
    pagination = { current: 1, pageSize: 5 },
    filters = { title: '', state: '' },
  ) => {
    setLoading(true)
    const response = await tasksService.getAll({ pagination, filters })

    setPaginator(response.pagination)
    setTasks(response.data)
    setLoading(false)
  }

  useAsync(async () => {
    await fetchTasks()
  }, [])

  const onFilter = async (filterData) => {
    await fetchTasks(undefined, filterData)
  }

  const onClearFilter = async () => {
    await fetchTasks()
    filtersForm.resetFields()
  }

  const exportById = async ({ id: taskId }, type) => {
    await tasksService.exportById(taskId, type)
  }

  const exportAll = async (type) => {
    await tasksService.exportAll(user.id, type)
  }

  const getStatusTask = (rangeDate) => {
    const startDate = rangeDate.startDate ? moment(rangeDate.startDate) : null
    const endDate = rangeDate.endDate ? moment(rangeDate.endDate) : null

    const date = moment()

    if (
      (startDate && endDate && date.isBetween(startDate, endDate)) ||
      (startDate && !endDate && date.isAfter(startDate)) ||
      (!startDate && endDate && date.isBefore(endDate))
    ) {
      return 'ACTIVE'
    }

    if (endDate && date.isAfter(endDate)) {
      return 'NOT_ACTIVE'
    }

    if (startDate && date.isBefore(startDate)) {
      return 'PLANNED'
    }

    return ''
  }

  const handleTableChange = async (pagination) => {
    const filterData = filtersForm.getFieldsValue(['title', 'state'])
    await fetchTasks(pagination, filterData)
  }

  const onDateConstraintsChange = (taskId, { startDate, endDate }) => {
    setTasks((prev) =>
      prev.map((task) => (taskId === task.id ? { ...task, startDate, endDate } : task)),
    )
  }

  return (
    <div className="tasks-list-page">
      <h1 className="page-title">Tasks</h1>
      <div className="d-flex justify-content-end align-items-center mb-2">
        <Space>
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
        <Column width={60} title="#" dataIndex="id" key="id" sortRules={sortRules.id} />
        <Column
          title="Title"
          key="title"
          sortRules={sortRules.title}
          render={(row) => (
            <Link to={formatRoute(courseManagerRoutes.tasks.view, { taskId: row.id })}>
              {row.title}
            </Link>
          )}
        />
        <Column
          title="Status"
          key="status"
          render={(row, { startDate, endDate }, idx) => {
            const status = getStatusTask({ startDate, endDate })
            return (
              <Tag
                color={{ PLANNED: 'blue', ACTIVE: 'green', NOT_ACTIVE: 'orange' }[status]}
                key={idx}
              >
                {{ PLANNED: 'PLANNED', ACTIVE: 'ACTIVE', NOT_ACTIVE: 'NOT ACTIVE' }[status]}
              </Tag>
            )
          }}
        />
        <Column
          width={460}
          title="Start & End Date"
          dataIndex="date"
          key="date"
          render={(row, task) => (
            <TaskDateConstraints task={task} onChange={onDateConstraintsChange} />
          )}
        />
        <Column
          title="Created"
          dataIndex="created_at"
          key="created_at"
          sortRules={sortRules.created_at}
          defaultSortOrder="descend"
        />
        <Column
          title="Action"
          key="action"
          width={100}
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
