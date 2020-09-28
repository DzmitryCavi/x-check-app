import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Spin, Button, Typography, Result, Row, Col, Space } from 'antd'
import { useParams } from 'react-router-dom'
import parse from 'react-html-parser'
import ReviewFormItem from './ReviewFormItem'
import requestsService from '../../../services/requests.service'
import tasksService from '../../../services/tasks.service'
import reviewService from '../../../services/review.service'

const { Title, Link, Text } = Typography

const ReviewForm = ({ user }) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [score, setScore] = useState(0)
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState(null)
  const [reviewToEdit, setReviewToEdit] = useState(null)
  const [form] = Form.useForm()
  const { requestId } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      const requestResponse = await requestsService.getById(requestId)
      const taskResponse = await tasksService.getById(requestResponse.taskId)

      if (requestResponse.state === 'GRADED') {
        const [reviewsResponse] = await reviewService.getByRequestId(requestResponse.id)
        setReviewToEdit(reviewsResponse)
        setScore(reviewsResponse.score)
      }
      setRequest(requestResponse)
      setTask(taskResponse)
      setLoading(false)
    }
    fetchData()
  }, [requestId])

  const onFinish = async (data) => {
    const reviewData = {
      name: task.title,
      taskId: task.id,
      requestId,
      student: request.author,
      ...data,
      score,
      state: 'GRADED',
    }
    if (reviewToEdit) reviewService.edit(reviewData, reviewToEdit.id)
    else {
      reviewService.create(reviewData, user)
      requestsService.closeByID(requestId)
    }
    setIsSuccess(true)
  }

  const onSave = async () => {
    const reviewData = {
      name: task.title,
      taskId: task.id,
      requestId: request.id,
      ...form.getFieldsValue(),
      student: request.author,
      score,
      state: 'DRAFT',
    }
    if (reviewToEdit) reviewService.edit(reviewData, reviewToEdit.id)
    else reviewService.create(reviewData, user)
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

  return loading ? (
    <Spin />
  ) : (
    <>
      {!isSuccess ? (
        <>
          <Title level={2}>Request to review the task - {task.title}</Title>
          <Title level={3}>Solution URL</Title>

          <Link href={request.url} target="_blank">
            {request.url}
          </Link>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFieldsChange={calculateScore}
            initialValues={reviewToEdit || {}}
          >
            <Title level={3}>Review</Title>
            {task.categories.map((category) => (
              <Space style={{ width: '100%' }} direction="vertical" key={category.id}>
                <Title level={4}>{category.title}</Title>
                {category.criteria.map((item, index) => (
                  <div key={`criteria-${index + 1}`} style={{ height: '' }}>
                    <Text>{parse(`${item.text}`)}</Text>
                    <Form.Item
                      name={['grade', category.title, index]}
                      rules={[{ required: true, message: 'Please grade all' }]}
                    >
                      <ReviewFormItem
                        maxScore={item.score}
                        selfGrade={request.selfGrade[category.title].find(
                          (el) => el.criteriaId === item.id,
                        )}
                        criteriaId={item.id}
                      />
                    </Form.Item>
                  </div>
                ))}
              </Space>
            ))}
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
                {(!reviewToEdit || reviewToEdit.state === 'DRAFT') && (
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
      )}
    </>
  )
}

ReviewForm.propTypes = {
  user: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user.login,
  }
}

export default connect(mapStateToProps, null)(ReviewForm)
