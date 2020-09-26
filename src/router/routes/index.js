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
    edit: '/author/tasks/:taskId/categories/:categoryId/edit',
  },
}

export const supervisorRoutes = {
  requests: {
    list: '/supervisor/requests',
    review: '/supervisor/requests/:requestId/review',
  },
}

export const courseManagerRoutes = {
  tasks: {
    list: '/course-manager/tasks',
    view: '/course-manager/tasks/:taskId/view',
  },
  marks: {
    list: '/course-manager/marks',
    info: '/course-manager/marks/:marksId/info',
  },
}

export const studentRoutes = {
  requests: {
    list: '/student/requests',
    create: '/student/requests/create',
    edit: '/student/requests/:requestId/edit',
    grade: '/student/requests/:requestId/grade',
  },
}
// ...
