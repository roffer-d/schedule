<template>
    <div class="edit_schedule">
        <div class="bar">
            <div class="back" @click="back"><img :src="backImg"/></div>
            <div class="title">新建日程</div>
        </div>
        <div class="ctx">
            <div class="row">
                <div class="title">
                    <img :src="titleImg"/>
                    <span class="name">标题</span>
                </div>
                <div class="input">
                    <input type="text" v-model="form.name" placeholder="请输入标题"/>
                </div>
            </div>
            <div class="row">
                <div class="title">
                    <img :src="timeImg"/>
                    <span class="name">开始时间</span>
                </div>
                <div class="input" @click="openShowStartTime">
                    <span v-if="!startTime">请选择开始时间</span>
                    <span v-else>{{startTime}}</span>
                    <img :src="rightImg"/>
                </div>
                <div class="line"></div>
                <div class="title">
                    <img :src="timeImg"/>
                    <span class="name">结束时间</span>
                </div>
                <div class="input" @click="openShowEndTime">
                    <span v-if="!endTime">请选择结束时间</span>
                    <span v-else>{{endTime}}</span>
                    <img :src="rightImg"/>
                </div>
            </div>
            <div class="row">
                <div class="title" @click="showTixing = true">
                    <img :src="tixingImg"/>
                    <span class="name">{{form.tixing == 0 ? txData[form.tixing] : `提前${txData[form.tixing]}`}}</span>
                    <img class="right" src="~@/assets/right.png"/>
                </div>
                <div class="line" style="margin: 0.01rem .5rem;"></div>
                <div class="title">
                    <img :src="wechatImg"/>
                    <span class="name">微信通知</span>
                    <van-switch v-model="form.wxtz" active-color="#3EC271" inactive-color="#DFE5F0" size=".35rem"
                                @change="wxtzChange"/>
                </div>
            </div>
        </div>

        <div class="save_btn" @click="save">保存</div>

        <van-popup v-model="showTixing" position="bottom" :style="{ height: '40%' }" round>
            <van-picker show-toolbar title="提前通知" :columns="txData" :default-index="form.tixing" @confirm="txConfirm" @cancel="txCancel" />
        </van-popup>

        <van-popup v-model="showStartTime" position="bottom" :style="{ height: '46%' }" round>
            <div class="choose_time">
                <van-tabs v-model="activeStart" line-width=".5rem" line-height=".06rem" color="#40C273" @change="startDateChange">
                    <van-tab name="date" :title="activeStartDateTitle"></van-tab>
                    <van-tab name="time" :title="activeStartTimeTitle"></van-tab>
                </van-tabs>
                <div class="time_ok" @click="startTimeOk">确定</div>
            </div>
            <date-box v-show="startDateShow" :date.sync="chooseStartDate" @select="selectedStartDate" ref="chooseStartDate"/>
            <van-picker v-show="!startDateShow" :columns="startDateData" :default-index="0" ref="startTime" @change="startTimeChange"/>
        </van-popup>

        <van-popup v-model="showEndTime" position="bottom" :style="{ height: '46%' }" round>
            <div class="choose_time">
                <van-tabs v-model="activeEnd" line-width=".5rem" line-height=".06rem" color="#40C273" @change="endDateChange">
                    <van-tab name="date" :title="activeEndDateTitle"></van-tab>
                    <van-tab name="time" :title="activeEndTimeTitle"></van-tab>
                </van-tabs>
                <div class="time_ok" @click="endTimeOk">确定</div>
            </div>
            <date-box v-show="endDateShow" :date.sync="chooseEndDate" @select="selectedEndDate" ref="chooseEndDate"/>
            <van-picker v-show="!endDateShow" :columns="endDateData" :default-index="0" ref="endTime" @change="endTimeChange"/>
        </van-popup>
    </div>
</template>

<script>
    import dateBox from "./dateBox";
    import Vue from 'vue';
    import { Toast } from 'vant';

    import backImg from '../../assets/back.png'
    import titleImg from '../../assets/title.png'
    import timeImg from '../../assets/time.png'
    import rightImg from '../../assets/right.png'
    import tixingImg from '../../assets/tixing.png'
    import wechatImg from '../../assets/wechat.png'

    Vue.use(Toast);

    export default {
        name: "editSchedule",
        props: {
            data:{
                type:Object,
                default:()=>{}
            }
        },
        components:{dateBox},
        data() {
            return {
                backImg,titleImg,timeImg,rightImg,tixingImg,wechatImg,

                form: {
                    name: '',
                    startTime: '',
                    endTime: '',
                    tixing: 0,
                    wxtz: false,
                },

                activeStartDateTitle:'',
                activeStartTimeTitle:'',

                activeEndDateTitle:'',
                activeEndTimeTitle:'',

                startTime: '',
                endTime: '',

                chooseStartDate:new Date(),
                chooseEndDate:new Date(),
                activeStart:'',
                activeEnd:'',

                chooseStartTime:'',
                chooseEndTime:'',
                showTixing: false,
                showStartTime: false,
                showEndTime: false,
                startDateShow: true,
                endDateShow: true,
                txData: ['按时通知', '一刻钟', '半小时', '一小时', '两小时'],
                weeks:['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                startDateData: [
                    {
                        values: [],
                        defaultIndex: 0,
                    },
                    {
                        values: [],
                        defaultIndex: 0,
                    },
                ],
                endDateData: [
                    {
                        values: [],
                        defaultIndex: 0,
                    },
                    {
                        values: [],
                        defaultIndex: 0,
                    },
                ],
            }
        },
        mounted() {
            console.log(this.data)

            for(let i = 1 ; i <=23; i++){
                this.startDateData[0].values.push(`0${i}`.slice(-2))
                this.endDateData[0].values.push(`0${i}`.slice(-2))
            }

            for(let i = 1 ; i <=59; i++){
                this.startDateData[1].values.push(`0${i}`.slice(-2))
                this.endDateData[1].values.push(`0${i}`.slice(-2))
            }
        },
        methods: {
            save(){
                const {name,startTime,endTime} = this.form

                if(!name){
                    Toast('标题不能为空！')
                    return;
                }else if(!startTime){
                    Toast('请选择开始时间！')
                    return;
                }else if(!endTime){
                    Toast('请选择结束时间！')
                    return;
                }else if(startTime >= endTime){
                    Toast('结束时间必须大于开始时间！')
                    return;
                }

                this.back()
            },
            openShowStartTime(){
                this.showStartTime = true

                this.$nextTick(()=>{
                    let startInfo = this.$refs.chooseStartDate.getSelected()

                    let startYear = startInfo.year
                    let startMonth = `0${startInfo.month}`.slice(-2)
                    let startDay = `0${startInfo.date}`.slice(-2)
                    let startTime = this.$refs.startTime.getValues()

                    this.activeStartDateTitle = `${startMonth}月${startDay}日`
                    this.activeStartTimeTitle = `${startTime.join(':')}`
                })
            },
            openShowEndTime(){
                this.showEndTime = true

                this.$nextTick(()=>{
                    let endInfo = this.$refs.chooseEndDate.getSelected()

                    let endYear = endInfo.year
                    let endMonth = `0${endInfo.month}`.slice(-2)
                    let endDay = `0${endInfo.date}`.slice(-2)
                    let endTime = this.$refs.endTime.getValues()

                    this.activeEndDateTitle = `${endMonth}月${endDay}日`
                    this.activeEndTimeTitle = `${endTime.join(':')}`
                })
            },
            selectedStartDate(info){
                this.openShowStartTime()
            },
            selectedEndDate(info){
                this.openShowEndTime()
            },
            startTimeChange(picker,value,index){
                this.activeStartTimeTitle = `${value.join(':')}`
            },
            endTimeChange(picker,value,index){
                this.activeEndTimeTitle = `${value.join(':')}`
            },
            back() {
                this.$emit('update:close', false)
            },
            wxtzChange(value) {
                console.log(value)
            },
            txConfirm(value,index){
                this.form.tixing = index
                this.txCancel()
            },
            txCancel(){
                this.showTixing = false
            },
            startTimeOk(){
                let info = this.$refs.chooseStartDate.getSelected()

                let year = info.year
                let month = `0${info.month}`.slice(-2)
                let day = `0${info.date}`.slice(-2)
                let weekDay = this.weeks[info.week === 7 ? 0 : info.week]
                let time = this.$refs.startTime.getValues()

                this.activeStartDateTitle = `${month}月${day}日`
                this.activeStartTimeTitle = `${time.join(':')}`

                this.startTime = `${month}月${day}日 ${weekDay} ${time.join(':')}`

                this.form.startTime = `${year}-${month}-${day} ${time.join(':')}:00`

                this.showStartTime = false
            },
            endTimeOk(){
                let info = this.$refs.chooseEndDate.getSelected()

                let year = info.year
                let month = `0${info.month}`.slice(-2)
                let day = `0${info.date}`.slice(-2)
                let weekDay = this.weeks[info.week === 7 ? 0 : info.week]
                let time = this.$refs.endTime.getValues()

                this.activeEndDateTitle = `${month}月${day}日`
                this.activeEndTimeTitle = `${time.join(':')}`

                this.endTime = `${month}月${day}日 ${weekDay} ${time.join(':')}`

                this.form.endTime = `${year}-${month}-${day} ${time.join(':')}:00`

                this.showEndTime = false
            },
            startDateChange(name,title){
                this.startDateShow = name === 'date'
            },
            endDateChange(name,title){
                this.endDateShow = name === 'date'
            }
        }
    }
</script>
<style lang="less">
    .edit_popup {
        background: #F7F9FB !important;

        .van-switch {
            position: absolute;
            right: .2rem;
            top: .4rem;
        }

        .van-tabs{
            width: 50%;

            .van-tabs__line{
                border-radius: 2rem 2rem 0 0 !important;
            }
        }
    }
</style>
<style scoped lang="less">
    .edit_schedule {
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
                width: 100%;
                background: #fff;
                padding: .3rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;

                &:not(:last-child) {
                    margin-bottom: .3rem;
                }

                .title {
                    padding: .3rem 0;
                    position: relative;
                    width: calc(100% - .5rem);

                    img {
                        width: .34rem;
                        height: .34rem;
                        vertical-align: sub;
                        margin-right: .15rem;
                    }

                    .right {
                        position: absolute;
                        right: 0;
                        top: .3rem;
                    }

                    .name {
                        color: #434B65;
                        font-size: .24rem;
                    }
                }

                .line {
                    width: calc(100% - 1.2rem);
                    margin: .4rem 0 0 0.5rem;
                    border-bottom: .02rem solid #EFF1F4;
                }

                .input {
                    position: relative;
                    padding-left: .5rem;
                    width: calc(100% - 1.2rem);

                    input {
                        border: none;
                        outline: none;
                        height: 0.4rem;
                        color: #787e93;
                        width: 100%;
                    }

                    span {
                        color: #A8B1BB;
                        font-size: .24rem;
                    }

                    img {
                        width: .3rem;
                        height: .3rem;
                        position: absolute;
                        right: 0;
                        top: .05rem;
                    }
                }
            }
        }

        input::-webkit-input-placeholder {
            color: #A8B1BB;
            font-size: .24rem;
        }

        input::-moz-placeholder {
            color: #A8B1BB;
            font-size: .24rem;
        }

        .choose_time{
            position: relative;
            .time_ok{
                position: absolute;
                right: .3rem;
                top: .25rem;
                color: #40C273;
                font-size: .28rem;
            }
        }

        .save_btn{
            background:linear-gradient(270deg,rgba(60,195,109,1) 0%,rgba(72,191,130,1) 100%);
            border-radius:0.08rem;
            width: 92%;
            margin: auto;
            height: .88rem;
            line-height: .88rem;
            color:#fff;
            font-size: .3rem;
            text-align: center;
            position: absolute;
            left: 4%;
            top: 92%;
        }
    }
</style>