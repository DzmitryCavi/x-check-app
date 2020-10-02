import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { List } from 'antd'
import { DashOutlined } from '@ant-design/icons'
import publicRoutes from '../router/routes/public'

const Navigation = ({ items }) => {
  const transformItems = [...publicRoutes, ...items]
    .filter((item) => item.navigation)
    .map((item) =>
      !item.navigation.icon
        ? { ...item, navigation: { ...items.navigation, icon: DashOutlined } }
        : item,
    )

  return (
    <List
      className="default-layout__navigation navigation"
      bordered
      size="small"
      dataSource={transformItems}
      renderItem={(item) => (
        <List.Item className="navigation__item">
          <Link to={item.path} className="navigation__link">
            <item.navigation.icon
              className="navigation__icon"
              style={{ color: item.navigation.color || 'rgba(0, 0, 0, .85)' }}
            />
            {item.navigation.label || item.breadcrumb}
          </Link>
        </List.Item>
      )}
    />
  )
}

Navigation.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
}
export default Navigation
