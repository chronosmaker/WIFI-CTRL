/**
 * 定义路由，每个路由应该映射一个组件
 * require.ensure 是 Webpack 的特殊语法，用来设置组件到底路径
 * path : 浏览器的显示的路径
 * name ： 路由的名字
 * component : 路由的组件路径
 */
const routers = [{
    path: '/',
    name: 'index',
    component(resolve) {
        require.ensure(['./App.vue'], () => {
            resolve(require('./App.vue'));
        });
    },
    children: [{
        path: '/step',
        name: 'step',
        component(resolve) {
            require.ensure(['./component/step.vue'], () => {
                resolve(require('./component/step.vue'));
            });
        }
    }]
}];

export default routers;
