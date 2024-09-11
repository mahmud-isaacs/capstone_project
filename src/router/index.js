import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'
import { useCookies } from 'vue3-cookies'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/ContactView.vue')
  },
  {
    path: '/items',
    name: 'items',
    component: () => import(/* webpackChunkName: "items" */ '../views/ItemsView.vue')
  },
  {
    path: '/itemDetail/:id',
    name: 'itemDetail',
    component: () => import(/* webpackChunkName: "itemDetail" */ '../views/ItemDetailView.vue')
  },
  {
    path: '/itemAdd',
    name: 'itemAdd',
    component: () => import(/* webpackChunkName: "itemAdd" */ '../views/ItemAddView.vue')
  },
  {
    path: '/itemEdit/:id',
    name: 'itemEdit',
    component: () => import(/* webpackChunkName: "itemEdit" */ '../views/ItemEditView.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import(/* webpackChunkName: "orders" */ '../views/OrdersView.vue')
  },
  {
    path: '/orderDetail/:id',
    name: 'orderDetail',
    component: () => import(/* webpackChunkName: "orderDetail" */ '../views/OrderDetailView.vue')
  },
  {
    path: '/orderAdd',
    name: 'orderAdd',
    component: () => import(/* webpackChunkName: "itemAdd" */ '../views/OrderAddView.vue')
  },
  {
    path: '/orderEdit/:id',
    name: 'orderEdit',
    component: () => import(/* webpackChunkName: "itemEdit" */ '../views/OrderEditView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/UsersView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "users" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
  },
  {
    path: '/userDetail/:id',
    name: 'userDetail',
    component: () => import(/* webpackChunkName: "userDetail" */ '../views/UserDetailView.vue')
  },
  {
    path: '/userAdd',
    name: 'userAdd',
    component: () => import(/* webpackChunkName: "userAdd" */ '../views/UserAddView.vue')
  },
  {
    path: '/userEdit/:id',
    name: 'userEdit',
    component: () => import(/* webpackChunkName: "userEdit" */ '../views/UserEditView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminView.vue'),
    meta: { requiresAdmin: true } 
  },
  {
    path: '/booking',
    name: 'booking',
    component: () => import(/* webpackChunkName: "bookings" */ '../views/BookingView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  const { cookies } = useCookies()
  const token = cookies.get('authToken') 
  const isAuthenticated = !!token 
  const userRole = store.state.user?.userRole 

  if (to.userRole === 'admin') {
    if (!isAuthenticated) {
      next({ name: 'login' }) 
      toast.error('Please login to access this page.', {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_CENTER,
      })
    } else if (userRole !== 'admin') {
      next({ name: 'home' }) 
      toast.error('Access for Admins only.', {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_CENTER,
      })
    } else {
      next() 
    }
  } else {
    next() 
  }
})

export default router
