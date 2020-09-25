import React from 'react'
import PropTypes from 'prop-types'

const GradeItem = ({ value }) => {
  return <>{value.number}</>
}

GradeItem.propTypes = {
  value: PropTypes.instanceOf(Object),
}

GradeItem.defaultProps = {
  value: { number: null, discription: null },
}

export default GradeItem
