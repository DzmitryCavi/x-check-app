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
  },
  {
    path: routes.login,
    component: Login,
    layout: EmptyLayout,
  },
  {
    path: routes.notFound,
    component: NotFound,
  },
]
