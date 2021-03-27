import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入组件
import Index from "@/components/Index";
import Home from "@/components/blogs/Home";

const routes = [
    {
        path:"/",
        component: Index,
        children:[
            {
                path:"/",
                component: Home
            }
        ]
    }
]

let router =  new VueRouter({
    mode: 'history',
    routes
})
export default router;