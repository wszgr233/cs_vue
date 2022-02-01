import axios from "axios"
import nprogress from "nprogress"
import "nprogress/nprogress.css";
let requests = axios.create({
    baseURL:"/api",
    Timeout:5000,
})
requests.interceptors.request.use((config)=>{
    //显示后台读取进度条
    nprogress.start()
    //获取用户登入或游客token
    let  uuid_token = localStorage.getItem("UUID")
    let  user_token = localStorage.getItem("USERID")
    
    if (user_token) {
        config.headers.token=user_token
    }else if (uuid_token) {
        config.headers.userTempId=uuid_token
    }
    return config
})
requests.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data
},(err)=>{
    alert("服务器响应数据失败");
})
export default requests