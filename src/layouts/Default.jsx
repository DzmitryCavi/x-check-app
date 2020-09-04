import React from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Button, Avatar, Dropdown } from 'antd'
import { UserOutlined, LaptopOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { logout } from '../store/actions'

const { Header, Content, Sider, Footer } = Layout

const DefaultLayout = ({ isLoggedIn, user, children, dispatch }) => {
  const exit = () => {
    dispatch(logout())
  }

  const ProfileMenu = (
    <Menu>
      <Menu.Item key="1" icon={<ProfileOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={exit}>
        Logout
      </Menu.Item>
    </Menu>
  )

  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }

  return (
    <Layout className="default-layout">
      <Header className="app-header">
        <div className="app-header__logo">X Check App</div>
        <div className="app-header__controls">
          <Dropdown overlay={ProfileMenu}>
            <Button
              type="dashed"
              size="large"
              icon={
                <Avatar
                  style={{
                    width: 24,
                    height: 24,
                    lineHeight: '24px',
                    fontSize: 18,
                    marginTop: -4,
                    marginRight: 10,
                  }}
                  size="small"
                  src={user.avatar_url}
                />
              }
            >
              My Profile
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb className="default-layout__breadcrumbs">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', backgroundColor: '#fff' }}>
          <Sider width={320}>
            <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
              <Menu.Item icon={<UserOutlined />} key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item icon={<LaptopOutlined />} key="2">
                <Link to="/private">Private</Link>
              </Menu.Item>
              <Menu.Item icon={<LogoutOutlined />} key="3" onClick={exit}>
                Logout
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className="default-layout__content">{children}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}

DefaultLayout.defaultProps = {
  user: null,
}

DefaultLayout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(Object),
  children: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, null)(DefaultLayout)
