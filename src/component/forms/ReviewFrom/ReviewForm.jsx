import React, { useRef, useState } from 'react'
import { useAsync } from 'react-use'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Form,
  Spin,
  Button,
  Typography,
  Result,
  Space,
  Input,
  Statistic,
  Alert,
  Collapse,
} from 'antd'
import { useParams } from 'react-router-dom'
import parse from 'react-html-parser'
import ReviewFormItem from './ReviewFormItem'
import requestsService from '../../../services/requests.service'
import tasksService from '../../../services/tasks.service'
import reviewService from '../../../services/review.service'
import NumericInput from '../../NumericInput'
import Feedback from '../../Feedback'

const { Title, Link } = Typography

const ReviewForm = ({ user }) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [score, setScore] = useState(0)
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState(null)
  const [reviewToEdit, setReviewToEdit] = useState(null)
  const [form] = Form.useForm()
  const { requestId } = useParams()

  const totalScore = useRef(0)

  useAsync(async () => {
    const requestResponse = await requestsService.getById(requestId)
    const taskResponse = await tasksService.getById(requestResponse.taskId)
    const [reviewsResponse] = await reviewService.getByRequestId(requestResponse.id)

    totalScore.current = taskResponse.categories.reduce(
      (acc, curr) => (Number(curr.maxScore) > 0 ? acc + Number(curr.maxScore) : acc),
      0,
    )

    if (reviewsResponse) {
      setReviewToEdit(reviewsResponse)
      setScore(reviewsResponse.score)
    }
    setRequest(requestResponse)
    setTask(taskResponse)
    setLoading(false)
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
    if (reviewToEdit) {
      reviewService.edit(reviewData, reviewToEdit.id)
      requestsService.closeByID(requestId)
    } else {
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
    const extra = +allFields.find((el) => el.name[1] === 'score').value || 0
    const gradeScore = allFields.reduce(
      (ac, el) => ac + (el.value && typeof el.value === 'object' ? +el.value.number : 0),
      0,
    )

    setScore(gradeScore + extra)
  }

  return loading ? (
    <Spin className="content-loading" size="large" />
  ) : (
    <>
      {!isSuccess ? (
        <>
          <Title level={3} className="page-subtitle page-subtitle--border mb-3">
            Task: {task.title}
          </Title>
          <Title level={3} className="page-subtitle page-subtitle--border mb-3">
            Solution URL:&nbsp;
            <Link href={request.url} target="_blank">
              {request.url}
            </Link>
          </Title>

          <hr style={{ marginTop: 50, marginBottom: 30 }} />

          <Title level={3} className="page-subtitle page-subtitle--border mb-3">
            Grade:
          </Title>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFieldsChange={calculateScore}
            initialValues={reviewToEdit || {}}
          >
            {task.categories.map((category, catIdx) => (
              <Space style={{ width: '100%' }} direction="vertical" key={category.id}>
                <Title level={4}>{`${catIdx + 1}. ${category.title}`}</Title>
                {category.criteria.map((item, crIdx) => (
                  <div key={`criteria-${crIdx + 1}`} className="ml-2">
                    <div className="d-flex">
                      <span>{`${catIdx + 1}.${crIdx + 1}.`}&nbsp;</span>
                      {parse(`${item.text}`)}
                    </div>
                    <Form.Item
                      name={['grade', category.title, crIdx]}
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

            <Collapse className="mt-2 mb-2">
              <Collapse.Panel header="Extra" key="extra" forceRender>
                <Form.Item
                  name={['extra', 'score']}
                  label="Extra point or penalty (Not obligatory)"
                >
                  <NumericInput placeholder="Any point" />
                </Form.Item>

                <Form.Item className="mb-0" name={['extra', 'comment']} label="Comment">
                  <Input.TextArea />
                </Form.Item>
              </Collapse.Panel>
            </Collapse>

            <Form.Item name="score">
              <Alert
                message={
                  <Statistic
                    title={<b>Score</b>}
                    value={score}
                    suffix={`/ ${totalScore.current}`}
                  />
                }
                type="info"
                showIcon
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Sent
                </Button>
                {(!reviewToEdit || reviewToEdit.state === 'DRAFT') && (
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
      )}

      <hr style={{ marginTop: 50, marginBottom: 30 }} />

      <Title level={3} className="page-subtitle page-subtitle--border mb-3">
        Feedback:
      </Title>
      <Feedback feedback={request.feedback} requestId={requestId} />
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
