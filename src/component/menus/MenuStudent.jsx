import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { UserOutlined, LaptopOutlined } from '@ant-design/icons'

const MenuStudent = () => {
  return (
    <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
      <Menu.Item icon={<UserOutlined />} key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item icon={<LaptopOutlined />} key="2">
        <Link to="/private">Student</Link>
      </Menu.Item>
    </Menu>
  )
}

export default MenuStudent
