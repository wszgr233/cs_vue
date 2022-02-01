import Vue from "vue"
import VueRouter from "vue-router"
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
import myOrders from "@/pages/Center/myOrders"
import groupOrders from "@/pages/Center/groupOrders"
import store from "@/store"



Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: "home",
        component: ()=>import("@/pages/Home"),
        meta: {
            showFoot: true
        }
    },
    {
        path: "/search/:keyword?",
        name: "search",
        component: ()=>import("@/pages/Search"),
        meta: {
            showFoot: true
        }
    },
    {
        name: "login",
        path: "/login",
        component: ()=>import("@/pages/Login"),
        meta: {
            showFoot: false

        }
    },
    {
        name: "register",
        path: "/register",
        component: ()=>import("@/pages/Register"),
        meta: {
            showFoot: false

        }

    }, {
        name: "detail",
        path: "/detail/:suikId?",
        component: ()=>import("@/pages/Detail"),

    },
    {
        name: "addcartsuccess",
        path: "/addcartsuccess",
        component: ()=>import("@/pages/AddCartSuccess"),
    },
    {
        name: "shopcart",
        path: "/shopcart",
        component: ()=>import("@/pages/ShopCart"),
    },
    {
        name: "trade",
        path: "/trade",
        component: ()=>import("@/pages/Trade"),
        beforeEnter: (to, from, next) => {
            if (from.path == "/shopcart") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        name: "pay",
        path: "/pay",
        component: ()=>import("@/pages/Pay"),
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade" &&JSON.stringify(to.query) != "{}") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        name: "paySuccess",
        path: "/paySuccess",
        component: ()=>import("@/pages/PaySuccess"),
        beforeEnter: (to, from, next) => {
            if (from.path=="/pay") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        name: "center",
        path: "/center",
        component: ()=>import("@/pages/Center"),
        children: [
            {
                name: "myOrders",
                path: "myOrders",
                component:()=>import("@/pages/Center/myOrders"),
            },
            {
                name: "groupOrders",
                path: "groupOrders",
                component: ()=>import("@/pages/Center/groupOrders"),
            },
            {
                path: "/center",
                redirect: "/center/myOrders"
            }
        ]
    },

]


const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { y: 0, }
        }
    },

})
router.beforeEach(async (to, from, next) => {
    let token = localStorage.getItem("USERID")
    let name = store.state.login.userInfo.name
    if (token) {
        if (to.path == "/login" || to.path == "/register") {
            next("/")
        }
        else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch("getToken")
                    next()
                } catch (error) {
                    try {
                        await store.dispatch("getLogout")
                        next("/login")
                    } catch (error) {
                    }

                }
            }
        }
    } else {
        let toPath = to.path
        if (toPath.indexOf("trade") != -1 || toPath.indexOf("pay") != -1 || toPath.indexOf("center") != -1) {
            next("/login?redr=" + toPath)
        }
        next()

    }
})
export default router