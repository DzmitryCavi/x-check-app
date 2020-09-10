import Home from '../../page/Home'
import Login from '../../page/Login'
import NotFound from '../../page/NotFound'

export default {
  home: {
    path: '/',
    component: Home,
  },
  login: {
    path: '/login',
    component: Login,
  },
  notFound: {
    path: '*',
    component: NotFound,
  },
}
