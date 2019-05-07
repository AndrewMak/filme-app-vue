import Vue from "vue";
import VueRouter from "vue-router";

//components
import LatestMovie from "@/components/LatestMovie";
import Movie from "@/components/Movie";
import SearchMovie from "@/components/SearchMovie";
import Login from '@/components/Login';
import Register from '@/components/Register';
import Admin from '@/components/Admin';

Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    {
      path: "*",      
      meta: { 
          requiresAuth: true,
        }
      
    },
    {
      path: "/",
      name: "LatestMovie",
      component: LatestMovie,
      meta: { 
          requiresAuth: true,
        }
      
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { 
          guest: true
      }
  },
  {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { 
          guest: true
      }
  },
    {
      path: "/movie/:id",
      name: "Movie",
      props: true,
      component: Movie,
      meta: { 
          requiresAuth: true,
        }
    },
    {
      path: "/search/:name",
      name: "SearchMovie",
      props: true,
      component: SearchMovie,
      meta: { 
          requiresAuth: true,
        }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { 
          requiresAuth: true,
      }
  },
  ],
  mode: "history"
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.is_admin == 1){
                  next()
              }
              else{
                  next({ name: 'LatestMovie'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
          next({ name: 'LatestMovie'})
      }
  }else {
      next() 
  }
})

export default router