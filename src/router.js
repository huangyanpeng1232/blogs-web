import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入组件
import Index from "./components/Index";


const routes = [
    {
        path:"/",
        component: Index
    }
]

let router =  new VueRouter({
    mode: 'history',
    routes
})
export default router;