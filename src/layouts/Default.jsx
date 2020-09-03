import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { UserOutlined, LaptopOutlined, LogoutOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { logout } from '../store/actions'

const { Header, Content, Sider } = Layout

const DefaultLayout = ({ children, dispatch }) => {
  return (
    <Layout className="default-layout">
      <Header className="default-layout__header">
        <h1 className="default-layout__logo">X Check App</h1>
      </Header>
      <Layout>
        <Sider width={320} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<UserOutlined />} key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<LaptopOutlined />} key="2">
              <Link to="/private">Private</Link>
            </Menu.Item>
            <Menu.Item
              icon={<LogoutOutlined />}
              key="3"
              onClick={() => {
                dispatch(logout())
              }}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content className="default-layout__content">{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(DefaultLayout)
