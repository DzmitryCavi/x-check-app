import MarksList from '../../page/courseManager/marks/MarksList'

import { courseManagerRoutes as routes } from '.'

export default [
  {
    path: routes.marks.list,
    component: MarksList,
    breadcrumb: 'Marks List',
  },
]
