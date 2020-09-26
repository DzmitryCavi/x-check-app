/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Input, Tooltip } from 'antd'
import PropTypes from 'prop-types'

const formatNumber = (value) => {
  const strValue = `${value}`
  const list = strValue.split('.')
  const prefix = list[0].charAt(0) === '-' ? '-' : ''
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ''
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
}

const NumericInput = (props) => {
  const onChange = (e) => {
    const { value } = e.target
    const reg = /^-?\d*(\.\d*)?$/
    if ((Number.isNaN(value) || !reg.test(value)) && value !== '' && value !== '-') return

    if (!props.max) {
      props.onChange(value)
      return
    }

    props.onChange(Number(value) > props.max ? props.max : value)
  }

  // '.' at the end or only '-' in the input box.
  const onBlur = () => {
    const { value } = props
    const strValue = `${value}`
    let valueTemp = strValue
    if (strValue.charAt(strValue.length - 1) === '.' || strValue === '-') {
      valueTemp = strValue.slice(0, -1)
    }
    props.onChange(valueTemp.replace(/0*(\d+)/, '$1'))
    if (props.onBlur) {
      props.onBlur()
    }
  }

  const { value } = props
  const title = value ? (
    <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
  ) : (
    'Input a number'
  )
  return (
    <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
      <Input {...props} onChange={onChange} onBlur={onBlur} />
    </Tooltip>
  )
}

NumericInput.defaultProps = {
  onBlur: null,
  maxLength: null,
  max: null,
  value: '',
  onChange: () => {},
}

NumericInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  maxLength: PropTypes.number,
  max: PropTypes.number,
}

export default NumericInput
