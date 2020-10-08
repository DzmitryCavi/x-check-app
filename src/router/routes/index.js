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
    viewImport: '/author/tasks/view/import',
  },
  categories: {
    create: '/author/tasks/:taskId/categories/create',
    edit: '/author/tasks/:taskId/categories/:categoryId/edit',
  },
}

export const supervisorRoutes = {
  reviews: { list: '/supervisor/reviews', dispute: '/supervisor/reviews/:reviewId/dispute' },
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
  reviews: {
    list: '/course-manager/reviews',
    info: '/course-manager/reviews/:reviewId/info',
    dispute: '/course-manager/reviews/:reviewId/dispute',
  },
}

export const studentRoutes = {
  crossCheck: {
    review: '/student/cross-check/:requestId/review',
    requestList: '/student/cross-check/',
  },
  requests: {
    list: '/student/requests',
    create: '/student/requests/create',
    edit: '/student/requests/:requestId/edit',
    grade: '/student/requests/:requestId/grade',
  },
}
// ...
