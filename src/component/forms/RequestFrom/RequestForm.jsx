import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import { format } from 'date-fns'
import { Form, Spin, Button, Input, Typography, Result, List, Space, Statistic, Alert } from 'antd'
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

  const totalScore = categories.reduce(
    (acc, curr) => (Number(curr.maxScore) > 0 ? acc + Number(curr.maxScore) : acc),
    0,
  )

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
      feedback: [
        {
          author: user.login,
          avatar: user.avatar_url,
          content: data.feedback,
          datetime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          id: uuid(),
        },
      ],
      score,
      state: 'SUBMITTED',
    }
    if (requestToEdit) requestsService.edit(requestData, requestToEdit.id)
    else requestsService.create(requestData, user.login)
    setIsSuccess(true)
    if (setIsNewRequest) setIsNewRequest(true)
  }

  const onSave = async () => {
    const formValues = form.getFieldsValue()
    const requestData = {
      name: task.title,
      taskId: task.id,
      ...formValues,
      score,
      feedback: formValues.feedback
        ? [
            {
              author: user.login,
              avatar: user.avatar_url,
              content: formValues.feedback,
              datetime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
              id: uuid(),
            },
          ]
        : [],
      state: 'DRAFT',
    }
    if (requestToEdit) requestsService.edit(requestData, requestToEdit.id)
    else requestsService.create(requestData, user.login)
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
        Request to review the task - {task.title}
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFieldsChange={calculateScore}
        initialValues={
          requestToEdit ? { ...requestToEdit, feedback: requestToEdit.feedback[0].content } : {}
        }
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
                <Title level={4} style={{ marginBottom: 0 }}>
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
                    className="mb-1"
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
          <Alert
            message={<Statistic title={<b>Score</b>} value={score} suffix={`/ ${totalScore}`} />}
            type="info"
            showIcon
          />
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
  user: PropTypes.instanceOf(Object).isRequired,
  requestToEdit: PropTypes.instanceOf(Object),
  setIsNewRequest: PropTypes.instanceOf(Function),
}

RequestForm.defaultProps = {
  requestToEdit: null,
  setIsNewRequest: null,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, null)(RequestForm)
