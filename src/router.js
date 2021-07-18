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
                component: Home,
                meta: {
                    title: '浩瀚学者'
                }
            },
            {
                name:'search',
                path:"/search/:searchText",
                component: SearchList,
                meta: {
                    title: '浩瀚学者-搜索结果'
                }
            },
            {
                name:'blog',
                path:"/blog/:blogId",
                component: BlogIndex,
                meta: {
                    title: '浩瀚学者-文章'
                }
            },
            {
                name:'edit',
                path:"/edit/:blogId",
                component: EditBlog,
                meta: {
                    title: '浩瀚学者-编辑'
                }
            },
            {
                name:'classify',
                path:"/classify/:classifyId",
                component: Classify,
                meta: {
                    title: '浩瀚学者-分类'
                }
            },
            {
                name:'tag',
                path:"/tag/:tagId",
                component: Tag,
                meta: {
                    title: '浩瀚学者-标签'
                }
            },
            {
                name:'add',
                path:"/add",
                component: EditBlog,
                meta: {
                    title: '浩瀚学者-创作'
                }
            },
            {
                name:'TagAdmin',
                path:"/TagAdmin",
                component: TagAdmin,
                meta: {
                    title: '浩瀚学者-标签管理'
                }
            },
            {
                name:'BlogsAdmin',
                path:"/BlogsAdmin",
                component: BlogsAdmin,
                meta: {
                    title: '浩瀚学者-文章管理'
                }
            },
            {
                name:'ClassifyAdmin',
                path:"/ClassifyAdmin",
                component: ClassifyAdmin,
                meta: {
                    title: '浩瀚学者-分类管理'
                }
            }
        ]
    }
]

let router =  new VueRouter({
    mode: 'history',
    routes
})
export default router;