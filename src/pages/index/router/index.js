/* page1 单页路由配置 */

import Vue from 'vue'
import Router from 'vue-router'

// 首页
const Home = (resolve => {
    require.ensure(['../views/home.vue'], () => {
        resolve(require('../views/home.vue'))
    })
})

// 测试
const About = (resolve => {
    require.ensure(['../views/about.vue'], () => {
        resolve(require('../views/about.vue'))
    })
})

Vue.use(Router)

let base = `${process.env.BASE_URL}` ; // 添加单页前缀

console.log(base)


export default new Router({
    mode: 'history',

    base: base,

    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },

        {
            path: '/about',
            name: 'about',
            component: About
        }
    ]
})