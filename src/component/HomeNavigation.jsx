import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Card, Col } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import Meta from 'antd/lib/card/Meta'

const HomeNavigation = ({ items }) => {
  return items
    .filter((item) => item.navigation)
    .map((item) =>
      !item.navigation.icon
        ? { ...item, navigation: { ...item.navigation, icon: MenuOutlined } }
        : item,
    )
    .map((item) => (
      <Col span={8} key={item.path}>
        <Link to={item.path}>
          <Card key={item.path}>
            <Meta
              avatar={<item.navigation.icon style={{ color: '#7cb305', fontSize: 32 }} />}
              title={item.navigation.label || item.breadcrumb}
              description={item.description || '—'}
            />
          </Card>
        </Link>
      </Col>
    ))
}

HomeNavigation.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
}
export default HomeNavigation
