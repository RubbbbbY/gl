import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import {routers,otherRouter} from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
import util from './views/util/util.js'

Vue.use(util);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);
Vue.prototype.$http = axios;

// http response 拦截器
// 请求的拦截器
axios.interceptors.request.use(function (config) {
     // 判断请求的类型
     // 如果是post请求就把默认参数拼到data里面
     // 如果是get请求就拼到params里面
    if(config.method === 'post') {
    } 
    return config;
  }, function (error) {
  })
// 路由配置
const RouterConfig = {
  	mode: '',
    routes: routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
	

    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


const store = new Vuex.Store({
    state: {
        allUsre:0,
        subtitle:'应用概览',
        currentPageName:sessionStorage.getItem("active"),
        subObj:{}
    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});