import { UnorderedListOutlined } from '@ant-design/icons'

import RequestCreate from '../../page/student/requests/RequestCreate'
import RequestsList from '../../page/student/requests/RequestsList'
import RequestEdit from '../../page/student/requests/RequestEdit'

import { studentRoutes as routes } from '.'

export default [
  {
    path: routes.requests.create,
    component: RequestCreate,
    breadcrumb: 'Create Request',
    isNavigation: true,
  },
  {
    path: routes.requests.edit,
    component: RequestEdit,
    breadcrumb: 'Edit Request',
  },
  {
    path: routes.requests.list,
    component: RequestsList,
    breadcrumb: 'Requests List',
    description: 'Requests management',
    navigation: {
      label: 'Requests List',
      icon: UnorderedListOutlined,
    },
  },
]
