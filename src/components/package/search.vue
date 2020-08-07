<template>
    <div class="settings_schedule">
        <div class="bar">
            <div class="back" @click="back"><img :src="backImg"/></div>
            <div class="title">日程搜索</div>
        </div>
        <div class="ctx">
            <div class="row">
                <div class="search_box">
                    <img :src="searchImg" />
                    <input type="text" v-model="searchText" placeholder="搜索日程名称、任务名" @blur="search" />
                </div>
            </div>
        </div>

        <schedule-list :data="scheduleList" @onEdit="onEdit" style="margin-top: .3rem" @reload="search"></schedule-list>
    </div>
</template>

<script>
    import scheduleList from "./scheduleList";
    import backImg from '@/assets/images/schedule/back.png'
    import searchImg from '@/assets/images/schedule/search.png'
    import api from "./api";

    export default {
        name: "search",
        props:{
            /** 数据是否本地存储，true：添加的日程将存放在localStorage false：调用接口数据 **/
            local: {
                type: Boolean,
                default: true
            },
        },
        components:{scheduleList},
        data(){
            return {
                backImg,searchImg,

                searchText:'',
                scheduleList:[]
            }
        },
        mounted() {

        },
        methods:{
            back() {
                this.searchText = ''
                this.scheduleList = []

                this.$emit('reload')
                this.$emit('update:close', false)
            },
            search(){
                if(this.searchText.trim()){
                    if(this.local){
                        this.scheduleList = api.query(this.searchText)
                    }else{
                        this.$emit('onSearch',this.searchText,this.repeatSearch)
                    }
                }
            },
            onEdit(form,resolve){
                this.$emit('onEdit',form,resolve)
            },
            repeatSearch(list){
                this.scheduleList = list
            },
        }
    }
</script>
<style lang="less">
    .search_popup {
        background: #F7F9FB !important;
    }
</style>
<style scoped lang="less">
    .settings_schedule{
        .bar {
            height: .94rem;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            z-index: 1;
            width: 100%;
            background: #fff;

            img {
                width: .4rem;
                height: .4rem;
                margin-left: .3rem;
                vertical-align: middle;
            }

            .back {
                flex: 1;
            }

            .title {
                flex: 10;
                text-align: center;
                font-size: .34rem;
                font-weight: 500;
                color: rgba(18, 27, 48, 1);
            }
        }

        .ctx {
            margin-top: .94rem;

            .row {
                background: #fff;
                padding: .3rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color:#434B65;
                /*border-top: .02rem solid #EFF1F4;*/

                .search_box{
                    width: 100%;
                    height: .72rem;
                    display: flex;
                    align-items: center;
                    background: #F7F9FB;

                    img{
                        width: .24rem;
                        height: .24rem;
                        margin:0 .3rem;
                        vertical-align: middle;
                    }
                    input{
                        border:none;
                        outline: none;
                        background: #F7F9FB;
                        width: calc(100% - 1.1rem);
                    }
                }
            }
        }
    }
</style>