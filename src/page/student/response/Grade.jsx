import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Form, Spin, List, Progress } from 'antd'
import parse from 'react-html-parser'

import requestsService from '../../../services/requests.service'
import tasksService from '../../../services/tasks.service'
import GradeItem from './GradeItem'

const { Title, Text } = Typography

const Grade = () => {
  const { requestId } = useParams()
  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState(null)
  const [categories, setCategories] = useState(null)
  const [form] = Form.useForm()

  const score =
    categories &&
    categories.reduce(
      (ac, { criteria }) => ac + criteria.reduce((a, el) => a + (+el.score > 0 ? +el.score : 0), 0),
      0,
    )
  const onFinish = () => {}

  useEffect(() => {
    const fetchData = async () => {
      const requestResponse = await requestsService.getById(requestId)
      const tasksResponse = await tasksService.getById(requestResponse.task)
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
        // <List
        //   header={

        //   }
        //   bordered
        // >
        //   a
        // </List>
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
                  <Text>{parse(`${item.text} (0-${item.score})`)}</Text>
                  <Form.Item
                    name={['selfGrade', category.title, index]}
                    rules={[{ required: true, message: 'Please grade all' }]}
                  >
                    <GradeItem />
                  </Form.Item>
                </List.Item>
              )}
            />
          ))}
        </Form>
      )}
    </>
  )
}

export default Grade
