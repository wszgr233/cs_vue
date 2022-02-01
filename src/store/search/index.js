//searc小仓库
import { reqpostSearchList } from "@/api"
const state = {
    SearSelectorList: {},
}
const actions = {
    async postSearSelector({ commit }, params) {
        let result = await reqpostSearchList(params)
        if (result.code == 200) {
            commit("POSTSEARSELECTOR", result)
        }
    }
}
const mutations = {
    POSTSEARSELECTOR(state, SearSelectorList) {
        state.SearSelectorList = SearSelectorList.data
    }
}
const getters = {

}
export default {
    actions,
    mutations,
    state,
    getters,
}
