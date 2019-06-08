
<template>

    <div class="one">

        <div ref="wrapper" class="list-wrapper">

            <ul class="list-content">
                <li  class="list-item" v-for="item in list">{{item}}</li>
            </ul>

        </div>

    </div>

</template>


<script>
    import BScroll from 'better-scroll'


    export default {
        data() {
            return {
                list:[]
            }
        },
        methods:{
            getlist(callback){
                setTimeout(()=>{
                    for (let i = 0; i < 20; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    if(callback){
                        callback()
                    }
                },1000)
            }
        },
        mounted(){
            this.getlist()
            this.$nextTick(()=>{
                if(!this.scroll){
                    // 初始化
                    this.scroll = new BScroll(this.$refs.wrapper,{
                        pullDownRefresh:{
                            threshold:50,   // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
                            stop:20,        // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
                        },
                        pullUpLoad:{
                            threshold: -10 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
                        }
                    })

                    //下拉刷新
                    this.scroll.on('pullingDown',()=>{
                        // 刷新数据的过程中，回弹停留在距离顶部还有20px的位置
                        this.list = []
                        this.getlist(()=>{

                            // 在刷新数据完成之后，调用 finishPullDown 方法，回弹到顶部
                            this.scroll.finishPullDown()

                            this.$nextTick(()=>{
                                this.scroll.refresh()

                            })

                        })




                    })


                    //上拉加载
                    this.scroll.on('pullingUp', () => {
                        this.getlist(()=>{

                            this.scroll.finishPullUp()

                            this.$nextTick(()=>{
                                this.scroll.refresh()
                            })
                        })

                    })


                    //测试
                    this.scroll.on('touchEnd', (pos) => {
                        console.log(pos)

                    })


                }

            })


        }
    }
</script>


<style lang="less">


    body,ul{
        margin:0;
        padding:0;
    }
    .one{

        background-color:#f8f8f8;
        font-size:14px;

        .down-loading{
            text-align:center;
            height:20px;
            line-height:20px;
        }
        .list-wrapper{
            height:calc(100vh - 40px);
            overflow: scroll;
            .list-content{
                list-style-type: none;
                .list-item{
                    background-color:#fff;
                    line-height:40px;
                    height:40px;
                    border-bottom:1px solid #f8f8f8;
                    text-align:center;
                }
            }
        }
    }
</style>