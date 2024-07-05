import { createRouter, createWebHashHistory } from 'vue-router';

import { AuthStore } from "@/store";

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

const routes = [
    {
        path: "/",
        redirect: "/1366x768"
    },
    {
        path: "/chart1",
        component: () => import("../pages/chart/1.vue")
    },
    {
        path: "/chart2",
        component: () => import("../pages/chart/2.vue")
    },

    {
        path: "/test",
        component: () => import("../pages/test.vue"),
        meta: { title: "test" }
    },
    {
        path: "/1366x768",
        component: () => import("../pages/1366x768.vue"),
        meta: { title: "系统总览" }
    },
    {
        path: "/k4",
        component: () => import("../pages/k4.vue"),
        meta: { title: "系统总览" }
    },
    {
        path: "/home",
        component: () => import("../pages/home.vue"),
        meta: { title: "后台首页" }
    },
    {
        path: "/newhome",
        component: () => import("../pages/newHome/NewHome.vue"),
        meta: { title: "新首页" }
    },
    {
        path: "/opens",
        component: () => import("../pages/opens.vue"),
        meta: { title: "开关" }
    },
    {
        path: "/watch",
        component: () => import("../pages/1366x768watch.vue"),
        meta: { title: "运行监控" },
        children: [
            {
                path: "",
                redirect: "/watch/bms"
            },
            {
                path: "bms",
                component: () => import("../pages/watch/bms.vue"),
                meta: { title: "锂电池BMS" },
            },
            {
                path: "acdc",
                component: () => import("../pages/watch/acdc.vue"),
                meta: { title: "储能双向变流器" },
            },
            {
                path: "rlc",
                component: () => import("../pages/watch/rlc.vue"),
                meta: { title: "RLC可编程模拟负载" },
            },
            {
                path: "ac",
                component: () => import("../pages/watch/ac.vue"),
                meta: { title: "直驱模拟风机变流器" },
            },
            {
                path: "elec",
                component: () => import("../pages/watch/elec.vue"),
                meta: { title: "微电网接入中央测控柜" },
            }
        ]
    },
    {
        path: "/:id(.*)*",
        component: () => import("../pages/404.vue"),
        meta: { title: "404页面" },
    }
]



//创建路由对象
const router = createRouter({
    history: createWebHashHistory(),
    routes
})



router.afterEach(() => {
    NProgress.done();
});



router.beforeEach((to, from, next) => {
    NProgress.start();
    let title = [];

    for (let item of to.matched) {
        if (!item.meta.title) {
            break;
        }
        title.unshift(item.meta.title);
    }

    if (title.length > 0) {
        document.title = title.join(" - ");
    }

    let checkLogin = to.matched.some(record => record.meta.auth);//是否需要验证登录
    //这里使用matched循环查找不直接使用to.meta的原因：多层嵌套路由情况下,逐级检查
    // console.debug(to.matched);
    // console.debug(checkLogin);
    //如果需要检查登录或者角色
    if (checkLogin || to.meta.roles) {
        const store = userStore();
        if (!store.isLogin) {//如果没有登录,则跳转到登录
            next({ path: "/login" });
            return;
        }
        //如果要验证角色,但当前登录用户不具备该角色则跳转到404
        if (to.meta.roles && !to.meta.roles.includes(store.user.roleId)) {
            next({ path: "/404" });
            return;
        }
        next();
    } else {
        next();
    }
})
//导出路由对象，以供其它组件使用
export default router





