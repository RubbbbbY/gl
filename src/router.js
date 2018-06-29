import Main from './views/Main.vue';
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['./views/login.vue'], resolve); }
};
// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: '/home', title: 'home', name: 'home_index', component: resolve => { require(['./views/analysis/home/home.vue'], resolve); } },
        { path: '/accessVolume', title: 'accessVolume', name: 'accessVolume', component: resolve => { require(['./views/analysis/accessVolume/accessVolume.vue'], resolve); } },
        { path: '/useAnalysis', title: 'useAnalysis', name: 'useAnalysis', component: resolve => { require(['./views/analysis/userAnalysis/userAnalysis.vue'], resolve); } },
        { path: '/userList', title: 'userList', name: 'user_List', component: resolve => { require(['./views/gioc/user/userList.vue'], resolve); } },
        { path: '/advert', title: 'advert', name: 'advert', component: resolve => { require(['./views/gioc/user/advert.vue'], resolve); } }
    ]
};
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter
];