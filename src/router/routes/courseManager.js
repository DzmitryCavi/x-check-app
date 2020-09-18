import MarksList from '../../page/courseManager/marks/MarksList'
import MarkInfo from '../../page/courseManager/marks/MarkInfo'

import { courseManagerRoutes as routes } from '.'

export default [
  {
    path: routes.marks.list,
    component: MarksList,
    breadcrumb: 'Marks List',
    isNavigation: true,
  },
  {
    path: routes.marks.info,
    component: MarkInfo,
    breadcrumb: 'Mark Info',
  },
]
