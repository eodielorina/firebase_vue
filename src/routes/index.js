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

]

const router = new VueRouter({
  routes
})

export default router
