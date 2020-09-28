import React, { useState } from 'react'
import { useAsync } from 'react-use'
import { useParams } from 'react-router-dom'
import { Typography, Form, Spin, List, Progress, Button, Result } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import parse from 'react-html-parser'
import reviewsService from '../../../services/review.service'
import requestsService from '../../../services/requests.service'
import tasksService from '../../../services/tasks.service'
import { studentRoutes } from '../../../router/routes'
import disputeService from '../../../services/dispute.service'
import GradeItem from '../../../component/GradeInfoItem'
import ButtonLink from '../../../component/ButtonLink'

const { Title } = Typography

const Grade = () => {
  const { requestId } = useParams()
  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState(null)
  const [review, setReview] = useState(null)
  const [categories, setCategories] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isNeedToSubmit, setIsNeedToSubmit] = useState(false)
  const [isAcceptedReview, setisAcceptedReview] = useState(false)
  const [form] = Form.useForm()

  const maxScore = categories && categories.reduce((ac, catergory) => ac + +catergory.maxScore, 0)

  useAsync(async () => {
    const requestResponse = await requestsService.getById(requestId)
    const tasksResponse = await tasksService.getById(requestResponse.taskId)
    const reviewResponse = await reviewsService.getByRequestId(requestResponse.id)
    setReview(...reviewResponse)
    setRequest(requestResponse)
    setCategories(tasksResponse.categories)
    if (reviewResponse[0].status === 'ACCEPTED') setisAcceptedReview(true)
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
  }

  return (
    <>
      {loading ? (
        <Spin className="content-loading " size="large" />
      ) : (
        <>
          {isSuccess ? (
            <Result
              status="success"
              title="Successfully Opened Dispute !"
              extra={[
                <ButtonLink type="primary" linkTo={studentRoutes.requests.list} key="link_to_list">
                  Go to request list
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
              <Title level={1} className="task-categories__title">
                {`Evaluation of the task "${request.name}"`}
                <Progress
                  percent={Math.floor((review.score / maxScore) * 100)}
                  strokeColor={{
                    0: 'red',
                    30: '#87d068',
                    100: '#87d068',
                  }}
                />
                Score: {review.score} of {maxScore}
              </Title>
              {categories.map((category) => (
                <List
                  itemLayout="vertical"
                  header={<Title level={4}>{category.title}</Title>}
                  key={category.id}
                  size="large"
                  dataSource={category.criteria}
                  renderItem={(item, index) => (
                    <List.Item key={`criteria-${index + 1}`}>
                      <Title level={5}>{parse(item.text)}</Title>
                      <Form.Item
                        name={['selfGrade', category.title, index]}
                        rules={[{ required: true, message: 'Please grade all' }]}
                      >
                        <GradeItem
                          maxScore={+item.score}
                          review={review.grade[category.title].find(
                            (el) => el.criteriaId === item.id,
                          )}
                          criteria={item.id}
                          isDispute={!isAcceptedReview}
                        />
                      </Form.Item>
                    </List.Item>
                  )}
                />
              ))}
              <Form.Item>
                {isAcceptedReview && (
                  <>
                    {isNeedToSubmit ? (
                      <Button
                        icon={<CloseOutlined />}
                        shape="round"
                        type="primary"
                        size="large"
                        htmlType="submit"
                        danger
                      >
                        OPEN DISPUTE
                      </Button>
                    ) : (
                      <Button
                        icon={<CheckOutlined />}
                        shape="round"
                        type="primary"
                        size="large"
                        onClick={acceptGrade}
                      >
                        ACCEPT
                      </Button>
                    )}
                  </>
                )}
              </Form.Item>
            </Form>
          )}
        </>
      )}
    </>
  )
}

export default Grade
