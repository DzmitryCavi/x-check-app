/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Spin, Button, Input, Typography, Result, Row, Col, Space } from 'antd'
import RequestFormItem from './RequestFormItem'
import requestsService from '../../services/requests.service'
import { urlWithIpPattern } from '../../services/validators'

const { Title } = Typography

const RequestForm = ({ task, user, requestToEdit }) => {
  const { categories } = task
  const [isSuccess, setIsSuccess] = useState(false)
  const [score, setScore] = useState((requestToEdit && requestToEdit.score) || 0)
  const [form] = Form.useForm()

  const onFinish = async (data) => {
    const requestData = {
      name: task.title,
      task: task.id,
      ...data,
      score,
      state: 'SUBMITTED',
    }
    if (requestToEdit) requestsService.edit(requestData, requestToEdit.id)
    else requestsService.create(requestData, user)
    setIsSuccess(true)
  }
  const onSave = async () => {
    const requestData = {
      name: task.title,
      task: task.id,
      ...form.getFieldsValue(),
      score,
      state: 'DRAFT',
    }
    if (requestToEdit) requestsService.edit(requestData, requestToEdit.id)
    else requestsService.create(requestData, user)
    setIsSuccess(true)
  }
  const calculateScore = (_, allFields) => {
    setScore(
      allFields.reduce(
        (ac, el) => ac + (el.value && typeof el.value === 'object' ? +el.value.number : 0),
        0,
      ),
    )
  }

  return !isSuccess ? (
    <>
      <Title level={2}>Request to review the task - {task.title}</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFieldsChange={calculateScore}
        initialValues={requestToEdit || {}}
      >
        <Form.Item
          name="url"
          label="Solution URL"
          rules={[
            { required: true, pattern: urlWithIpPattern, message: 'Please provide a valid link' },
          ]}
        >
          <Input />
        </Form.Item>
        <Title level={3}>Self-review</Title>
        {categories ? (
          categories.map((category) => (
            <Space style={{ width: '100%' }} direction="vertical" key={category.id}>
              <Title level={4}>{category.title}</Title>
              {category.criteria.map((item, index) => (
                <div key={`criteria-${index + 1}`} style={{ height: '' }}>
                  <Form.Item
                    name={['selfGrade', category.title, index]}
                    label={`${item.text} (0-${item.score})`}
                    rules={[{ required: true, message: 'Please grade all' }]}
                  >
                    <RequestFormItem maxScore={item.score} />
                  </Form.Item>
                </div>
              ))}
            </Space>
          ))
        ) : (
          <Spin size="large" />
        )}
        <Row gutter={[10, 48]}>
          <Col span={24}>
            <Form.Item name="score">
              <Title level={3}>{`Score: ${score}`}</Title>
            </Form.Item>
          </Col>

          <Col span={2}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                SENT
              </Button>
            </Form.Item>
          </Col>
          <Col span={1}>
            {(!requestToEdit || requestToEdit.state === 'DRAFT') && (
              <Form.Item>
                <Button type="primary" onClick={onSave} danger>
                  DRAFT
                </Button>
              </Form.Item>
            )}
          </Col>
        </Row>
      </Form>
    </>
  ) : (
    <Result
      status="success"
      title="Request Has Been Sent Successfully !"
      subTitle="You can see the request status in the list!"
    />
  )
}

RequestForm.propTypes = {
  task: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.string.isRequired,
  requestToEdit: PropTypes.instanceOf(Object),
}

RequestForm.defaultProps = {
  requestToEdit: null,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user.login,
  }
}

export default connect(mapStateToProps, null)(RequestForm)
