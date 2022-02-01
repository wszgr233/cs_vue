//home小仓库
import { reqgetCategoryList, reqgetBannerList, reqgetFloorList } from "../../api"
const state = {
    categoryList: [],
    bannerList: [],
    floorList:[]
}
const actions = {
    async getCategoryList({ commit }) {
        let result = await reqgetCategoryList();
        if (result.code == 200) {
            commit("GETCATEGORYLIST", result.data)
        }
    },
    async reqgetBanner({ commit }) {
        let result = await reqgetBannerList()
        if (result.code == 200) {
            commit("REQGETBANNER", result.data)
        }
    },
    async reqgetFloor({commit}){
        let result = await reqgetFloorList()
        if(result.code ==200){
            commit("REQGETFLOOR",result.data)
        }
    }
}
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    REQGETBANNER(state, bannerList) {
        state.bannerList = bannerList
    },
    REQGETFLOOR(state,floorList){
        state.floorList=floorList
    }
}
const getters = {}
export default {
    actions,
    mutations,
    state,
    getters,
}
