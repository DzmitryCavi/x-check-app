import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { UserOutlined, CarryOutOutlined } from '@ant-design/icons'

const MenuCourseManager = () => {
  return (
    <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
      <Menu.Item icon={<UserOutlined />} key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item icon={<CarryOutOutlined />} key="2">
        <Link to="/marks">Marks</Link>
      </Menu.Item>
    </Menu>
  )
}

export default MenuCourseManager
