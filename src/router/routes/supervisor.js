import { UnorderedListOutlined } from '@ant-design/icons'

import RequestsList from '../../page/supervisor/requests/RequestsList'
import RequestReview from '../../page/supervisor/requests/RequestReview'

import { supervisorRoutes as routes } from '.'

export default [
  {
    path: routes.requests.review,
    component: RequestReview,
    breadcrumb: 'Request review',
  },
  {
    path: routes.requests.list,
    component: RequestsList,
    breadcrumb: 'Requests list',
    description: 'Requests management',
    navigation: {
      label: 'Requests list',
      icon: UnorderedListOutlined,
    },
  },
]
