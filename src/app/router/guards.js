export function setupRouterGuards(router) {
  router.beforeEach((to) => {
    document.title = to.meta.title ? `${to.meta.title} | Investory` : 'Investory'
  })
}
