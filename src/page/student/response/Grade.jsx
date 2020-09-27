import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Form, Spin, List, Progress, Button, Result } from 'antd'
import parse from 'react-html-parser'
import reviewsService from '../../../services/review.service'
import requestsService from '../../../services/requests.service'
import tasksService from '../../../services/tasks.service'
import disputeService from '../../../services/dispute.service'
import GradeItem from './GradeItem'

const { Title, Text } = Typography

const Grade = () => {
  const { requestId } = useParams()
  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState(null)
  const [review, setReview] = useState(null)
  const [categories, setCategories] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isNeedToSubmit, setIsNeedToSubmit] = useState(false)
  const [form] = Form.useForm()

  const score = categories && categories.reduce((ac, catergory) => ac + +catergory.maxScore, 0)

  const onFinish = (data) => {
    const { criterias } = data.dispute
    Object.keys(criterias).map((el) => {
      if (criterias[el] === undefined) delete criterias[el]
      return el
    })
    disputeService.create({ criterias, reviewId: review.id })
    setIsSuccess(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      const requestResponse = await requestsService.getById(requestId)
      const tasksResponse = await tasksService.getById(requestResponse.task)
      const reviewResponse = await reviewsService.getByRequestId(requestResponse.id)
      setReview(reviewResponse[0])
      setRequest(requestResponse)
      setCategories(tasksResponse.categories)
      setLoading(false)
    }
    fetchData()
  }, [requestId])

  return (
    <>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <>
          {isSuccess ? (
            <Result />
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
                  percent={(score / 100) * request.score}
                  strokeColor={{
                    0: 'red',
                    30: '#87d068',
                    100: '#87d068',
                  }}
                />
                Score: {request.score} of {score}
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
                      <Text>{parse(item.text)}</Text>
                      <Form.Item
                        name={['selfGrade', category.title, index]}
                        rules={[{ required: true, message: 'Please grade all' }]}
                      >
                        <GradeItem
                          maxScore={+item.score}
                          review={review.grade[category.title].find(
                            (el) => el.criteria === item.id,
                          )}
                          criteria={item.id}
                        />
                      </Form.Item>
                    </List.Item>
                  )}
                />
              ))}
              <Form.Item>
                {isNeedToSubmit && (
                  <Button type="primary" size="small" htmlType="submit">
                    OPEN DISPUTE
                  </Button>
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
