import React, { useState } from 'react'
import { InputNumber, Input, Slider } from 'antd'
import PropTypes from 'prop-types'

const ReviewFormItem = ({ value, onChange }) => {
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
      <InputNumber
        value={value.number || number}
        onChange={onNumberChange}
        style={{
          width: 100,
        }}
      />
      <Slider
        min={0}
        max={40}
        marks={{ 0: 'min', 20: 'half', 40: 'max' }}
        onChange={onNumberChange}
        value={typeof value.number === 'number' ? value.number : 0}
      />
      <Input.TextArea
        value={value.discription || discription}
        style={{
          width: 80,
          margin: '0 8px',
        }}
        onChange={onDiscriptionChange}
      />
    </span>
  )
}

ReviewFormItem.propTypes = {
  value: PropTypes.instanceOf(Object),
  onChange: PropTypes.instanceOf(Function),
}

ReviewFormItem.defaultProps = {
  value: {},
  onChange: () => {},
}

export default ReviewFormItem
