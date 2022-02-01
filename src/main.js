import Vue from 'vue'
import App from './App.vue'
import store from "@/store"
import router from "@/router"
import typeNav from "@/components/typeNav"
import Carousel from "@/components/Carousel"
import "@/mock/mockServe"
import "swiper/css/swiper.css"
import Pagination from "@/components/Pagination"
import * as API from "@/api"
import { MessageBox,Button } from 'element-ui';
import "@/plugins/validate"
import VueLazyload from 'vue-lazyload'
import kly from "@/assets/1.jpeg"
Vue.component(typeNav.name, typeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Button.name, Button);
Vue.component(Pagination.name, Pagination)
Vue.use(VueLazyload,{
  loading:kly
})
Vue.config.productionTip = false


new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
  store,
  router,
  render: h => h(App),
}).$mount('#app')
