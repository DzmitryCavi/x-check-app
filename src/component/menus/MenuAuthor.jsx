import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { UserOutlined, LaptopOutlined } from '@ant-design/icons'

import { publicRoutes, authorRoutes } from '../../router/routes'

const MenuAuthor = () => {
  return (
    <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
      <Menu.Item icon={<UserOutlined />} key="1">
        <Link to={publicRoutes.home}>Home</Link>
      </Menu.Item>
      <Menu.Item icon={<LaptopOutlined />} key="2">
        <Link to={authorRoutes.tasks.list}>Tasks</Link>
      </Menu.Item>
    </Menu>
  )
}

export default MenuAuthor
