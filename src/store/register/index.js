//注册页小仓库
import { reqgetSendCode, reqpostRegister } from "@/api"
const state = {
    sendCode: ""
}
const actions = {
    async getSendCode({ commit }, phone) {
        let result = await reqgetSendCode(phone)
        console.log(result)
        if (result.code == 200) {
            commit("GETSENDCODE", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    async postRegister({ commit }, params) {
        let result = await reqpostRegister(params)
        console.log(result)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }

    }
}
const mutations = {
    GETSENDCODE(state, sendCode) {
        state.sendCode = sendCode
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters,
}