import type { Router } from 'vue-router'

import NProgress from 'nprogress'
import { createPermissionGuard } from './permission'
import { createLayoutGuard } from './layout'

export function setupRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
  })

  createPermissionGuard(router)
  createLayoutGuard(router)
}
