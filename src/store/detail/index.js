//详情页小仓库
import { reqgetItemList, reqpostCartList } from "@/api"
import {getuuid} from "@/utils/uuid_token"
const state = {
    goodItemList: {},
    uuid_token:getuuid()
}
const actions = {
    async getItemList({ commit }, skuId) {
        let result = await reqgetItemList(skuId)
        if (result.code == 200) {
            commit("GETITEMLIST", result.data)
        }
    },
    async addToCart({commit},{skuId,skuName}){
        let result= await reqpostCartList(skuId,skuName)
        if (result.code==200) {
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    }
}
const mutations = {
    GETITEMLIST(state, goodItemList) {
        state.goodItemList = goodItemList
    }

}
const getters = {
    categoryView(state) {
        return state.goodItemList.categoryView || {}
    },
    skuInfo(state) {
        return state.goodItemList.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodItemList.spuSaleAttrList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}