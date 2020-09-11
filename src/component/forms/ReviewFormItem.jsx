import React, { useState } from 'react'
import { Form, Select, Button, InputNumber } from 'antd'
import PropTypes from 'prop-types'

const { Option } = Select

const Score = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0)
  const [currency, setCurrency] = useState('rmb')

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        number,
        currency,
        ...value,
        ...changedValue,
      })
    }
  }

  const onNumberChange = (e) => {
    const newNumber = parseInt(e.target.value || 0, 10)

    if (Number.isNaN(number)) {
      return
    }

    if (!('number' in value)) {
      setNumber(newNumber)
    }

    triggerChange({
      number: newNumber,
    })
  }

  const onCurrencyChange = (newCurrency) => {
    if (!('currency' in value)) {
      setCurrency(newCurrency)
    }

    triggerChange({
      currency: newCurrency,
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
      <Select
        value={value.currency || currency}
        style={{
          width: 80,
          margin: '0 8px',
        }}
        onChange={onCurrencyChange}
      >
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
  )
}

const ReviewFormItem = () => {
  const onFinish = (values) => {
    console.log('Received values from form: ', values)
  }

  return (
    <Form
      name="customized_form_controls"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        price: {
          number: 0,
          currency: 'rmb',
        },
      }}
    >
      <Form.Item name="price" label="Price">
        <Score />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

Score.propTypes = {
  value: PropTypes.instanceOf(Object).isRequired,
  onChange: PropTypes.instanceOf(Function).isRequired,
}

export default ReviewFormItem
