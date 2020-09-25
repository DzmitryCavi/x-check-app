import React, { useState, useEffect, useRef } from 'react'
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
  DatePicker,
} from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import ImportTasks from '../../../component/ImportTasks'
import { authorRoutes } from '../../../router/routes'

import tasksService from '../../../services/tasks.service'

const { Column } = Table

const TasksList = ({ user }) => {
  const initTasks = useRef([])

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const [filtersForm] = Form.useForm()
  const [expandFilter, setExpandFilter] = useState(false)

  const sorter = {
    id: (a, b) => a.id - b.id,
    title: (a, b) => a.title.localeCompare(b.title),
    created_at: (a, b) => compareAsc(new Date(a.created_at), new Date(b.created_at)),
  }

  const filters = {
    title: (title, value) => title.toLowerCase().indexOf(value.toLowerCase()) !== -1,
    state: (state, value) => state === value || value.length === 0,
  }

  const fetchTasks = async () => {
    setLoading(true)
    const data = await tasksService.getAll()
    initTasks.current = data
    setTasks(initTasks.current)
    setLoading(false)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    initTasks.current = tasks
  }, [tasks])

  const onFilter = (filterData) => {
    setTasks(
      initTasks.current.filter((row) =>
        Object.keys(filterData).every((key) =>
          typeof filters[key] !== 'function' ? true : filters[key](row[key], filterData[key]),
        ),
      ),
    )
  }

  const onClearFilter = () => {
    setTasks(initTasks.current)
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

  const сhangeDateConstraints = async (taskId, dateRange) => {
    await tasksService.сhangeDateConstraints(taskId, dateRange)
  }

  return (
    <div className="tasks-list-page">
      <h1 className="page-title">Tasks</h1>
      <div className="tasks-filters">
        <h2 className="tasks-filters__title">Filters:</h2>
        <Form
          form={filtersForm}
          layout="vertical"
          onFinish={onFilter}
          initialValues={{
            title: '',
            state: '',
          }}
        >
          <Row gutter={30}>
            {expandFilter ? (
              <>
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
              </>
            ) : null}
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={!expandFilter}>
                  Filter
                </Button>
                <Button style={{ margin: '0 8px' }} onClick={onClearFilter}>
                  Clear
                </Button>
                <Button
                  style={{ fontSize: 12 }}
                  type="link"
                  onClick={() => {
                    setExpandFilter(!expandFilter)
                  }}
                >
                  {expandFilter ? <UpOutlined /> : <DownOutlined />} Collapse
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
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
      <Table dataSource={tasks} rowKey="id" loading={loading}>
        <Column width={60} title="#" dataIndex="id" key="id" sorter={sorter.id} />
        <Column
          title="Title"
          key="title"
          sorter={sorter.title}
          render={(row) => (
            <Link to={formatRoute(authorRoutes.tasks.view, { taskId: row.id })}>{row.title}</Link>
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
          title="Start & End Date"
          dataIndex="date"
          key="date"
          render={(row, task) => (
            <DatePicker.RangePicker
              defaultValue={[
                task.startDate ? moment(task.startDate) : null,
                task.endDate ? moment(task.endDate) : null,
              ]}
              allowEmpty={[true, true]}
              onChange={(dateRange) => сhangeDateConstraints(task.id, dateRange)}
              showTime
            />
          )}
        />
        <Column
          title="Created"
          dataIndex="created_at"
          key="created_at"
          sorter={sorter.created_at}
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
