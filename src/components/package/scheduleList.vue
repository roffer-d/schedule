<template>
    <div class="schedule_list">
        <div class="item" v-for="(item,index) in data" :key="index" @click="openEdit(item)">
            <div class="name">
                {{item.name}}
                <img v-if="item.type == 1" :src="fcjjImg"/>
                <img v-else-if="item.type == 2" :src="jjImg"/>
                <img v-else-if="item.type == 3" :src="ptImg"/>
            </div>
            <div class="time">{{item.startTime}} - {{item.endTime}}</div>
            <div class="tag">{{item.tag}}</div>
        </div>

        <van-popup v-model="showEditSchedule" class="edit_popup" position="right" :style="{ height: '100%',width:'100%' }">
            <edit-schedule :data="editData" :close.sync="showEditSchedule"></edit-schedule>
        </van-popup>
    </div>
</template>

<script>
    import editSchedule from "./editSchedule";
    import fcjjImg from '@/assets/images/schedule/fcjj.png';
    import jjImg from '@/assets/images/schedule/jj.png';
    import ptImg from '@/assets/images/schedule/pt.png';

    export default {
        name: "scheduleList",
        props:['data'],
        components:{editSchedule},
        data(){
            return {
                fcjjImg,jjImg,ptImg,

                editData:null,
                showEditSchedule:false
            }
        },
        methods:{
            openEdit(item){
                this.editData = item
                this.showEditSchedule=true
            }
        }
    }
</script>

<style scoped lang="less">
    .schedule_list {
        background: #fff;
        padding: 0 .3rem;

        .item {
            padding: .3rem 0;
            border-bottom: .01rem solid #EFF1F4;

            .name {
                font-size: .28rem;
                font-weight: 400;
                color: rgba(67, 75, 101, 1);
                display: flex;
                justify-content: space-between;

                img {
                    width: 1.24rem;
                    height: .44rem;
                    vertical-align: sub;
                    margin-right: -.3rem;
                }
            }

            .time {
                font-size: .24rem;
                font-weight: 400;
                color: rgba(161, 165, 178, 1);
            }

            .tag {
                font-size: .2rem;
                font-weight: 400;
                color: rgba(161, 165, 178, 1);
                background: #F3F5F9;
                padding: .1rem;
                width: max-content;
            }

            .time, .tag {
                margin-top: .2rem;
            }
        }
    }
</style>