import Home from '_v/Home.vue'
export default [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    component: () => import('_v/About.vue')
  }
]
