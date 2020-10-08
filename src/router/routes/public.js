import { HomeOutlined } from '@ant-design/icons'

import Home from '../../page/Home'
import Login from '../../page/Login'
import NotFound from '../../page/NotFound'

import EmptyLayout from '../../layouts/Empty'

import { publicRoutes as routes } from '.'

export default [
  {
    path: routes.home,
    component: Home,
    breadcrumb: 'Home',
    exact: true,
    navigation: {
      label: 'Home',
      icon: HomeOutlined,
      color: 'rgb(24, 144, 255)',
    },
  },
  {
    path: routes.login,
    component: Login,
    layout: EmptyLayout,
    exact: true,
  },
  {
    path: routes.notFound,
    component: NotFound,
    exact: true,
  },
]
