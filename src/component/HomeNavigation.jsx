import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Card } from 'antd'
import { EyeOutlined, MenuOutlined } from '@ant-design/icons'
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
      <Card
        key={item.path}
        actions={[
          <Link to={item.path}>
            <EyeOutlined style={{ color: '#096dd9' }} />
            &nbsp; <b>View</b>
          </Link>,
        ]}
      >
        <Meta
          avatar={<item.navigation.icon style={{ color: '#7cb305', fontSize: 32 }} />}
          title={item.navigation.label || item.breadcrumb}
          description={item.description}
        />
      </Card>
    ))
}

HomeNavigation.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
}
export default HomeNavigation
