import Vue from 'vue'
import Vuex from 'vuex'

import home from "@/store/home"
import search from "@/store/search"
import detail from "@/store/detail"
import shopCatr from "@/store/shopCart"
import register from "@/store/register"
import login from "@/store/login"
import trade from "@/store/trade"

Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
      home,
      search,
      detail,
      shopCatr,
      register,
      login,
      trade
    }
  })
  //导出store
  export default store