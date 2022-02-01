import requests from "@/api/ajax"
import mockRequests from "@/api/mock"
//三级列表数据获取
export const reqgetCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: "GET" });
//假轮播图数据获取
export const reqgetBannerList = () => mockRequests({ url: '/banner', method: "GET" });
export const reqgetFloorList = () => mockRequests({ url: '/floor', method: "GET" });
//搜索页展示信息获取
export const reqpostSearchList = (params) => requests({ url: "/list", method: "post", data: params })
//物品详情页信息
export const reqgetItemList = (skuId) => requests.get(`/item/${skuId}`)
//添加或修改购物车物品数量接口
export const reqpostCartList = (skuId, skuNum) => requests.post(`/cart/addToCart/${skuId}/${skuNum}`)
//获取购物车列表
export const reqgetShopCartList= ()=>requests.get("/cart/cartList")
//更改购物车选中状态
export const reqgetChecked=(skuID,isChecked)=>requests.get(`/cart/checkCart/${skuID}/${isChecked}`)
//删除购物车物品接口
export const deleteShopCartList=(skuId)=>requests.delete(`/cart/deleteCart/${skuId}`)
//获取注册验证码
export const reqgetSendCode=(phone)=>requests.get(`/user/passport/sendCode/${phone}`)
//用户注册接口
export const reqpostRegister=(params)=>requests({url:"/user/passport/register",method:"post",data:params})
//用户登入信息（token）获取
export const reqpostLogin=(params)=>requests({url:"/user/passport/login",method:"post",data:params})
//通过token获取用户信息
export const reqgetToken=()=>requests.get("/user/passport/auth/getUserInfo")
//退出登入信息获取
export const reqgetLogout=()=>requests.get("/user/passport/logout")
//用户地址信息获取
export const reqgetUserAddressList=()=>requests.get("/user/userAddress/auth/findUserAddressList")
//订单信息获取
export const reqgetTradeList=()=>requests.get("/order/auth/trade")
//提交订单信息
export const reqpostTradeList=(tradeNo,params)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:"post",data:params})
//获取订单信息
export const reqgetcreateNative=(orderId)=>requests.get(`/payment/weixin/createNative/${orderId}`)
//获取订单支付状态
export const reqgetQueryPayStatus=(orderId)=>requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
//获取我的订单数据
export const reqgetOrderList=(page,limit)=>requests.get(`/order/auth/${page}/${limit}`)