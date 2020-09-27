import { UnorderedListOutlined, HistoryOutlined } from '@ant-design/icons'
import DisputeService from '../../services/dispute.service'

import RequestsList from '../../page/supervisor/requests/RequestsList'
import RequestReview from '../../page/supervisor/requests/RequestReview'
import ReviewHistory from '../../page/supervisor/review/ReviewHistory'
import Dispute from '../../page/supervisor/review/Dispute'

import { supervisorRoutes as routes } from '.'

export default [
  {
    path: routes.requests.review,
    component: RequestReview,
    breadcrumb: 'Request review',
  },
  {
    path: routes.reviews.dispute,
    component: Dispute,
    breadcrumb: 'Dispute',
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
  {
    path: routes.reviews.list,
    component: ReviewHistory,
    breadcrumb: 'Review History',
    description: 'Processed Requests',
    navigation: {
      label: 'Review History',
      icon: HistoryOutlined,
      withBadge: true,
      badgeCount: () => {
        const data = DisputeService.getCountOfDisputeByReviewAuthor()
        return data
      },
    },
  },
]
