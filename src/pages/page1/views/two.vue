<template>

    <div class="two">
        <scroll class="wrapper"
                :data="data"
                :pulldown="true"
                @pulldown="actionPulldow"
                :pullup="true"
                @scrollToEnd="actionPullup"
        >

            <ul class="content">
                <li v-for="item in data">scroll-{{item}}</li>
            </ul>

            <div class="loading-wrapper"></div>

        </scroll>
    </div>
</template>
<script>

    import scroll from '../components/BetterScrollList'

    export default {
        data() {
            return {
                data: []
            }
        },
        created() {
            this.loadData()
        },
        methods: {
            loadData() {
                setTimeout(() => {
                    for (let i = 0; i < 20; i++) {
                        this.data.push(this.data.length + 1);
                    }
                }, 1000)
            },
            actionPullup() {     //上拉加载
                this.loadData()
            },
            actionPulldow() {        //下拉刷新
                this.data = []
                this.loadData()
            }
        },
        components: {
            scroll
        }
    }
</script>

<style lang="less">

    body {
        margin: 0;
        padding: 0;
    }

    .wrapper {
        height: calc(100vh - 40px);
        overflow: scroll;

        .content {
            list-style-type: none;

            margin: 0;
            padding: 0;

            & > li {
                font-size: 14px;
                background-color: #fff;
                line-height: 40px;
                height: 40px;
                border-bottom: 1px solid #f8f8f8;
                text-align: center;
            }
        }

    }

</style>