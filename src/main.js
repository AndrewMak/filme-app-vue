import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import Axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'
import AOS from 'aos'
import 'aos/dist/aos.css'
Vue.prototype.$http = Axios;

Vue.config.productionTip = false;
Vue.use(infiniteScroll)

new Vue({
  created() {
    AOS.init()
  },
  render: h => h(App),
  router
}).$mount("#app");