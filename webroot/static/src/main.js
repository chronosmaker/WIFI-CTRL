import Vue from 'vue';
import VueRouter from "vue-router";
import VueResource from 'vue-resource';
import App from './App.vue';

Vue.config.debug = false; // 开启debug模式

Vue.use(VueRouter);
Vue.use(VueResource);

// 定义组件
// const First = {
//     template: '<div><h2>children page 1</h2></div>'
// };
import step from './component/step.vue';

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            component: step
        }
    ]
});

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');
