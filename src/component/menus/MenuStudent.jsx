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
      <Menu.Item icon={<UserOutlined />} key="2">
        <Link to="/student/requests">Requests</Link>
      </Menu.Item>
      <Menu.Item icon={<LaptopOutlined />} key="3">
        <Link to="/student/requests/create">Sent request</Link>
      </Menu.Item>
    </Menu>
  )
}

export default MenuStudent
