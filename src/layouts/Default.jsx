import React from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import withBreadcrumbs from 'react-router-breadcrumbs-hoc'
import {} from 'antd/lib/form/Form'
import { Layout, Menu, Breadcrumb, Button, Avatar, Dropdown, Row, Col, List } from 'antd'
import { LogoutOutlined, ProfileOutlined, PoweroffOutlined, HomeOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Can from '../rbac/Can'

import publicRoutes from '../router/routes/public'
import authorRoutes from '../router/routes/author'
import studentRoutes from '../router/routes/student'
import courseManagerRoutes from '../router/routes/courseManager'
import supervisorRoutes from '../router/routes/supervisor'

import { logout } from '../store/actions'

import Navigation from '../component/Navigation'

const { Header, Content, Footer } = Layout

const DefaultLayout = ({ breadcrumbs, isLoggedIn, user, children, dispatch }) => {
  const exit = () => {
    dispatch(logout())
  }

  const ProfileMenu = (
    <Menu>
      <Menu.Item key="1" icon={<ProfileOutlined />}>
        <a href="https://app.rs.school/profile" target="_blank" rel="noopener noreferrer">
          Profile
        </a>
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
        <div className="app-header__logo">
          <Link to="/">X Check App</Link> <small>v1.0.0-beta.0</small>
        </div>
        <div className="app-header__controls">
          <>
            <Dropdown overlay={ProfileMenu} trigger="click">
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
            <Button
              className="app-header__logout"
              style={{ marginLeft: 10 }}
              type="danger"
              size="large"
              icon={<PoweroffOutlined />}
              onClick={exit}
            />
          </>
        </div>
      </Header>

      <div className="default-layout__container">
        <Breadcrumb className="default-layout__breadcrumbs">
          {breadcrumbs.map(({ match, breadcrumb }) => (
            <Breadcrumb.Item key={match.url}>
              <Link to={match.url}>{breadcrumb}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <Layout className="default-layout__layout">
          <Row gutter={30}>
            <Col xs={24} lg={6}>
              <List className="default-layout__navigation navigation" bordered size="small">
                <List.Item className="navigation__item" key="/">
                  <Link to="/" className="navigation__link">
                    <HomeOutlined
                      className="navigation__icon"
                      style={{ color: 'rgb(24, 144, 255)' }}
                    />
                    Home
                  </Link>
                </List.Item>
                {user.role === 'superadmin' ? (
                  <List.Item className="navigation__item navigation__item--role">Author</List.Item>
                ) : null}
                <Can
                  role={user.role}
                  perform="menu:author"
                  yes={() => <Navigation items={authorRoutes} />}
                />
                {user.role === 'superadmin' ? (
                  <List.Item className="navigation__item navigation__item--role">Student</List.Item>
                ) : null}
                <Can
                  role={user.role}
                  perform="menu:student"
                  yes={() => <Navigation items={studentRoutes} />}
                />
                {user.role === 'superadmin' ? (
                  <List.Item className="navigation__item navigation__item--role">
                    Supervisor
                  </List.Item>
                ) : null}
                <Can
                  role={user.role}
                  perform="menu:supervisor"
                  yes={() => <Navigation items={supervisorRoutes} />}
                />
                {user.role === 'superadmin' ? (
                  <List.Item className="navigation__item navigation__item--role">
                    Course Manager
                  </List.Item>
                ) : null}
                <Can
                  role={user.role}
                  perform="menu:course_manager"
                  yes={() => <Navigation items={courseManagerRoutes} />}
                />
              </List>
            </Col>
            <Col xs={24} lg={18}>
              <Content className="default-layout__content">{children}</Content>
            </Col>
          </Row>
        </Layout>
      </div>
      <Footer style={{ textAlign: 'center' }}>
        ©{new Date().getFullYear()} Created by{' '}
        <a href="https://discord.gg/MVuXZQj" target="_blank" rel="noopener noreferrer">
          Dream Team
        </a>
      </Footer>
    </Layout>
  )
}

DefaultLayout.defaultProps = {
  user: null,
}

DefaultLayout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.oneOfType([PropTypes.object]),
  children: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
  breadcrumbs: PropTypes.instanceOf(Object).isRequired,
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
  }
}

export default compose(
  withBreadcrumbs(
    [
      // order matters
      ...authorRoutes,
      ...studentRoutes,
      ...courseManagerRoutes,
      ...supervisorRoutes,
      // ...spread other routes
      ...publicRoutes,
    ],
    { disableDefaults: true },
  ),
  connect(mapStateToProps, null),
)(DefaultLayout)
