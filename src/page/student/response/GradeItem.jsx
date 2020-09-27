import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Row, Col, Progress, Statistic, Collapse, Form, Input } from 'antd'

const { Panel } = Collapse

const TabInner = (score, maxScore, comment) => (
  <Row>
    <Col span={2}>
      <Progress
        type="circle"
        percent={(score / maxScore) * 100}
        status={score < 0 && 'exception'}
        width={50}
      />
    </Col>
    <Col span={2}>
      <Statistic title="Score" value={score} suffix={score > 0 ? `/ ${maxScore}` : null} />
    </Col>
    <Col>
      <Statistic title="Comment" value={comment} style={{ width: '100%' }} />
    </Col>
  </Row>
)

const CustomTextArea = ({ onChange, value, ...other }) => {
  const triggerChange = (e) => {
    const result = e.target.value
      ? {
          comment: e.target.value,
        }
      : undefined
    onChange(result)
  }

  return (
    <Input.TextArea
      {...other}
      value={value && value.comment}
      placeholder="Leave comment here"
      onChange={triggerChange}
    />
  )
}

const GradeItem = ({ value, maxScore, review, criteria }) => {
  const [tabKey, setTabKey] = useState('Grade')
  const [isExpanded, setIsExpanded] = useState(false)
  const tabList = [
    {
      key: 'Grade',
      tab: 'Grade',
    },
    {
      key: 'Self-grade',
      tab: 'Self-grade',
    },
  ]

  const contentListNoTitle = {
    Grade: TabInner(review.number, maxScore, review.discription),
    'Self-grade': TabInner(value.number, maxScore, value.discription),
  }

  return (
    <>
      <Card
        style={{ width: '100%' }}
        size="small"
        tabBarExtraContent={
          <Button
            danger
            type={isExpanded ? 'primary' : 'default'}
            onClick={() => {
              setIsExpanded(!isExpanded)
            }}
          >
            Dispute
          </Button>
        }
        tabList={tabList}
        activeTabKey={tabKey}
        onTabChange={(key) => {
          setTabKey(key)
        }}
      >
        {contentListNoTitle[tabKey]}
      </Card>
      <Collapse ghost activeKey={isExpanded ? '1' : null}>
        <Panel showArrow={false} key="1">
          <Form.Item name={['dispute', 'criterias', criteria]}>
            <CustomTextArea placeholder="Leave comment here" />
          </Form.Item>
        </Panel>
      </Collapse>
    </>
  )
}

CustomTextArea.propTypes = {
  value: PropTypes.instanceOf(Object),
  onChange: PropTypes.instanceOf(Function),
}
CustomTextArea.defaultProps = {
  value: { criteria: null, comment: null },
  onChange: () => {},
}

GradeItem.propTypes = {
  value: PropTypes.instanceOf(Object),
  maxScore: PropTypes.number.isRequired,
  review: PropTypes.instanceOf(Object).isRequired,
  criteria: PropTypes.string.isRequired,
}

GradeItem.defaultProps = {
  value: { number: null, discription: null },
}

export default GradeItem
