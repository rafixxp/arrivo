import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue')
    },
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/schedule',
        name: 'schedule',
        component: () => import('../views/home/schedule.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/home/profile.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/payslip',
        name: 'payslip',
        component: () => import('../views/home/payslip.vue'),
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.getItem('api-token');

    if(to.meta.requiresAuth && !isLogin){
        next({name: 'login'})
    }
    else{
        if((to.name === 'login') && isLogin){
            next({name: 'home'})
        }
        else{
            next();
        }
    }
})
export default router