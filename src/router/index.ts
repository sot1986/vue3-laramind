import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue'),
      meta: {
        middleware: ['guest']
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        middleware: ['guest']
      },
      beforeEnter: (to, from) => {

      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      meta: {
        middleware: ['auth']
      },
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/users',
      component: () => import('@/views/users/UsersList.vue')
    },
    {
      path: '/users/:name',
      component: () => import('@/views/users/UserView.vue'),
      props: true
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (to.meta && typeof to.meta === 'object' && 'middleware' in to.meta ) {
    const { middleware } = to.meta as { middleware: string []}
    const authStore = useAuthStore()
    if (middleware.includes('auth')) {
      

      if (!authStore.user) {
        try {
          await authStore.fetchUser()
        } catch (error) {
          console.error('You are not authenticated')
          return '/login'
        }
      }   
    } else if (middleware.includes('guest')) {
      if (authStore.user) {
        return false
      }
    }

  }
    
})

export default router
