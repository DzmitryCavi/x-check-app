const rules = {
  student: {
    static: ['menu:student'],
  },
  author: {
    static: ['menu:author', 'tasks:list', 'tasks:create', 'tasks:edit', 'tasks:remove'],
    dynamic: {},
  },
  supervisor: {
    static: ['menu:supervisor'],
  },
  course_manager: {
    static: ['menu:course_manager'],
  },
  superadmin: {
    static: ['menu:author', 'menu:student', 'menu:supervisor', 'menu:course_manager'],
  },
}

export default rules
