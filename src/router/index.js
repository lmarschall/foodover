import Vue from 'vue'
import Router from 'vue-router'

// Page content
import Home from '../components/Home'
import Profile from '../components/Profile'

// Fallback page
// import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

const router = new Router ({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})

export default router