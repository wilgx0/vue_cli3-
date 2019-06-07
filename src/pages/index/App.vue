<template>
    <div id="app">
        <h1>页面间跳转</h1>
        <div class="nav">
            <a @click="goFn('')">Index</a> |
            <a @click="goFn('page1')">Page1</a> |
            <a @click="goFn('page2')">Page2</a> |
        </div>

        <h1>index页面</h1>

        <h1>页面内的路由</h1>

        <div class="nav">
            <router-link to="/">首页</router-link> |
            <router-link to="/about">关于</router-link>
        </div>

        <router-view></router-view>

    </div>

</template>


<script>

    export default {
        methods: {
            goFn(name) {
                //location.href = `${process.env.BASE_URL}` + name
                this.$openRouter({name})
            }
        }
    }
</script>

<style lang="less">

    a {
        cursor: pointer;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    .nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
