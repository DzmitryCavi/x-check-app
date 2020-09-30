import React, { useState, useRef } from 'react'
import { useAsync } from 'react-use'
import PropTypes from 'prop-types'
import {
  Table,
  Space,
  Button,
  notification,
  Tag,
  Form,
  Radio,
  Row,
  Col,
  Input,
  Collapse,
  Typography,
  Popconfirm,
} from 'antd'
import { connect } from 'react-redux'
import { compareAsc } from 'date-fns'
import { formatRoute } from 'react-router-named-routes'
import { DeleteOutlined, EditOutlined, CarryOutFilled } from '@ant-design/icons'

import ButtonLink from '../../../component/ButtonLink'
import { studentRoutes } from '../../../router/routes'
import requestService from '../../../services/requests.service'

import './style.scss'

const { Column } = Table
const { Panel } = Collapse
const { Title } = Typography

const RequestList = ({ user }) => {
  const [requests, setRequsets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const initRequests = useRef([])

  useAsync(async () => {
    const data = await requestService.getByAuthor(user)
    initRequests.current = data
    setRequsets(initRequests.current)
    setIsLoading(false)
  }, [user])

  const destroyRequest = async (requestId) => {
    await requestService.destroyById(requestId)
    setRequsets((prev) => prev.filter((request) => request.id !== requestId))

    notification.success({
      className: 'app-notification app-notification--info',
      message: 'Success',
      description: 'Request deleted successfully...',
    })
  }

  const [filtersForm] = Form.useForm()

  const sorter = {
    name: (a, b) => a.name.localeCompare(b.name),
    data: (a, b) => compareAsc(new Date(a.created_at), new Date(b.created_at)),
  }

  const filters = {
    name: (name, value) => name.toLowerCase().indexOf(value.toLowerCase()) !== -1,
    state: (state, value) => state === value || value.length === 0,
  }

  const onFilter = (filterData) => {
    setRequsets(
      initRequests.current.filter((row) =>
        Object.keys(filterData).every((key) =>
          typeof filters[key] !== 'function' ? true : filters[key](row[key], filterData[key]),
        ),
      ),
    )
  }

  const onClearFilter = () => {
    setRequsets(initRequests.current)
    filtersForm.resetFields()
  }

  return (
    <div className="request-list-page">
      <Title level={2} className="page-title">
        Requests
      </Title>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <ButtonLink type="primary" linkTo={studentRoutes.requests.create}>
          Sent request
        </ButtonLink>
      </div>
      <div className="requests-filters mb-3">
        <Form
          form={filtersForm}
          layout="vertical"
          onFinish={onFilter}
          initialValues={{
            name: '',
            state: '',
          }}
          style={{ width: '100%' }}
        >
          <Collapse className="requests-filters-collapse">
            <Panel header="Filters" key="1">
              <Row gutter={30}>
                <Col span={6}>
                  <Form.Item name="name" label="Name">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="State" name="state">
                    <Radio.Group>
                      <Radio.Button value="DRAFT">DRAFT</Radio.Button>
                      <Radio.Button value="SUBMITTED">SUBMITTED</Radio.Button>
                      <Radio.Button value="GRADED">GRADED</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
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
            </Panel>
          </Collapse>
        </Form>
      </div>

      <Table dataSource={requests} rowKey="id" loading={isLoading} bordered>
        <Column title="Task" dataIndex="name" key="name" sorter={sorter.name} />
        <Column title="Created at" dataIndex="created_at" key="created_at" sorter={sorter.data} />
        <Column title="Updated at" dataIndex="updated_at" key="updated_at" sorter={sorter.data} />
        <Column
          onFilter={(value, record) => record.name.includes(value)}
          title="State"
          key="state"
          render={({ state, id }) => {
            let color = ''
            let isGraduated = false
            switch (state) {
              case 'SUBMITTED':
                color = 'geekblue'
                break
              case 'GRADED':
                color = 'green'
                isGraduated = true
                break
              default:
                color = 'volcano'
            }
            return (
              <Space size="middle">
                <Tag color={color} key={state}>
                  {state}
                </Tag>
                {isGraduated && (
                  <ButtonLink
                    type="primary"
                    size="middle"
                    icon={<CarryOutFilled />}
                    linkTo={formatRoute(studentRoutes.requests.grade, { requestId: id })}
                  >
                    View Grade
                  </ButtonLink>
                )}
              </Space>
            )
          }}
        />
        <Column
          title="Action"
          key="action"
          width={100}
          render={(row) => (
            <Space size="middle">
              <ButtonLink
                icon={<EditOutlined />}
                linkTo={formatRoute(studentRoutes.requests.edit, { requestId: row.id })}
              />
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => destroyRequest(row.id)}
                disabled={row.state !== 'DRAFT'}
              >
                <Button type="danger" icon={<DeleteOutlined />} disabled={row.state !== 'DRAFT'} />
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </div>
  )
}

RequestList.propTypes = {
  user: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user.login,
  }
}

export default connect(mapStateToProps, null)(RequestList)
