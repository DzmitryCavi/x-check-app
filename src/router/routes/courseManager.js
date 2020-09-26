import { ApartmentOutlined, UnorderedListOutlined } from '@ant-design/icons'

import TasksList from '../../page/courseManager/tasks/TasksList'
import TaskView from '../../page/courseManager/tasks/TaskView'
import MarksList from '../../page/courseManager/marks/MarksList'
import MarkInfo from '../../page/courseManager/marks/MarkInfo'

import { courseManagerRoutes as routes } from '.'

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
    },
  },
  {
    path: routes.marks.info,
    component: MarkInfo,
    breadcrumb: 'Mark Info',
  },
  {
    path: routes.marks.list,
    component: MarksList,
    breadcrumb: 'Marks List',
    description: 'Marks management',
    navigation: {
      label: 'Marks List',
      icon: UnorderedListOutlined,
    },
  },
]
