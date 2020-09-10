export const authorRoutes = {
  tasks: {
    list: '/author/tasks',
    create: '/author/tasks/create',
    edit: '/author/tasks/:taskId/edit',
    view: '/author/tasks/:taskId/view',
  },
  categories: {
    create: '/author/tasks/:taskId/categories/create',
    edit: '/author/categories/:categoryId/view',
  },
}

export const studentRoutes = {}

// ...
