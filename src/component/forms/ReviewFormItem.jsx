import React, { useState } from 'react'
import { InputNumber, Input, Slider, Row, Col } from 'antd'
import PropTypes from 'prop-types'

const ReviewFormItem = ({ value, onChange, maxScore }) => {
  const [number, setNumber] = useState(0)
  const [discription, setDiscription] = useState('')
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

  const onNumberChange = (score) => {
    const newNumber = score
    if (Number.isNaN(score)) {
      return
    }

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
        <Col span={10}>
          <Slider
            min={0}
            max={40}
            marks={{ 0: 'min', 20: 'half', 40: 'max' }}
            onChange={onNumberChange}
            style={{
              margin: '0 20px',
            }}
            value={typeof value.number === 'number' ? value.number : 0}
          />
        </Col>
        <Col span={4}>
          {maxScore}
          <InputNumber
            value={value.number || number}
            onChange={onNumberChange}
            style={{
              width: 100,
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Input.TextArea
            value={value.discription || discription}
            style={{
              margin: '0 8px',
            }}
            onChange={onDiscriptionChange}
          />
        </Col>
      </Row>
    </span>
  )
}

ReviewFormItem.propTypes = {
  value: PropTypes.instanceOf(Object),
  onChange: PropTypes.instanceOf(Function),
  maxScore: PropTypes.number.isRequired,
}

ReviewFormItem.defaultProps = {
  value: {},
  onChange: () => {},
}

export default ReviewFormItem
