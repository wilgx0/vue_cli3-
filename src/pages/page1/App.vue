
<template>
    <div class="app">

        <div class="head">
            <router-link to="/">betterScroll-list1</router-link> | <router-link to="/two">betterScroll-list2</router-link>
        </div>

        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "app"
    }
</script>

<style lang="less" scoped>

    .app{
        .head{
            font-size:16px;
            height:40px;
            line-height:40px;
            text-align:center;
            box-sizing:border-box;
            border-bottom: 1px solid #f8f8f8;

            a{
                text-decoration: none;
                color:#42b983;
            }
        }


    }

</style>

