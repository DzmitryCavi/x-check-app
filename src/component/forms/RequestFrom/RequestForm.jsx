import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Spin, Button, Input, Typography, Result, List, Space } from 'antd'
import parse from 'react-html-parser'
import RequestFormItem from './RequestFormItem'
import requestsService from '../../../services/requests.service'
import { urlWithIpPattern } from '../../../services/validators'

const { Title, Text } = Typography

const RequestForm = ({ task, user, requestToEdit, setIsNewRequest }) => {
  const { categories } = task
  const [isSuccess, setIsSuccess] = useState(false)
  const [score, setScore] = useState((requestToEdit && requestToEdit.score) || 0)
  const [form] = Form.useForm()

  useEffect(() => {
    return task
      ? () => {
          form.resetFields()
          setIsSuccess(false)
        }
      : null
  }, [task, form])

  const onFinish = async (data) => {
    const requestData = {
      name: task.title,
      taskId: task.id,
      ...data,
      score,
      state: 'SUBMITTED',
    }
    if (requestToEdit) requestsService.edit(requestData, requestToEdit.id)
    else requestsService.create(requestData, user)
    setIsSuccess(true)
    if (setIsNewRequest) setIsNewRequest(true)
  }
  const onSave = async () => {
    const requestData = {
      name: task.title,
      taskId: task.id,
      ...form.getFieldsValue(),
      score,
      state: 'DRAFT',
    }
    if (requestToEdit) requestsService.edit(requestData, requestToEdit.id)
    else requestsService.create(requestData, user)
    setIsSuccess(true)
    if (setIsNewRequest) setIsNewRequest(true)
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
      <Title level={2} className="page-subtitle page-subtitle--border mt-2 mb-3">
        Request to review the task
      </Title>
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
        <Title level={2} className="page-subtitle page-subtitle--border mb-2">
          Self-review
        </Title>
        {categories ? (
          categories.map((category, catIdx) => (
            <List
              itemLayout="vertical"
              header={
                <Title level={4} style={{ marginBottom: -10 }}>
                  {catIdx + 1}. {category.title}
                </Title>
              }
              key={category.id}
              dataSource={category.criteria}
              renderItem={(item, crIdx) => (
                <List.Item key={`criteria-${crIdx + 1}`} className="ml-2">
                  <div className="d-flex">
                    <span>{`${catIdx + 1}.${crIdx + 1}.`}</span>&nbsp;
                    <Text>{parse(`${item.text}`)}</Text>
                  </div>
                  <Form.Item
                    name={['selfGrade', category.title, crIdx]}
                    rules={[{ required: true, message: 'Please grade all' }]}
                  >
                    <RequestFormItem maxScore={item.score} criteriaId={item.id} />
                  </Form.Item>
                </List.Item>
              )}
            />
          ))
        ) : (
          <Spin size="large" />
        )}
        <Form.Item name="score">
          <Title level={3}>{`Score: ${score}`}</Title>
        </Form.Item>
        <Form.Item name="feedback" label="Feedback">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Sent
            </Button>
            {(!requestToEdit || requestToEdit.state === 'DRAFT') && (
              <Button type="primary" onClick={onSave} danger>
                Draft
              </Button>
            )}
          </Space>
        </Form.Item>
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
  setIsNewRequest: PropTypes.instanceOf(Function),
}

RequestForm.defaultProps = {
  requestToEdit: null,
  setIsNewRequest: null,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user.login,
  }
}

export default connect(mapStateToProps, null)(RequestForm)
