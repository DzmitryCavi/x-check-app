import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Menu } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { publicRoutes } from '../router/routes'

const Navigation = ({ items }) => {
  const location = useLocation()
  return (
    <Menu mode="inline" defaultSelectedKeys={[location.pathname]} style={{ height: '100%' }}>
      <Menu.Item icon={<HomeOutlined />} key={publicRoutes.home}>
        <Link to={publicRoutes.home}>Home</Link>
      </Menu.Item>
      {items
        .filter((item) => item.isNavigation)
        .map((item) => (
          <Menu.Item icon={<item.icon />} key={item.path}>
            <Link to={item.path}>{item.breadcrumb}</Link>
          </Menu.Item>
        ))}
    </Menu>
  )
}

Navigation.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
}
export default Navigation
