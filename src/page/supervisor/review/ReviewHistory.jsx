import React, { useState, useRef } from 'react'
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
import { useAsync } from 'react-use'
import { connect } from 'react-redux'
import { compareAsc } from 'date-fns'
import { formatRoute } from 'react-router-named-routes'
import { DeleteOutlined, EditOutlined, CarryOutTwoTone } from '@ant-design/icons'

import ButtonLink from '../../../component/ButtonLink'
import { supervisorRoutes } from '../../../router/routes'
import reviewsService from '../../../services/review.service'

import '../style.scss'

const { Column } = Table
const { Panel } = Collapse
const { Title } = Typography

const ReviewHistory = ({ user }) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const initRequests = useRef([])

  useAsync(async () => {
    setLoading(true)
    const reviewsResponse = await reviewsService.getAllGradedByAuthor(user)
    initRequests.current = reviewsResponse
    setReviews(initRequests.current)
    setLoading(false)
  }, [user])

  const destroyReview = async (requestId) => {
    await reviewsService.destroyById(requestId)
    setReviews((prev) => prev.filter((request) => request.id !== requestId))

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
    setReviews(
      initRequests.current.filter((row) =>
        Object.keys(filterData).every((key) =>
          typeof filters[key] !== 'function' ? true : filters[key](row[key], filterData[key]),
        ),
      ),
    )
  }

  const onClearFilter = () => {
    setReviews(initRequests.current)
    filtersForm.resetFields()
  }

  return (
    <div className="review-history-page">
      <Title level={2} className="page-title">
        Reviews
      </Title>
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
          <Collapse className="review-history-filters-collapse">
            <Panel header="Filters" key="1">
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
                      <Radio.Button value="DISPUTE">DISPUTE</Radio.Button>
                      <Radio.Button value="GRADED">GRADED</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
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
            </Panel>
          </Collapse>
        </Form>
      </div>

      <Table dataSource={reviews} rowKey="id" loading={loading}>
        <Column title="Task" dataIndex="name" key="name" sorter={sorter.name} />
        <Column title="Created at" dataIndex="created_at" key="created_at" sorter={sorter.data} />
        <Column title="Updated at" dataIndex="updated_at" key="updated_at" sorter={sorter.data} />
        <Column
          onFilter={(value, record) => record.name.includes(value)}
          title="State"
          key="state"
          render={({ state, id }) => {
            let children = <></>

            switch (state) {
              case 'DISPUTE':
                children = (
                  <>
                    {' '}
                    <Tag color="red" key={state}>
                      {state}
                    </Tag>
                    <ButtonLink
                      type="ghost"
                      size="small"
                      style={{ fontSize: 12, color: 'red' }}
                      icon={<CarryOutTwoTone twoToneColor="red" />}
                      linkTo={formatRoute(supervisorRoutes.reviews.dispute, { reviewId: id })}
                    >
                      View
                    </ButtonLink>
                  </>
                )
                break
              case 'DRAFT':
                children = (
                  <Tag color="yeallow" key={state}>
                    {state}
                  </Tag>
                )
                break
              default:
                children = (
                  <Tag color="green" key={state}>
                    {state}
                  </Tag>
                )
            }

            return <Space size="middle">{children}</Space>
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
                linkTo={formatRoute(supervisorRoutes.requests.review, { requestId: row.requestId })}
              />
              <Popconfirm title="Sure to delete?" onConfirm={() => destroyReview(row.id)}>
                <Button
                  size="small"
                  type="danger"
                  icon={<DeleteOutlined />}
                  disabled={row.state !== 'DRAFT'}
                />
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </div>
  )
}

ReviewHistory.propTypes = {
  user: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user.login,
  }
}

export default connect(mapStateToProps, null)(ReviewHistory)
