import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入组件
import Index from "@/components/Index";
import Home from "@/components/blogs/Home";
import BlogIndex from "@/components/blog/BlogIndex";
import EditBlog from "@/components/blog/EditBlog";
import Classify from "@/components/blogs/Classify";
import Tag from "@/components/blogs/Tag";

const routes = [
    {
        path:"/",
        component: Index,
        children:[
            {
                name:'/',
                path:"/",
                component: Home
            },
            {
                name:'blog',
                path:"/blog/:blogId",
                component: BlogIndex
            },
            {
                name:'edit',
                path:"/edit/:blogId",
                component: EditBlog
            },
            {
                name:'classify',
                path:"/classify/:classifyId",
                component: Classify
            },
            {
                name:'tag',
                path:"/tag/:tagId",
                component: Tag
            },
            {
                name:'add',
                path:"/add",
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