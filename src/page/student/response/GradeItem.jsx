import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Row, Col, Progress, Statistic } from 'antd'

const TabInner = (score, maxScore, comment) => (
  <Row>
    <Col span={2}>
      <Progress type="circle" percent={(score / maxScore) * 100} width={50} />
    </Col>
    <Col span={2}>
      <Statistic title="Score" value={score} suffix={`/ ${maxScore}`} />
    </Col>
    <Col>
      <Statistic title="Comment" value={comment} style={{ width: '100%' }} />
    </Col>
  </Row>
)

const GradeItem = ({ value, maxScore, review }) => {
  const [tabKey, setTabKey] = useState('Grade')
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
        tabBarExtraContent={<Button danger>Dispute</Button>}
        tabList={tabList}
        activeTabKey={tabKey}
        onTabChange={(key) => {
          setTabKey(key)
        }}
      >
        {contentListNoTitle[tabKey]}
      </Card>
    </>
  )
}

GradeItem.propTypes = {
  value: PropTypes.instanceOf(Object),
  maxScore: PropTypes.number.isRequired,
  review: PropTypes.instanceOf(Object).isRequired,
}

GradeItem.defaultProps = {
  value: { number: null, discription: null },
}

export default GradeItem
