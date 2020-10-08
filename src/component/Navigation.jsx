import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { List } from 'antd'
import { DashOutlined } from '@ant-design/icons'

const Navigation = ({ items }) => {
  const transformItems = items
    .filter((item) => item.navigation)
    .map((item) =>
      !item.navigation.icon
        ? { ...item, navigation: { ...items.navigation, icon: DashOutlined } }
        : item,
    )

  return transformItems.map((item) => (
    <List.Item className="navigation__item" key={item.path}>
      <Link to={item.path} className="navigation__link">
        <item.navigation.icon
          className="navigation__icon"
          style={{ color: item.navigation.color || 'rgba(0, 0, 0, .85)' }}
        />
        {item.navigation.label || item.breadcrumb}
      </Link>
    </List.Item>
  ))
}

Navigation.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
}
export default Navigation
