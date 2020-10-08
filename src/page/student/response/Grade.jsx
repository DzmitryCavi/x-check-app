import React, { useState } from 'react'
import { useAsync } from 'react-use'
import { useParams } from 'react-router-dom'
import {
  Typography,
  Form,
  Spin,
  List,
  Progress,
  Button,
  Result,
  Card,
  Statistic,
  Row,
  Col,
} from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import parse from 'react-html-parser'
import reviewsService from '../../../services/review.service'
import requestsService from '../../../services/requests.service'
import tasksService from '../../../services/tasks.service'
import { studentRoutes } from '../../../router/routes'
import disputeService from '../../../services/dispute.service'
import Feedback from '../../../component/Feedback'
import GradeItem from '../../../component/GradeInfoItem'
import ButtonLink from '../../../component/ButtonLink'

import './style.scss'

const { Title } = Typography

const Grade = () => {
  const { requestId } = useParams()
  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState(null)
  const [review, setReview] = useState(null)
  const [categories, setCategories] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isNeedToSubmit, setIsNeedToSubmit] = useState(false)
  const [isAcceptedReview, setIsAcceptedReview] = useState(false)
  const [form] = Form.useForm()

  const maxScore =
    categories &&
    categories.reduce((ac, category) => {
      const positiveValue = category.maxScore > 0 ? category.maxScore : 0
      return ac + positiveValue
    }, 0)

  useAsync(async () => {
    const requestResponse = await requestsService.getById(requestId)
    const tasksResponse = await tasksService.getById(requestResponse.taskId)
    const reviewResponse = await reviewsService.getByRequestId(requestResponse.id)
    setReview(...reviewResponse)
    setRequest(requestResponse)
    setCategories(tasksResponse.categories)
    if (reviewResponse[0].state === 'ACCEPTED') setIsAcceptedReview(true)
    setLoading(false)
  }, [requestId])

  const onFinish = (data) => {
    const { criterias } = data.dispute
    Object.keys(criterias).map((el) => {
      if (criterias[el] === undefined) delete criterias[el]
      return el
    })
    disputeService.create({ criterias, reviewId: review.id })
    reviewsService.edit({ state: 'DISPUTE' }, review.id)
    setIsSuccess(true)
  }

  const acceptGrade = () => {
    reviewsService.edit({ state: 'ACCEPTED' }, review.id)
    setIsSuccess(true)
  }

  if (loading) {
    return (
      <div className="content-loading">
        <Spin tip="Loading..." />
      </div>
    )
  }

  return (
    <div className="view-grade-page">
      <Title level={1} className="page-title">
        {`Evaluation of the task "${request.name}"`}
      </Title>
      {isSuccess ? (
        <Result
          status="success"
          title="Successfully Opened Dispute!"
          extra={[
            <ButtonLink type="primary" linkTo={studentRoutes.requests.list} key="link_to_list">
              Go to request history
            </ButtonLink>,
          ]}
        />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={request}
          onFieldsChange={() => {
            const { criterias } = form.getFieldValue().dispute
            setIsNeedToSubmit(
              Object.keys(criterias).filter((el) => criterias[el] !== undefined).length !== 0,
            )
          }}
        >
          <Progress
            percent={Math.floor((review.score / maxScore) * 100)}
            strokeColor={{
              0: 'red',
              30: '#87d068',
              100: '#87d068',
            }}
          />
          <Title level={3}>
            Score: {review.score} of {maxScore}
          </Title>
          {categories.map((category, catIdx) => (
            <List
              itemLayout="vertical"
              header={<Title level={4}>{`${catIdx + 1}. ${category.title}`}</Title>}
              key={category.id}
              dataSource={category.criteria}
              renderItem={(item, crIdx) =>
                review.grade[category.title] ? (
                  <List.Item key={`criteria-${crIdx + 1}`} className="ml-2">
                    <div className="d-flex">
                      <span>{`${catIdx + 1}.${crIdx + 1}.`}&nbsp;</span>
                      {parse(`${item.text}`)}
                    </div>
                    <Form.Item
                      name={['selfGrade', category.title, crIdx]}
                      rules={[{ required: true, message: 'Please grade all' }]}
                    >
                      <GradeItem
                        maxScore={+item.score}
                        review={review.grade[category.title].find(
                          (el) => el.criteriaId === item.id,
                        )}
                        criteria={item.id}
                        isDispute={isAcceptedReview}
                      />
                    </Form.Item>
                  </List.Item>
                ) : null
              }
            />
          ))}
          {review.extra && (
            <List.Item key="extra" className="ml-2 mb-2">
              <Card title="Extra" style={{ width: '100%' }} size="small">
                <Row>
                  <Col span={2}>
                    <Statistic title="Score" value={review.extra.score} />
                  </Col>
                  <Col>
                    <Statistic
                      title="Comment"
                      value={review.extra.comment}
                      style={{ width: '100%' }}
                    />
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
          <Form.Item>
            {!isAcceptedReview && (
              <>
                {isNeedToSubmit ? (
                  <Button type="primary" htmlType="submit" danger>
                    Open Dispute
                  </Button>
                ) : (
                  <Button icon={<CheckCircleOutlined />} type="primary" onClick={acceptGrade}>
                    Accept
                  </Button>
                )}
              </>
            )}
          </Form.Item>
        </Form>
      )}
      <Feedback feedback={request.feedback} requestId={requestId} />
    </div>
  )
}

export default Grade
