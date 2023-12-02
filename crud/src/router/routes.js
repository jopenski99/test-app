import {Store} from 'src/store/index'


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter:(to,from,next)=> {
      if(Store.state.user.isLoggedIn){
        next()
      }else{
        next('/')
      }
    },
    children: [
      { path: '', component: () => import('pages/dashboard.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]


export default routes
