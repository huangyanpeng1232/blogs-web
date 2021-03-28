import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入组件
import Index from "@/components/Index";
import Home from "@/components/blogs/Home";
import BlogIndex from "@/components/blog/BlogIndex";
import EditBlog from "@/components/blog/EditBlog";

const routes = [
    {
        path:"/",
        component: Index,
        children:[
            {
                path:"/",
                component: Home
            },
            {
                path:"/blog/:blogId",
                component: BlogIndex
            },
            {
                path:"/edit/:blogId",
                component: EditBlog
            },
            {
                path:"/edit",
                component: EditBlog
            }
        ]
    }
]

let router =  new VueRouter({
    mode: 'history',
    routes
})
export default router;