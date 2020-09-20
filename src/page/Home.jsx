import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, Row } from 'antd'
import Can from '../rbac/Can'

import HomeNavigation from '../component/HomeNavigation'

import authorRoutes from '../router/routes/author'
import studentRoutes from '../router/routes/student'
import courseManagerRoutes from '../router/routes/courseManager'
import supervisorRoutes from '../router/routes/supervisor'

const Home = (props) => {
  const { user } = props

  return (
    <div className="home-page">
      <Row gutter={16}>
        <Can
          role={user.role}
          perform="menu:student"
          yes={() => (
            <Col span={8}>
              <HomeNavigation items={studentRoutes} />
            </Col>
          )}
        />
        <Can
          role={user.role}
          perform="menu:author"
          yes={() => (
            <Col span={8}>
              <HomeNavigation items={authorRoutes} />
            </Col>
          )}
        />
        <Can
          role={user.role}
          perform="menu:supervisor"
          yes={() => (
            <Col span={8}>
              <HomeNavigation items={supervisorRoutes} />
            </Col>
          )}
        />
        <Can
          role={user.role}
          perform="menu:course_manager"
          yes={() => (
            <Col span={8}>
              <HomeNavigation items={courseManagerRoutes} />
            </Col>
          )}
        />
      </Row>
    </div>
  )
}

Home.defaultProps = {
  user: null,
}

Home.propTypes = {
  user: PropTypes.instanceOf(Object),
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Home)
