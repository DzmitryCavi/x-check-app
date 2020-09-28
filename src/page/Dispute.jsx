import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Form, Spin, List, Button, Result, Card } from 'antd'
import parse from 'react-html-parser'
import reviewsService from '../services/review.service'
import requestsService from '../services/requests.service'
import tasksService from '../services/tasks.service'
import { supervisorRoutes } from '../router/routes'
import disputeService from '../services/dispute.service'
import GradeItem from '../component/GradeInfoItem'
import ButtonLink from '../component/ButtonLink'

const { Title, Link, Text } = Typography

const Dispute = () => {
  const { reviewId } = useParams()
  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState(null)
  const [review, setReview] = useState(null)
  const [dispute, setDispute] = useState(null)
  const [categories, setCategories] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [form] = Form.useForm()

  const onFinish = () => {
    disputeService.close(dispute.id)
    reviewsService.edit({ state: 'ACCEPTED' }, review.id)
    setIsSuccess(true)
  }

  const filterCategoriesByDisput = (categoriesToFilter, { criterias }) => {
    const categoryReduser = (ac, criteria) => {
      return Object.keys(criterias).find((el) => el === criteria.id) ? ac.concat([criteria]) : ac
    }
    const categoriesReduser = (ac, category) => {
      const data = category.criteria.reduce(categoryReduser, [])
      return data.length ? ac.concat([{ ...category, criteria: data }]) : ac
    }
    return categoriesToFilter.reduce(categoriesReduser, [])
  }

  useEffect(() => {
    const fetchData = async () => {
      const reviewResponse = await reviewsService.getById(reviewId)
      const requestResponse = await requestsService.getById(reviewResponse.requestId)
      const tasksResponse = await tasksService.getById(requestResponse.taskId)
      const disputeResponse = await disputeService.getByReviewId(reviewId)
      setDispute(...disputeResponse)
      setReview(reviewResponse)
      setRequest(requestResponse)
      setCategories(filterCategoriesByDisput(tasksResponse.categories, ...disputeResponse))
      setLoading(false)
    }
    fetchData()
  }, [reviewId])

  return (
    <>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <>
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
              <Title level={1} className="task-categories__title">
                {`Dispute of the task "${request.name}"`}
              </Title>
              <Title level={3}>Solution url:</Title>
              <Link href={request.url}>{request.url}</Link>
              <Title level={4}>Disputed tasks</Title>
              {categories.map((category) => (
                <List
                  itemLayout="vertical"
                  key={category.id}
                  size="large"
                  dataSource={category.criteria}
                  renderItem={(item, index) => (
                    <List.Item key={`criteria-${index + 1}`}>
                      <Title level={5}>{parse(item.text)}</Title>
                      <Card>
                        <Text type="danger">{dispute.criterias[item.id].comment}</Text>
                      </Card>
                      <Form.Item
                        name={['selfGrade', category.title, index]}
                        rules={[{ required: true, message: 'Please grade all' }]}
                      >
                        <GradeItem
                          isDispute
                          maxScore={+item.score}
                          review={review.grade[category.title].find(
                            (el) => el.criteriaId === item.id,
                          )}
                          criteria={item.id}
                        />
                      </Form.Item>
                    </List.Item>
                  )}
                />
              ))}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  ClOSE DISPUT
                </Button>
              </Form.Item>
            </Form>
          )}
        </>
      )}
    </>
  )
}

export default Dispute
