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
