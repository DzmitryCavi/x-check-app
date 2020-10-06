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
import TaskDateConstraints from '../../../component/TaskDateConstraints'
import CrossCheckDropdown from '../../../component/CrossCheckDropdown'
import { courseManagerRoutes } from '../../../router/routes'

import tasksService from '../../../services/tasks.service'
import crossCheckService from '../../../services/crossCheck.service'

const { Column } = Table

const TasksList = ({ user }) => {
  const [tasks, setTasks] = useState([])
  const [crossCheckSession, setCrossCheckSession] = useState([])
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
    const responseCrossCheckSessions = await crossCheckService.getAll()
    setCrossCheckSession(responseCrossCheckSessions)

    const responseTasks = await tasksService.getAll({ pagination, filters, state: 'PUBLISHED' })

    setPaginator(responseTasks.pagination)
    setTasks(responseTasks.data)
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

    return 'NOT_ACTIVE'
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

  const handleCreateCrossCheck = async (data) => {
    setCrossCheckSession(crossCheckSession.concat(data))
  }

  const handleCloseCrossCheck = async (crossCheckId, closedAt) => {
    setCrossCheckSession(
      crossCheckSession.map((item) =>
        item.id === crossCheckId
          ? {
              ...item,
              closedAt,
            }
          : item,
      ),
    )
  }

  const handleOpenCrossCheck = async (crossCheckId) => {
    setCrossCheckSession(
      crossCheckSession.map((item) =>
        item.id === crossCheckId
          ? {
              ...item,
              closedAt: null,
            }
          : item,
      ),
    )
  }

  const handleDestroyCrossCheck = async (crossCheckId) => {
    setCrossCheckSession(crossCheckSession.filter((item) => item.id !== crossCheckId))
  }

  const handleClearDateConstraints = async (_, crossCheckId) => {
    // eslint-disable-next-line no-alert
    const isconfirm = window.confirm('Cross-check session will be stopped! Are you sure?')
    if (!isconfirm) return

    const { id, closedAt } = await crossCheckService.closeById(crossCheckId)
    if (id) handleCloseCrossCheck(id, closedAt)
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
                <Menu.Item onClick={() => exportAll('custom')}>Export All (*.json)</Menu.Item>
                <Menu.Item onClick={() => exportAll('rss')}>Export All (RSS *.json)</Menu.Item>
              </Menu>
            }
          >
            <Button>
              Export <DownOutlined />
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
          width={300}
          title="Status"
          key="status"
          render={(_, task, idx) => {
            const status = getStatusTask({ startDate: task.startDate, endDate: task.endDate })
            const crossCheckTask = crossCheckSession.find((item) => item.taskId === task.id)

            return (
              <>
                <Tag
                  color={{ PLANNED: 'blue', ACTIVE: 'green', NOT_ACTIVE: 'orange' }[status]}
                  key={idx}
                >
                  {{ PLANNED: 'PLANNED', ACTIVE: 'ACTIVE', NOT_ACTIVE: 'NOT ACTIVE' }[status]}
                </Tag>
                {crossCheckTask ? (
                  <Tag color="red">
                    CROSS-CHECK{' '}
                    <small>
                      <b>{crossCheckTask.closedAt ? '(closed)' : '(opened)'}</b>
                    </small>
                  </Tag>
                ) : null}
              </>
            )
          }}
        />
        <Column
          width={460}
          title="Start & End Date"
          dataIndex="date"
          key="date"
          render={(_, task) => {
            const crossCheckTask = crossCheckSession.find((item) => item.taskId === task.id)

            return (
              <TaskDateConstraints
                task={task}
                onChange={onDateConstraintsChange}
                onClear={(taskId) => handleClearDateConstraints(taskId, crossCheckTask.id)}
              />
            )
          }}
        />
        <Column
          title="Action"
          key="action"
          width={200}
          render={(_, task) => {
            const status = getStatusTask({ startDate: task.startDate, endDate: task.endDate })
            const crossCheckTask = crossCheckSession.find((item) => item.taskId === task.id)

            return (
              <Space size="middle">
                <Dropdown
                  placement="topRight"
                  overlay={
                    <Menu>
                      <Menu.Item onClick={() => exportById(task, 'custom')}>
                        Export (*.json)
                      </Menu.Item>
                      <Menu.Item onClick={() => exportById(task, 'rss')}>
                        Export (RSS *.json)
                      </Menu.Item>
                      <Menu.Item onClick={() => exportById(task, 'md')}>
                        Export (MarkDown *.md)
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button>Export</Button>
                </Dropdown>
                <CrossCheckDropdown
                  task={task}
                  status={status}
                  crossCheckTask={crossCheckTask}
                  onCreate={handleCreateCrossCheck}
                  onOpen={handleOpenCrossCheck}
                  onClose={handleCloseCrossCheck}
                  onDestroy={handleDestroyCrossCheck}
                />
              </Space>
            )
          }}
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
