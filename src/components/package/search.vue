<template>
    <div class="settings_schedule">
        <div class="bar">
            <div class="back" @click="back"><img src="~@/assets/back.png"/></div>
            <div class="title">日程搜索</div>
        </div>
        <div class="ctx">
            <div class="row">
                <div class="search_box">
                    <img src="~@/assets/search.png" />
                    <input type="text" v-model="searchText" placeholder="搜索日程名称、任务名" @blur="search" />
                </div>
            </div>
        </div>

        <schedule-list :data="scheduleList" style="margin-top: .3rem"></schedule-list>
    </div>
</template>

<script>
    import scheduleList from "./scheduleList";

    export default {
        name: "search",
        components:{scheduleList},
        data(){
            return {
                searchText:'',
                scheduleList:[]
            }
        },
        mounted() {

        },
        methods:{
            pushChange(isPush){
                console.log(isPush)
            },
            back() {
                this.$emit('update:close', false)
            },
            search(){
                if(this.searchText.trim()){
                    this.scheduleList = this.scheduleList.concat([
                        {name:'用户模块任务列表数据提交1',startTime:'10:00',endTime:'12:00',type:1,tag:'智慧机房PPT绘制1'},
                        {name:'用户模块任务列表数据提交2',startTime:'13:00',endTime:'14:00',type:2,tag:'智慧机房PPT绘制2'},
                        {name:'用户模块任务列表数据提交3',startTime:'15:00',endTime:'16:00',type:3,tag:'智慧机房PPT绘制3'}
                    ])
                }
            }
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
            width: calc(100% - .5rem);

            .row {
                width: 100%;
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