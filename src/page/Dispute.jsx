import React, { useState } from 'react'
import { useAsync } from 'react-use'
import { useParams } from 'react-router-dom'
import {
  Typography,
  Form,
  Spin,
  List,
  Button,
  Result,
  Row,
  Col,
  Radio,
  Descriptions,
  Tag,
} from 'antd'

import parse from 'react-html-parser'
import PropTypes from 'prop-types'
import reviewsService from '../services/review.service'
import requestsService from '../services/requests.service'
import tasksService from '../services/tasks.service'
import { supervisorRoutes } from '../router/routes'
import disputeService from '../services/dispute.service'
import GradeItem from '../component/GradeInfoItem'
import ButtonLink from '../component/ButtonLink'
import NumericInput from '../component/NumericInput'
import Feedback from '../component/Feedback'

const { Title, Link, Text } = Typography

const FormItemForRespond = ({ item }) => {
  const [disabled, setDisabled] = useState(true)
  return (
    <Row>
      <Col flex="160px">
        <Form.Item
          name={['dispute', item.id, 'state']}
          rules={[{ required: true, message: 'Please answer all' }]}
          onChange={(e) => {
            setDisabled(e.target.value !== 'ACCEPT')
          }}
        >
          <Radio.Group style={{ marginTop: 16 }}>
            <Radio.Button value="ACCEPT" style={{ color: '#52c41a' }}>
              ACCEPT
            </Radio.Button>
            <Radio.Button value="REJECT" style={{ color: '#ff4d4f' }}>
              REJECT
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col flex="auto">
        {+item.score > 0 ? (
          <Form.Item
            name={['dispute', item.id, 'number']}
            rules={[{ required: !disabled, message: 'Please answer all' }]}
          >
            <NumericInput
              max={+item.score}
              disabled={disabled}
              placeholder="New score"
              style={{ marginTop: 16 }}
            />
          </Form.Item>
        ) : (
          <Tag
            color={disabled ? 'error' : 'success'}
            style={{ marginTop: 21, marginLeft: 10, width: 100 }}
          >
            IS {!disabled && 'NOT'} MISTAKE
          </Tag>
        )}
      </Col>
    </Row>
  )
}

const Dispute = () => {
  const { reviewId } = useParams()
  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState(null)
  const [review, setReview] = useState(null)
  const [dispute, setDispute] = useState(null)
  const [categories, setCategories] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [form] = Form.useForm()

  const filterCategoriesByDisput = (categoriesToFilter, { criterias }) => {
    const categoryReducer = (ac, criteria) => {
      return Object.keys(criterias).find((el) => el === criteria.id) ? ac.concat([criteria]) : ac
    }
    const categoriesReducer = (ac, category) => {
      const data = category.criteria.reduce(categoryReducer, [])
      return data.length ? ac.concat([{ ...category, criteria: data }]) : ac
    }
    return categoriesToFilter.reduce(categoriesReducer, [])
  }
  useAsync(async () => {
    const reviewResponse = await reviewsService.getById(reviewId)
    const requestResponse = await requestsService.getById(reviewResponse.requestId)
    const tasksResponse = await tasksService.getById(requestResponse.taskId)
    const disputeResponse = await disputeService.getByReviewId(reviewId)
    setDispute(...disputeResponse)
    setReview(reviewResponse)
    setRequest(requestResponse)
    setCategories(filterCategoriesByDisput(tasksResponse.categories, ...disputeResponse))
    setLoading(false)
  }, [reviewId])

  const onFinish = ({ dispute: fromData }) => {
    const { grade } = review
    const newGrade = {}
    let scoreDifference = 0

    Object.keys(grade).forEach((category) => {
      newGrade[category] = grade[category].map((criteria) => {
        const isDisputedCriteria = Object.keys(fromData).find((el) => el === criteria.criteriaId)
        const isAccepted = isDisputedCriteria && fromData[criteria.criteriaId].state === 'ACCEPT'
        const isPenalty = criteria.number < 0
        if (isDisputedCriteria) {
          switch (true) {
            case isAccepted && !isPenalty:
              scoreDifference += +fromData[criteria.criteriaId].number
              break
            case isAccepted && isPenalty:
              scoreDifference += Math.abs(criteria.number)
              break
            default:
              scoreDifference += 0
          }

          return isPenalty
            ? {
                ...criteria,
                number: isAccepted ? 0 : criteria.number,
              }
            : { ...criteria, number: +fromData[criteria.criteriaId].number || criteria.number }
        }
        return criteria
      })
    })

    const newScore = review.score + scoreDifference

    reviewsService.edit({ state: 'ACCEPTED', grade: newGrade, score: newScore }, review.id)
    disputeService.close(dispute.id)

    setIsSuccess(true)
  }

  return (
    <div className="dispute-page">
      {loading ? (
        <div className="content-loading">
          <Spin tip="Loading..." />
        </div>
      ) : (
        <>
          <Title level={2} className="page-title">
            {`Dispute of the task "${request.name}"`}
          </Title>
          {isSuccess ? (
            <Result
              status="success"
              title="Successfully Opened Dispute !"
              extra={[
                <ButtonLink type="primary" linkTo={supervisorRoutes.reviews.list} key="link">
                  Go to review list
                </ButtonLink>,
              ]}
            />
          ) : (
            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={request}>
              <Title level={3} className="page-subtitle page-subtitle--border mb-3">
                Solution URL:&nbsp;
                <Link href={request.url} target="_blank">
                  {request.url}
                </Link>
              </Title>

              <hr className="delimeter" />

              <Title level={3} className="page-subtitle page-subtitle--border mb-3">
                Disputed criteria:
              </Title>

              {categories.map((category, index) => (
                <List
                  itemLayout="vertical"
                  key={category.id}
                  size="large"
                  dataSource={category.criteria}
                  renderItem={(item, crIdx) => (
                    <List.Item key={item.id}>
                      <div className="d-flex mb-1">
                        <span>{`${crIdx + 1}.`}&nbsp;</span>
                        {parse(`${item.text}`)}
                      </div>
                      <Form.Item name={['selfGrade', category.title, index]}>
                        <GradeItem
                          isDispute
                          maxScore={+item.score}
                          review={review.grade[category.title].find(
                            (el) => el.criteriaId === item.id,
                          )}
                          criteria={item.id}
                        />
                      </Form.Item>
                      <Descriptions size="small" bordered>
                        <Descriptions.Item span={3} label="Comment">
                          <Text type="danger">{dispute.criterias[item.id].comment}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Responde">
                          <FormItemForRespond item={item} />
                        </Descriptions.Item>
                      </Descriptions>
                    </List.Item>
                  )}
                />
              ))}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Close Dispute
                </Button>
              </Form.Item>
            </Form>
          )}
          <Feedback feedback={request.feedback} requestId={request.id} />
        </>
      )}
    </div>
  )
}

FormItemForRespond.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
}

export default Dispute
