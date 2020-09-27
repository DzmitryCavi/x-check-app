import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Card, Col, Badge } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import Meta from 'antd/lib/card/Meta'

const CustomCard = ({ ...item }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (item.navigation.withBadge) {
      item.navigation.badgeCount().then(setCount)
    }
  }, [item.navigation])

  return (
    <Col span={8} key={item.path}>
      <Badge count={count} className="badge_display_block">
        <Link to={item.path}>
          <Card>
            <Meta
              avatar={<item.navigation.icon style={{ color: '#7cb305', fontSize: 32 }} />}
              title={item.navigation.label || item.breadcrumb}
              description={item.description || '—'}
            />
          </Card>
        </Link>
      </Badge>
    </Col>
  )
}

const HomeNavigation = ({ items }) => {
  return items
    .filter((item) => item.navigation)
    .map((item) =>
      !item.navigation.icon
        ? { ...item, navigation: { ...item.navigation, icon: MenuOutlined } }
        : item,
    )
    .map((item) => <CustomCard key={item.path} {...item} />)
}

HomeNavigation.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
}
export default HomeNavigation
