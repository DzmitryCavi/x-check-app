import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Form, Spin, List, Progress, Button } from 'antd'
import parse from 'react-html-parser'
import reviewsService from '../../../services/review.service'
import requestsService from '../../../services/requests.service'
import tasksService from '../../../services/tasks.service'
import GradeItem from './GradeItem'

const { Title, Text } = Typography

const Grade = () => {
  const { requestId } = useParams()
  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState(null)
  const [review, setReview] = useState(null)
  const [categories, setCategories] = useState(null)
  const [form] = Form.useForm()

  //  Старая версия для категорий без посчитанного score
  const score =
    categories &&
    categories.reduce(
      (ac, { criteria }) => ac + criteria.reduce((a, el) => a + (+el.score > 0 ? +el.score : 0), 0),
      0,
    )

  //  новая версия
  //  const score = categories && categories.reduce((ac, catergory) => ac + +catergory.score, 0)

  const onFinish = (data) => {
    console.log(data)
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
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={request}>
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
                      review={review.grade[category.title].find((el) => el.criteria === item.id)}
                      criteria={item.id}
                    />
                  </Form.Item>
                </List.Item>
              )}
            />
          ))}
          <Form.Item>
            <Button type="primary" size="small" htmlType="submit">
              OPEN DISPUTE
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  )
}

export default Grade
