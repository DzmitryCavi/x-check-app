export const publicRoutes = {
  home: '/',
  login: '/login',
  notFound: '*',
}

export const authorRoutes = {
  tasks: {
    list: '/author/tasks',
    create: '/author/tasks/create',
    edit: '/author/tasks/:taskId/edit',
    view: '/author/tasks/:taskId/view',
  },
  categories: {
    create: '/author/tasks/:taskId/categories/create',
    edit: '/author/categories/:categoryId/edit',
  },
}

export const studentRoutes = {}

export const supervisorRoutes = {
  requests: {
    list: '/supervisor/requests',
    review: '/supervisor/requests/:requestId/review',
  },
}

// ...
