import { ApartmentOutlined } from '@ant-design/icons'

import TasksList from '../../page/author/tasks/TasksList'
import TaskCreate from '../../page/author/tasks/TaskCreate'
import TaskEdit from '../../page/author/tasks/TaskEdit'
import TaskView from '../../page/author/tasks/TaskView'
import TaskViewImport from '../../page/author/tasks/TaskViewImport'
import CategoryCreate from '../../page/author/categories/CategoryCreate'
import CategoryEdit from '../../page/author/categories/CategoryEdit'

import { authorRoutes as routes } from '.'

export default [
  {
    path: routes.categories.create,
    component: CategoryCreate,
    breadcrumb: 'Create Category',
  },
  {
    path: routes.categories.edit,
    component: CategoryEdit,
    breadcrumb: 'Edit Category',
  },
  {
    path: routes.tasks.viewImport,
    component: TaskViewImport,
    breadcrumb: 'View Imported Task',
  },
  {
    path: routes.tasks.view,
    component: TaskView,
    breadcrumb: 'View Task',
  },
  {
    path: routes.tasks.create,
    component: TaskCreate,
    breadcrumb: 'Create Task',
  },
  {
    path: routes.tasks.edit,
    component: TaskEdit,
    breadcrumb: 'Edit Task',
  },
  {
    path: routes.tasks.list,
    component: TasksList,
    breadcrumb: 'Tasks',
    description: 'Task management',
    navigation: {
      label: 'Tasks',
      icon: ApartmentOutlined,
      color: '#389e0d',
    },
  },
]
