import { reqgetUserAddressList, reqgetTradeList, reqpostTradeList } from "@/api";
const state = {
    UserAddressList: [],
    TradeList: {},
}
const actions = {
    async getUserAddList({ commit }) {
        let result = await reqgetUserAddressList()
        console.log(result)
        if (result.code == 200) {
            commit("GETUSERADDLIST", result.data)
            return "ok"
        } else {
            Promise.reject(new Error("数据请求失败"))
        }
    },
    async getTradeList({ commit }) {
        let result = await reqgetTradeList()
        console.log(result)
        if (result.code == 200) {
            commit("GETTRADELIST", result.data)
            return "ok"
        } else {
            Promise.reject(new Error("数据请求失败"))
        }
    },
}
const mutations = {
    GETUSERADDLIST(state, UserAddressList) {
        state.UserAddressList = UserAddressList
    },
    GETTRADELIST(state, TradeList) {
        state.TradeList = TradeList
    },
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters,
}