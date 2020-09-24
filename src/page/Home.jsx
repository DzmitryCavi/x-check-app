import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'antd'
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
          yes={() => <HomeNavigation items={studentRoutes} />}
        />
        <Can
          role={user.role}
          perform="menu:author"
          yes={() => <HomeNavigation items={authorRoutes} />}
        />
        <Can
          role={user.role}
          perform="menu:supervisor"
          yes={() => <HomeNavigation items={supervisorRoutes} />}
        />
        <Can
          role={user.role}
          perform="menu:course_manager"
          yes={() => <HomeNavigation items={courseManagerRoutes} />}
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
