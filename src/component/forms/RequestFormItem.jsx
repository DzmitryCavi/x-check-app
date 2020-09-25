import React, { useState } from 'react'
import { Input, Row, Col, Radio, Collapse } from 'antd'
import PropTypes from 'prop-types'
import { CaretRightOutlined } from '@ant-design/icons'
import NumericInput from '../NumericInput'

const { Panel } = Collapse

const RequestFormItem = ({ value, onChange, maxScore }) => {
  const [number, setNumber] = useState(value ? value.number : null)
  const [discription, setDiscription] = useState(value ? value.discription : null)
  const [isNeedComment, setIsNeedComment] = useState(
    !!(value && value.number !== +maxScore && value.number !== null),
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
    const newNumber = typeof e === 'string' ? +e : +e.target.value
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

  const Criteria = (
    <>
      <Row
        style={{
          margin: '10px 0px',
        }}
      >
        <Col span={3}>
          <Radio.Group
            value={value && typeof value.number === 'number' ? value.number : null}
            onChange={onNumberChange}
          >
            <Radio.Button value={0}>Min</Radio.Button>
            <Radio.Button value={maxScore / 2}>Half</Radio.Button>
            <Radio.Button value={+maxScore}>Max</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={2}>
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
    </>
  )

  const fine = (
    <>
      <Row
        style={{
          margin: '10px 8px',
        }}
      >
        <Col span={2}>
          <Radio.Group
            value={value && typeof value.number === 'number' ? value.number : null}
            onChange={onNumberChange}
          >
            <Radio.Button value={0}>No</Radio.Button>
            <Radio.Button value={maxScore} style={{ color: 'red' }}>
              Yes
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={2}>
          <NumericInput value={number} disabled onChange={onNumberChange} max={maxScore} />
        </Col>
      </Row>
    </>
  )

  return maxScore > 0 ? Criteria : fine
}

RequestFormItem.propTypes = {
  value: PropTypes.instanceOf(Object),
  onChange: PropTypes.instanceOf(Function),
  maxScore: PropTypes.string.isRequired,
}

RequestFormItem.defaultProps = {
  value: { number: null, discription: null },
  onChange: () => {},
}

export default RequestFormItem
