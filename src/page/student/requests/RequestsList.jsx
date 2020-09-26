import React, { useEffect, useState, useRef } from 'react'
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
} from 'antd'
import { connect } from 'react-redux'
import { compareAsc } from 'date-fns'
import { formatRoute } from 'react-router-named-routes'
import {
  DeleteOutlined,
  EditOutlined,
  CarryOutTwoTone,
  CaretRightOutlined,
} from '@ant-design/icons'

import ButtonLink from '../../../component/ButtonLink'
import { studentRoutes } from '../../../router/routes'
import requestService from '../../../services/requests.service'

const { Column } = Table
const { Panel } = Collapse
const { Title } = Typography

const RequestList = ({ user }) => {
  const [requests, setRequsets] = useState([])
  const initRequests = useRef([])

  const fetchRequests = async (id) => {
    const data = await requestService.getByAuthor(id)
    initRequests.current = data
    setRequsets(initRequests.current)
  }

  useEffect(() => {
    fetchRequests(user)
  }, [user])

  // useEffect(() => {
  //   initRequests.current = requests
  // }, [requests])

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
    <>
      <Title>Requests</Title>
      <Row>
        <Col span={24}>
          <Collapse
            bordered={false}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          >
            <Panel header="Filters" key="1">
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
                <Row>
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
                  <Col span={3}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Filter
                      </Button>
                      <Button style={{ margin: '0 8px' }} onClick={onClearFilter}>
                        Clear
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Panel>
          </Collapse>
          <ButtonLink
            type="primary"
            linkTo={studentRoutes.requests.create}
            style={{ position: 'absolute', top: 0, right: 0, height: '100%' }}
          >
            Sent request
          </ButtonLink>
        </Col>
      </Row>

      <Table dataSource={requests} rowKey="id">
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
                    type="ghost"
                    size="small"
                    style={{ fontSize: 12, color: '#52c41a' }}
                    icon={<CarryOutTwoTone twoToneColor="#52c41a" />}
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
                size="small"
                icon={<EditOutlined />}
                linkTo={formatRoute(studentRoutes.requests.edit, { requestId: row.id })}
              />

              <Button
                size="small"
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => {
                  destroyRequest(row.id)
                }}
              />
            </Space>
          )}
        />
      </Table>
    </>
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
