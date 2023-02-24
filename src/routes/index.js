import Vue from 'vue'
import VueRouter from 'vue-router'
import Personnel from '../views/Personnels/Personnel.vue'
import Secteur from '../views/Secteur/Secteur.vue'
// import Image from '../views/Image.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/personnel',
    name: 'Personnel',
    component: Personnel
  },
  {
    path: '/secteur',
    name: 'Secteur',
    component: Secteur
  },
//   {
//     path: '/image',
//     name: 'Image',
//     component: Image
//   },
{
  path: '/',
  name: 'signup',
  component: () => import('../components/Signup.vue')
},
{
  path: '/login',
  name: 'login',
  component: () => import('../components/Login.vue')
},
{
  path: '/forgot-password',
  name: 'forgot-password',
  component: () => import('../components/ForgotPassword.vue')
},
{
  path: '/home',
  name: 'home',
  component: () => import('../components/Home.vue')
}
]

const router = new VueRouter({
  routes
})

export default router
