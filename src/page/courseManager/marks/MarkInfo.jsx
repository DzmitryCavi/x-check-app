import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin, Descriptions, Tag, Form, Typography, List, Progress } from 'antd'
import parse from 'react-html-parser'
import reviewsService from '../../../services/review.service'
import requestsService from '../../../services/requests.service'
import tasksService from '../../../services/tasks.service'
import GradeItem from '../../../component/GradeInfoItem'

const { Title } = Typography

const MarkInfo = () => {
  const { marksId } = useParams()

  const [loading, setLoading] = useState(true)

  const [mark, setMark] = useState([])
  const [request, setRequest] = useState([])
  const [categories, setCategories] = useState([])
  const [form] = Form.useForm()

  const maxScore = categories && categories.reduce((ac, catergory) => ac + +catergory.maxScore, 0)

  useEffect(() => {
    const fetchData = async () => {
      const markResponse = await reviewsService.getById(marksId)
      const requestResponse = await requestsService.getById(markResponse.requestId)
      const tasksResponse = await tasksService.getById(requestResponse.taskId)
      setMark(markResponse)
      setRequest(requestResponse)
      setCategories(tasksResponse.categories)
      setLoading(false)
    }
    fetchData()
  }, [marksId])

  const { name, student, author, state, created_at: createdAt } = mark

  return (
    <>
      {loading ? (
        <div className="content-loading">
          <Spin tip="Loading..." />
        </div>
      ) : (
        <Descriptions title="Mark Info" bordered="true" column={5} size="middle">
          <Descriptions.Item label="Task" span={4}>
            {name}
          </Descriptions.Item>
          <Descriptions.Item label="State">
            <Tag
              color={{ GRADED: 'green', DISPUTED: 'orange', REJECTED: 'red' }[state]}
              key={state}
            >
              {state}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Student">
            {student}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Mentor">
            {author}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Date">
            {createdAt}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Score">
            {mark.score}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Max-Score">
            {maxScore}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Progress">
            <Progress
              percent={Math.floor((mark.score / maxScore) * 100)}
              strokeColor={{
                0: 'red',
                30: '#87d068',
                100: '#87d068',
              }}
            />
          </Descriptions.Item>
          <Descriptions.Item span={5} label="Details">
            <Form form={form} layout="vertical" initialValues={request}>
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
                          isDispute
                          maxScore={+item.score}
                          review={mark.grade[category.title].find(
                            (el) => el.criteriaId === item.id,
                          )}
                          criteria={item.id}
                        />
                      </Form.Item>
                    </List.Item>
                  )}
                />
              ))}
            </Form>
          </Descriptions.Item>
        </Descriptions>
      )}
    </>
  )
}

export default MarkInfo
