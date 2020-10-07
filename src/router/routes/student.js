import { CodeOutlined, CheckSquareOutlined, HistoryOutlined } from '@ant-design/icons'

import RequestCreate from '../../page/student/requests/RequestCreate'
import RequestsHistory from '../../page/student/requests/RequestsHistory'
import RequestEdit from '../../page/student/requests/RequestEdit'
import RequestReview from '../../page/RequestReview'
import RequestService from '../../services/requests.service'
import CrossCheckRequestList from '../../page/student/crossCheck/CrossCheckRequestList'

import { studentRoutes as routes } from '.'
import Grade from '../../page/student/response/Grade'

export default [
  {
    path: routes.crossCheck.review,
    component: RequestReview,
    breadcrumb: 'Request Review',
  },
  {
    path: routes.crossCheck.requestList,
    component: CrossCheckRequestList,
    breadcrumb: 'List',
    navigation: {
      label: 'Cross-check',
      icon: CheckSquareOutlined,
      color: '#ffaf1c',
    },
  },
  {
    path: routes.requests.create,
    component: RequestCreate,
    breadcrumb: 'Create Request',
    description: 'Submit a task for review (+ self-review)',
    navigation: {
      label: 'Sent Requests',
      icon: CodeOutlined,
      color: '#ffc53d',
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
    component: RequestsHistory,
    breadcrumb: 'Requests History',
    description: 'Request history (+ self-checks)',
    navigation: {
      label: 'Requests History',
      icon: HistoryOutlined,
      color: '#9254de',
      withBadge: true,
      badgeCount: () => {
        const user = JSON.parse(localStorage.getItem('user')).login
        const count = RequestService.getByAuthor(user).then((data) => {
          return data.filter((el) => el.state === 'GRADED').length
        })

        return count
      },
    },
  },
]
