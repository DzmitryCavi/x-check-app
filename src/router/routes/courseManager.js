import { ApartmentOutlined, UnorderedListOutlined } from '@ant-design/icons'

import TasksList from '../../page/courseManager/tasks/TasksList'
import TaskView from '../../page/courseManager/tasks/TaskView'
import MarksList from '../../page/courseManager/marks/MarksList'
import MarkInfo from '../../page/courseManager/marks/MarkInfo'

import { courseManagerRoutes as routes } from '.'
import Dispute from '../../page/Dispute'

export default [
  {
    path: routes.tasks.view,
    component: TaskView,
    breadcrumb: 'View Task',
  },
  {
    path: routes.tasks.list,
    component: TasksList,
    breadcrumb: 'Tasks List',
    description: 'Tasks management',
    navigation: {
      label: 'Tasks List',
      icon: ApartmentOutlined,
      color: '#52c41a',
    },
  },
  {
    path: routes.reviews.info,
    component: MarkInfo,
    breadcrumb: 'Mark Info',
  },
  {
    path: routes.reviews.dispute,
    component: Dispute,
    breadcrumb: 'Dispute',
    description: 'Dispute managment',
  },
  {
    path: routes.reviews.list,
    component: MarksList,
    breadcrumb: 'Marks List',
    description: 'Marks management',
    navigation: {
      label: 'Marks List',
      icon: UnorderedListOutlined,
      color: '#ffaf1c',
    },
  },
]
