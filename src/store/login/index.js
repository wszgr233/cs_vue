import { reqpostLogin, reqgetToken, reqgetLogout } from "@/api"
const state = {
    userToken: localStorage.getItem("USERID"),
    userInfo: {},
    userName: "",
}
const actions = {
    async postLogin({ commit }, params) {
        let result = await reqpostLogin(params)
        if (result.code == 200) {
            commit("POSTLOGIN", result.data.token)
            localStorage.setItem("USERID",result.data.token )
            return "ok"
        } else {
            return Promise.reject(new Error("登入失败"))
        }
    },
    async getToken({ commit }) {
        let result = await reqgetToken()
        if (result.code == 200) {
            commit("GETTOKEN", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("登入失败"))
        }
    },
    async getLogout({ commit }) {
        let result = await reqgetLogout()
        if (result.code == 200) {
            commit("GETLOGOUT")
            return "ok"
        } else {
            return Promise.reject(new Error("登入失败"))
        }
    }
}
const mutations = {
    POSTLOGIN(state, userToken) {
        state.userToken=userToken
    },
    GETTOKEN(state, userInfo) {
        state.userInfo = userInfo
        state.userName = userInfo.name
    },
    GETLOGOUT(state,) {
        state.userInfo = {}
        state.userToken = ''
        localStorage.removeItem("USERID")
    }

}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters,
}