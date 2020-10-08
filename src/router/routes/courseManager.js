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
    breadcrumb: 'Tasks management',
    description: 'Tasks management',
    navigation: {
      label: 'Tasks Management',
      icon: ApartmentOutlined,
      color: '#73d13d',
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
    description: 'Dispute management',
  },
  {
    path: routes.reviews.list,
    component: MarksList,
    breadcrumb: 'Grade List',
    description: 'Grade management',
    navigation: {
      label: 'Grade List',
      icon: UnorderedListOutlined,
      color: '#36cfc9',
    },
  },
]
