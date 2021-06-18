import { createRouter, createWebHashHistory } from "vue-router"
import store from '@/store'
import i18n from '@/i18n'
import refreshWindowTitle from "@/utils/title"
import { vueRouters } from "@/utils/router"
import { loadModules } from "@/utils/modules"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/Index.vue'),
      redirect: {
        name: 'dashboard'
      },
      children: [
        ...vueRouters()
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/Login.vue")
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
    return true
  }
  if (!store.state.user.user_id && to.name !== 'login') {
    router.push({ name: 'login' })
  } else {
    loadModules()
      .then(() => {
        if (store.state.navigations.findIndex(n => n.name === to.name) === -1)
          throw new Error(i18n.global.t(''))
        refreshWindowTitle(to.name)
        next()
      })
      .catch(err => {
        if (!from.name)
          router.push({ name: 'dashboard' })
        return false
      })
  }

})

export default router
