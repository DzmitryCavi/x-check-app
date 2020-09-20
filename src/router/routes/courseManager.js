import { UnorderedListOutlined } from '@ant-design/icons'

import MarksList from '../../page/courseManager/marks/MarksList'
import MarkInfo from '../../page/courseManager/marks/MarkInfo'

import { courseManagerRoutes as routes } from '.'

export default [
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
