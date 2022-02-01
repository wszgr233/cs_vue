import { reqgetShopCartList, reqgetChecked, deleteShopCartList } from "@/api"
const state = {
    ShopCartList: []
}
const actions = {
    async getShopCartList({ commit }) {
        let result = await reqgetShopCartList()
        if (result.code == 200) {
            commit("GETSHOPCARLIST", result.data)
        }
    },
    async changeGetChecked({ commit }, { skuID, isChecked }) {
        let result = await reqgetChecked(skuID, isChecked)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }

    },
    async deleteShopCart({ commit }, skuID) {
        let result = await deleteShopCartList(skuID)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }

    },
    async deleteAllShopCar({ dispatch, getters, }) {
        let promiseAll = []
        let allShopCar = getters.cartInfo.cartInfoList
        allShopCar.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch("deleteShopCart", item.skuId) : ""
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    },
    async changesAllChecked({ dispatch, getters }) {
        let allChecked = getters.cartInfo.cartInfoList
        let ConfirmChecked = allChecked.filter(item => {
            return item.isChecked == 1
        })
        if (ConfirmChecked.length == allChecked.length) {
            allChecked.forEach(item => {
                let promise = dispatch("changeGetChecked", { skuID: item.skuId, isChecked: 0 })
            })
        } else {
            allChecked.forEach(item => {
                let promise = dispatch("changeGetChecked", { skuID: item.skuId, isChecked: 1 })
            })

        }
    }
}
const mutations = {
    GETSHOPCARLIST(state, ShopCartList) {
        state.ShopCartList = ShopCartList
    }
}
const getters = {
    cartInfo(state) {
        return state.ShopCartList[0] || {}
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}