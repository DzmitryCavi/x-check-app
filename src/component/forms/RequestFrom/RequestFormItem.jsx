import React, { useState } from 'react'
import { Input, Row, Col, Radio } from 'antd'
import PropTypes from 'prop-types'
import NumericInput from '../../NumericInput'

const RequestFormItem = ({ value, onChange, maxScore, criteriaId }) => {
  const [number, setNumber] = useState(value ? value.number : null)
  const [description, setDescription] = useState(value ? value.discription : null)
  const [isNeedComment, setIsNeedComment] = useState(!!(value && value.number !== null))

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        number,
        description,
        criteriaId,
        ...value,
        ...changedValue,
      })
    }
  }

  const onNumberChange = (e) => {
    let newNumber
    switch (typeof e) {
      case 'string':
        newNumber = +e
        break
      case 'number':
        newNumber = e
        break
      default:
        newNumber = +e.target.value
    }
    let newDescription = ''
    const isMax = newNumber === +maxScore
    const isMin = newNumber === 0
    if (Number.isNaN(newNumber)) {
      return
    }

    setIsNeedComment(true)

    switch (true) {
      case isMax:
        newDescription = 'Well done!'
        break
      case isMin:
        newDescription = 'No ticket today'
        break
      default:
        newDescription = 'Some things are done, some are not'
    }

    setNumber(newNumber)
    setDescription(newDescription)

    triggerChange({
      number: newNumber,
      description: newDescription,
    })
  }

  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
    triggerChange({
      description: e.target.value,
    })
  }

  const Criteria = (
    <>
      <Row
        style={{
          margin: '10px 0px',
        }}
      >
        <Col flex="175px">
          <Radio.Group
            value={value && typeof value.number === 'number' ? value.number : null}
            onChange={onNumberChange}
          >
            <Radio.Button value={0}>Min</Radio.Button>
            <Radio.Button value={maxScore / 2}>Half</Radio.Button>
            <Radio.Button value={+maxScore}>Max</Radio.Button>
          </Radio.Group>
        </Col>
        <Col flex="auto">
          <NumericInput
            value={number !== null ? String(number) : number}
            onChange={onNumberChange}
            max={+maxScore}
            placeholder={maxScore > 0 && `0 - ${maxScore}`}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Input.TextArea
            value={description}
            onChange={onDescriptionChange}
            disabled={!isNeedComment}
          />
        </Col>
      </Row>
    </>
  )

  const fine = (
    <>
      <Row
        style={{
          marginTop: '10px',
        }}
      >
        <Col flex="107px">
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
        <Col flex="auto">
          <NumericInput
            value={number !== null ? String(number) : number}
            disabled
            onChange={onNumberChange}
            max={+maxScore}
          />
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
  criteriaId: PropTypes.string.isRequired,
}

RequestFormItem.defaultProps = {
  value: { number: null, description: null },
  onChange: () => {},
}

export default RequestFormItem
