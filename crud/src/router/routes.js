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
      if(Store.state.user.isLoggedIn || localStorage.getItem('user')){
        next()
      }else{
        next('/')
      }
    },
    children: [
      { path: '', component: () => import('pages/dashboard.vue') }
    ]
  },
  {
    path: '/inventory',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter:(to,from,next)=> {
      if(Store.state.user.isLoggedIn || localStorage.getItem('user')){
        next()
      }else{
        next('/')
      }
    },
    children: [
      { path: '', component: () => import('pages/products.vue') }
    ]
  },
  {
    path: '/task',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter:(to,from,next)=> {
      if(Store.state.user.isLoggedIn || localStorage.getItem('user')){
        next()
      }else{
        next('/')
      }
    },
    children: [
      { path: '', component: () => import('pages/tasks.vue') }
    ]
  },
  {
    name:'category',
    path: '/category/:category',
    component: () => import('pages/category.vue'),
    beforeEnter:(to,from,next)=> {
      //console.log("check => "+Store.state.user.isLoggedIn+  " " +localStorage.getItem('user').token )
      if(Store.state.user.isLoggedIn || localStorage.getItem('user')){
        next()
      }else{
        next('/')
      }
    },
   
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]


export default routes
