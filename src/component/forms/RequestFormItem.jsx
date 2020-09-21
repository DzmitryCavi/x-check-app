import React, { useState } from 'react'
import { Input, Row, Col, Radio, Collapse } from 'antd'
import PropTypes from 'prop-types'
import { CaretRightOutlined } from '@ant-design/icons'
import NumericInput from '../NumericInput'

const { Panel } = Collapse

const RequestFormItem = ({ value, onChange, maxScore }) => {
  const [number, setNumber] = useState(value.number)
  const [discription, setDiscription] = useState(value.discription)
  const [isNeedComment, setIsNeedComment] = useState(
    value.number === +maxScore && value.number === null,
  )

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
    let newDiscription = ''
    const isMax = newNumber === +maxScore
    const isMin = newNumber === 0
    if (Number.isNaN(newNumber)) {
      return
    }

    setIsNeedComment(!isMax)

    switch (true) {
      case isMax:
        newDiscription = 'Well done!'
        break
      case isMin:
        newDiscription = 'No ticket today'
        break
      default:
        newDiscription = 'Some things are done, some are not'
    }

    setNumber(newNumber)
    setDiscription(newDiscription)

    triggerChange({
      number: newNumber,
      discription: newDiscription,
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
            value={typeof value.number === 'number' ? value.number : null}
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
          <NumericInput value={number} onChange={onNumberChange} max={maxScore} />
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
                value={discription}
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

RequestFormItem.propTypes = {
  value: PropTypes.instanceOf(Object),
  onChange: PropTypes.instanceOf(Function),
  maxScore: PropTypes.string.isRequired,
}

RequestFormItem.defaultProps = {
  value: { nubmer: null, discription: null },
  onChange: () => {},
}

export default RequestFormItem
