import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { compareAsc } from 'date-fns'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatRoute } from 'react-router-named-routes'
import { Form, Radio, Input, Row, Col, Table, Space, Button, Tag, notification } from 'antd'
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExportOutlined,
  PlusOutlined,
  UpOutlined,
} from '@ant-design/icons'
import ButtonLink from '../../../component/ButtonLink'
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

  useEffect(() => {
    tasksService.getAllByAuthorId(user.id).then((data) => {
      initTasks.current = data
      setTasks(initTasks.current)
      setLoading(false)
    })
  }, [user.id])

  const destroyTask = async (taskId) => {
    await tasksService.destroyById(taskId)
    setTasks((prev) => prev.filter((task) => task.id !== taskId))

    notification.success({
      className: 'app-notification app-notification--info',
      message: 'Success',
      description: 'Task deleted successfully...',
    })
  }

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

  const exportAll = async () => {
    await tasksService.exportAll()
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
          <ButtonLink type="primary" icon={<PlusOutlined />} linkTo={authorRoutes.tasks.create}>
            Create
          </ButtonLink>
          <Button type="primary" icon={<ExportOutlined />} onClick={exportAll}>
            Export All
          </Button>
          <ImportTasks />
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
          title="Created"
          dataIndex="created_at"
          key="created_at"
          sorter={sorter.created_at}
          defaultSortOrder="descend"
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
          title="Action"
          key="action"
          width={300}
          render={(row) => (
            <Space size="middle">
              <ButtonLink
                type="primary"
                icon={<PlusOutlined />}
                linkTo={formatRoute(authorRoutes.categories.create, { taskId: row.id })}
              >
                Category
              </ButtonLink>

              {/* <ButtonLink
                icon={<EyeOutlined />}
                linkTo={formatRoute(authorRoutes.tasks.view, { taskId: row.id })}
              >
                View
              </ButtonLink> */}

              <ButtonLink
                icon={<EditOutlined />}
                linkTo={formatRoute(authorRoutes.tasks.edit, { taskId: row.id })}
              >
                Edit
              </ButtonLink>

              <Button type="danger" icon={<DeleteOutlined />} onClick={() => destroyTask(row.id)}>
                Remove
              </Button>
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
