import Vue from 'vue';
import VueRouter from "vue-router";
import VueResource from 'vue-resource';
import routes from './routers';
import store from './vuex/store';
import App from './App.vue';

Vue.config.debug = false; // debug模式

Vue.use(VueRouter);
Vue.use(VueResource);

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    'linkActiveClass': 'active',
    routes
});

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
