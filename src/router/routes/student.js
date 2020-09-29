import { UnorderedListOutlined, CodeOutlined } from '@ant-design/icons'

import RequestCreate from '../../page/student/requests/RequestCreate'
import RequestsList from '../../page/student/requests/RequestsList'
import RequestEdit from '../../page/student/requests/RequestEdit'

import { studentRoutes as routes } from '.'
import Grade from '../../page/student/response/Grade'

export default [
  {
    path: routes.requests.create,
    component: RequestCreate,
    breadcrumb: 'Create Request',
    navigation: {
      label: 'Sent Requests',
      icon: CodeOutlined,
      color: '#52c41a',
    },
  },
  {
    path: routes.requests.edit,
    component: RequestEdit,
    breadcrumb: 'Edit Request',
  },
  {
    path: routes.requests.grade,
    component: Grade,
    breadcrumb: 'Grade',
  },
  {
    path: routes.requests.list,
    component: RequestsList,
    breadcrumb: 'Requests List',
    description: 'Requests management',
    navigation: {
      label: 'Requests List',
      icon: UnorderedListOutlined,
      color: '#850bff',
    },
  },
]
