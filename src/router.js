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
import TagAdmin from "@/components/admin/TagAdmin";
import ClassifyAdmin from "@/components/admin/ClassifyAdmin";
import BlogsAdmin from "@/components/admin/BlogsAdmin";
import SearchList from "@/components/blogs/SearchList";

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
                name:'search',
                path:"/search/:searchText",
                component: SearchList
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
            },
            {
                name:'TagAdmin',
                path:"/TagAdmin",
                component: TagAdmin
            },
            {
                name:'BlogsAdmin',
                path:"/BlogsAdmin",
                component: BlogsAdmin
            },
            {
                name:'ClassifyAdmin',
                path:"/ClassifyAdmin",
                component: ClassifyAdmin
            }
        ]
    }
]

let router =  new VueRouter({
    mode: 'history',
    routes
})
export default router;