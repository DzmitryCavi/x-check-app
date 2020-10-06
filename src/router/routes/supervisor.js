import { UnorderedListOutlined, HistoryOutlined } from '@ant-design/icons'
import DisputeService from '../../services/dispute.service'
import RequestService from '../../services/requests.service'

import RequestsList from '../../page/supervisor/requests/RequestsList'
import RequestReview from '../../page/supervisor/requests/RequestReview'
import ReviewHistory from '../../page/supervisor/review/ReviewHistory'
import Dispute from '../../page/Dispute'

import { supervisorRoutes as routes } from '.'

export default [
  {
    path: routes.requests.review,
    component: RequestReview,
    breadcrumb: 'Request Review',
  },
  {
    path: routes.reviews.dispute,
    component: Dispute,
    breadcrumb: 'Dispute',
  },
  {
    path: routes.requests.list,
    component: RequestsList,
    breadcrumb: 'Requests List',
    description: 'Requests management',
    navigation: {
      label: 'Requests List',
      icon: UnorderedListOutlined,
      color: '#08979c',
      withBadge: true,
      badgeCount: () => {
        const count = RequestService.getAllSubmitted().then((data) => data.length)
        return count
      },
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
      color: '#531dab',
      badgeCount: () => {
        const count = DisputeService.getCountOfDisputeByReviewAuthor()
        return count
      },
    },
  },
]
