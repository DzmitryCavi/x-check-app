import React, { useState } from 'react'
import { Input, Row, Col, Radio, Collapse } from 'antd'
import PropTypes from 'prop-types'
import { CaretRightOutlined } from '@ant-design/icons'
import NumericInput from '../NumericInput'

const { Panel } = Collapse

const ReviewFormItem = ({ value, onChange, maxScore }) => {
  const [number, setNumber] = useState(null)
  const [discription, setDiscription] = useState(null)
  const [isNeedComment, setIsNeedComment] = useState(false)

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        number,
        discription,
        ...value,
        ...changedValue,
      })
    }
  }

  const onNumberChange = (e) => {
    const newNumber = typeof e === 'string' ? +e : e.target.value
    const isMax = newNumber === +maxScore
    const isMin = newNumber === 0
    if (Number.isNaN(newNumber)) {
      return
    }

    setIsNeedComment(!isMax && !isMin)

    setNumber(newNumber)

    triggerChange({
      number: newNumber,
    })
  }

  const onDiscriptionChange = (e) => {
    setDiscription(e.target.value)
    triggerChange({
      discription: e.target.value,
    })
  }

  return (
    <span>
      <Row
        style={{
          margin: '10px 8px',
        }}
      >
        <Col span={6}>
          <Radio.Group
            value={value && typeof value.number === 'number' ? value.number : null}
            onChange={onNumberChange}
          >
            <Radio.Button danger value={0}>
              Min
            </Radio.Button>
            <Radio.Button value={maxScore / 2}>Half</Radio.Button>
            <Radio.Button value={+maxScore}>Max</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={4}>
          <NumericInput
            value={value ? value.number : number}
            onChange={onNumberChange}
            max={maxScore}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Collapse
            bordered={false}
            activeKey={isNeedComment ? 'input' : null}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          >
            <Panel header="Leave comment here" key="input" disabled={!isNeedComment}>
              <Input.TextArea
                value={value ? value.discription : discription}
                style={{
                  margin: '0 8px',
                }}
                onChange={onDiscriptionChange}
              />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </span>
  )
}

ReviewFormItem.propTypes = {
  value: PropTypes.instanceOf(Object),
  onChange: PropTypes.instanceOf(Function),
  maxScore: PropTypes.string.isRequired,
}

ReviewFormItem.defaultProps = {
  value: {},
  onChange: () => {},
}

export default ReviewFormItem
