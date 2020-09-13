import React from 'react'
import { Form, InputNumber, Slider } from 'antd'

const TaskReview = () => {
  const [form] = Form.useForm()
  return (
    <>
      <Form
        layout="horizontal"
        form={form}
        initialValues={{
          Score: 3,
        }}
      >
        <Form.Item label="InputNumber">
          <Form.Item name="input-number" noStyle>
            <InputNumber min={1} max={10} />
          </Form.Item>
          <span className="ant-form-text"> machines</span>
        </Form.Item>
        <Form.Item name="slider" label="Slider">
          <Slider
            marks={{
              0: 'MIN',
              50: 'HALF',
              100: 'MAX',
            }}
          />
        </Form.Item>
      </Form>
    </>
  )
}

export default TaskReview
