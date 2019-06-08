/* page1 单页路由配置 */

import Vue from 'vue'
import Router from 'vue-router'


const One = (resolve => {
    require.ensure(['../views/one.vue'], () => {
        resolve(require('../views/one.vue'))
    })
})


const Two = (resolve => {
    require.ensure(['../views/two.vue'], () => {
        resolve(require('../views/two.vue'))
    })
})

Vue.use(Router)

let base = `${process.env.BASE_URL}` ; // 添加单页前缀

export default new Router({
    mode: 'history',

    base: base + 'page1/',

    routes: [
        {
            path: '/',
            name: 'one',
            component: One
        },

        {
            path: '/two',
            name: 'two',
            component: Two
        }
    ]
})