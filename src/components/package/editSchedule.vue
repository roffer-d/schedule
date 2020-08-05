<template>
    <div class="edit_schedule">
        <div class="bar">
            <div class="back" @click="back"><img :src="backImg"/></div>
            <div class="title">{{this.data?'编辑':'新建'}}日程</div>
            <div class="func" v-if="!!this.data" @click="delSchedule"><img :src="delImg" /></div>
        </div>
        <div class="ctx">
            <div class="row">
                <div class="title">
                    <img :src="titleImg"/>
                    <span class="name">标题</span>
                </div>
                <div class="input">
                    <input type="text" v-model="form.title" placeholder="请输入标题"/>
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
                    <span class="name">{{form.noticeType == 0 ? txData[form.noticeType] : `提前${txData[form.noticeType]}`}}</span>
                    <img class="right" :src="rightImg"/>
                </div>
                <div class="line" style="margin-top: 0;"></div>
                <div class="title">
                    <img :src="wechatImg"/>
                    <span class="name">微信通知</span>
                    <van-switch v-model="form.isPush" active-color="#3EC271" inactive-color="#DFE5F0" size=".35rem"
                                @change="isPushChange"/>
                </div>
            </div>
        </div>

        <div class="save_btn" @click="save">保存</div>

        <van-popup v-model="showTixing" position="bottom" :style="{ height: '45%' }">
            <van-picker show-toolbar title="提前通知" :columns="txData" :default-index="form.noticeType" @confirm="txConfirm"
                        @cancel="txCancel"/>
        </van-popup>

        <van-popup v-model="showStartTime" position="bottom" :style="{ height: '50%' }">
            <div class="choose_time">
                <van-tabs v-model="activeStart" line-width=".5rem" line-height=".06rem" color="#40C273"
                          @change="startDateChange">
                    <van-tab name="date" :title="activeStartDateTitle"></van-tab>
                    <van-tab name="time" :title="activeStartTimeTitle"></van-tab>
                </van-tabs>
                <div class="time_ok" @click="startTimeOk">确定</div>
            </div>
            <date-box v-show="startDateShow" :date.sync="chooseStartDate" @select="selectedStartDate"
                      ref="chooseStartDate"/>
            <van-picker v-show="!startDateShow" :columns="startDateData" :default-index="0" ref="startTime"
                        @change="startTimeChange"/>
        </van-popup>

        <van-popup v-model="showEndTime" position="bottom" :style="{ height: '50%' }">
            <div class="choose_time">
                <van-tabs v-model="activeEnd" line-width=".5rem" line-height=".06rem" color="#40C273"
                          @change="endDateChange">
                    <van-tab name="date" :title="activeEndDateTitle"></van-tab>
                    <van-tab name="time" :title="activeEndTimeTitle"></van-tab>
                </van-tabs>
                <div class="time_ok" @click="endTimeOk">确定</div>
            </div>
            <date-box v-show="endDateShow" :date.sync="chooseEndDate" @select="selectedEndDate" ref="chooseEndDate"/>
            <van-picker v-show="!endDateShow" :columns="endDateData" :default-index="0" ref="endTime"
                        @change="endTimeChange"/>
        </van-popup>
    </div>
</template>

<script>
    import dateBox from "./dateBox";
    import Vue from 'vue';
    import {Toast} from 'vant';

    import backImg from '@/assets/images/schedule/back.png'
    import titleImg from '@/assets/images/schedule/title.png'
    import timeImg from '@/assets/images/schedule/time.png'
    import rightImg from '@/assets/images/schedule/right.png'
    import tixingImg from '@/assets/images/schedule/tixing.png'
    import wechatImg from '@/assets/images/schedule/wechat.png'
    import delImg from '@/assets/images/schedule/delete.png'

    Vue.use(Toast);

    export default {
        name: "editSchedule",
        props: {
            data: {
                type: Object,
                default: () => {
                }
            }
        },
        components: {dateBox},
        data() {
            return {
                backImg, titleImg, timeImg, rightImg, tixingImg, wechatImg,delImg,

                form: {
                    id:'',
                    title: '',
                    startTime: '',
                    endTime: '',
                    noticeType: 0,
                    isPush: false,
                },

                activeStartDateTitle: '',
                activeStartTimeTitle: '',

                activeEndDateTitle: '',
                activeEndTimeTitle: '',

                startTime: '',
                endTime: '',

                chooseStartDate: new Date(),
                chooseEndDate: new Date(),
                activeStart: '',
                activeEnd: '',

                chooseStartTime: '',
                chooseEndTime: '',
                showTixing: false,
                showStartTime: false,
                showEndTime: false,
                startDateShow: true,
                endDateShow: true,
                txData: ['按时通知', '一刻钟', '半小时', '一小时', '两小时'],
                weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
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
            /** 编辑数据 **/
            if (this.data) {
                this.analysisForm()
            }

            this.initTimeRange()
        },
        methods: {
            /**
             * @desc 通过传递过来的编辑数据，反显表单内容
             * @date 2020-08-04 10:39:28
             * @author Dulongfei
             *
             */
            analysisForm() {
                this.form = Object.assign({}, this.form, this.data)

                let startArray = this.form.startTime.split(' ')
                let startDate = startArray[0].split('-')
                let startTime = startArray[1]
                let startYear = startDate[0]
                let startMonth = startDate[1]
                let startDay = startDate[2]
                let startWeek = new Date(startYear * 1, startMonth - 1, startDay * 1).getDay()
                startWeek = this.weeks[startWeek === 7 ? 0 : startWeek]

                let endArray = this.form.endTime.split(' ')
                let endDate = endArray[0].split('-')
                let endTime = endArray[1]
                let endYear = endDate[0]
                let endMonth = endDate[1]
                let endDay = endDate[2]
                let endWeek = new Date(endYear * 1, endMonth - 1, endDay * 1).getDay()
                endWeek = this.weeks[endWeek === 7 ? 0 : endWeek]

                this.activeStartDateTitle = `${startMonth}月${startDay}日`
                this.activeStartTimeTitle = `${startTime}`
                this.startTime = `${startMonth}月${startDay}日 ${startWeek} ${startTime}`

                this.activeEndDateTitle = `${endMonth}月${endDay}日`
                this.activeEndTimeTitle = `${endTime}`
                this.endTime = `${endMonth}月${endDay}日 ${endWeek} ${endTime}`
            },
            /**
             * @desc 初始化时分的数据范围
             * @date 2020-08-04 10:39:56
             * @author Dulongfei
             *
             */
            initTimeRange() {
                let startHour = ''
                let startMinutes = ''
                let endHour = ''
                let endMinutes = ''

                if(this.form.startTime && this.form.endTime){
                    let start = this.form.startTime.split(' ')[1].split(':')
                    let end = this.form.endTime.split(' ')[1].split(':')

                    startHour = start[0]
                    startMinutes = start[1]

                    endHour = end[0]
                    endMinutes = end[1]
                }

                for (let i = 0; i <= 23; i++) {
                    let value = `0${i}`.slice(-2)

                    this.startDateData[0].values.push(value)
                    this.endDateData[0].values.push(value)

                    if(startHour === value){
                        this.startDateData[0].defaultIndex = i
                    }
                    if(endHour === value){
                        this.endDateData[0].defaultIndex = i
                    }
                }

                for (let i = 0; i <= 59; i++) {
                    let value = `0${i}`.slice(-2)

                    this.startDateData[1].values.push(value)
                    this.endDateData[1].values.push(value)

                    if(startMinutes === value){
                        this.startDateData[1].defaultIndex = i
                    }
                    if(endMinutes === value){
                        this.endDateData[1].defaultIndex = i
                    }
                }
            },
            delSchedule(){
                this.$emit('del',this.data,this.afterSave)
            },
            /**
             * @desc 保存事件
             * @date 2020-08-04 10:40:28
             * @author Dulongfei
             *
             */
            save() {
                const {title, startTime, endTime} = this.form

                if (!title) {
                    Toast('标题不能为空！')
                    return;
                } else if (!startTime) {
                    Toast('请选择开始时间！')
                    return;
                } else if (!endTime) {
                    Toast('请选择结束时间！')
                    return;
                } else if (startTime >= endTime) {
                    Toast('结束时间必须大于开始时间！')
                    return;
                }

                this.$emit('onEdit', this.form, this.afterSave)
            },
            /**
             * @desc 保存后的操作
             * @date 2020-08-04 10:40:39
             * @author Dulongfei
             *
             */
            afterSave(isSuccess) {
                if(isSuccess){
                    this.clearForm()
                    this.back()
                }
            },
            clearForm(){
                this.form = {
                    id:'',
                    title: '',
                    startTime: '',
                    endTime: '',
                    noticeType: 0,
                    isPush: false,
                }

                this.activeStartDateTitle = ''
                this.activeStartTimeTitle = ''
                this.startTime = ''

                this.activeEndDateTitle = ''
                this.activeEndTimeTitle = ''
                this.endTime = ''
            },
            /**
             * @desc 显示开始时间弹窗
             * @date 2020-08-04 10:41:24
             * @author Dulongfei
             *
             */
            openShowStartTime() {
                this.showStartTime = true

                this.$nextTick(() => {
                    let startRef = this.$refs.chooseStartDate
                    let startInfo = startRef.getSelected()

                    if (this.form.startTime) {
                        let startArray = this.form.startTime.split(' ')
                        let startDate = startArray[0].split('-')
                        // startRef.setSelected(startDate[0] * 1, startDate[1] * 1, startDate[2] * 1)
                        this.chooseStartDate = new Date(startDate[0] * 1,startDate[1] - 1,startDate[2] * 1)

                        this.$nextTick(()=>{
                            startInfo = startRef.getSelected()
                            this.selectedStartDate(startInfo)

                            // this.activeStartTimeTitle = `${this.form.startTime.split(' ')[1]}`
                        })
                    }else{
                        this.selectedStartDate(startInfo)
                    }
                })
            },
            /**
             * @desc 显示结束时间弹窗
             * @date 2020-08-04 10:41:24
             * @author Dulongfei
             *
             */
            openShowEndTime() {
                this.showEndTime = true

                this.$nextTick(() => {
                    let endRef = this.$refs.chooseEndDate
                    let endInfo = endRef.getSelected()

                    if (this.form.endTime) {
                        let endArray = this.form.endTime.split(' ')
                        let endDate = endArray[0].split('-')
                        // endRef.setSelected(endDate[0] * 1, endDate[1] * 1, endDate[2] * 1)
                        this.chooseEndDate = new Date(endDate[0] * 1,endDate[1] - 1,endDate[2] * 1)

                        this.$nextTick(()=>{
                            endInfo = endRef.getSelected()
                            this.selectedEndDate(endInfo)

                            // this.activeEndTimeTitle = `${this.form.endTime.split(' ')[1]}`
                        })
                    }else{
                        this.selectedEndDate(endInfo)
                    }
                })
            },
            selectedStartDate(info) {
                let startYear = info.year
                let startMonth = `0${info.month}`.slice(-2)
                let startDay = `0${info.date}`.slice(-2)
                let startTime = this.$refs.startTime.getValues()

                this.activeStartDateTitle = `${startMonth}月${startDay}日`
                this.activeStartTimeTitle = `${startTime.join(':')}`
            },
            selectedEndDate(info) {
                let endYear = info.year
                let endMonth = `0${info.month}`.slice(-2)
                let endDay = `0${info.date}`.slice(-2)
                let endTime = this.$refs.endTime.getValues()

                this.activeEndDateTitle = `${endMonth}月${endDay}日`
                this.activeEndTimeTitle = `${endTime.join(':')}`
            },
            startTimeChange(picker, value, index) {
                this.activeStartTimeTitle = `${value.join(':')}`
            },
            endTimeChange(picker, value, index) {
                this.activeEndTimeTitle = `${value.join(':')}`
            },
            back() {
                this.$emit('update:close', false)
            },
            isPushChange(value) {
                console.log(value)
            },
            txConfirm(value, index) {
                this.form.noticeType = index
                this.txCancel()
            },
            txCancel() {
                this.showTixing = false
            },
            startTimeOk() {
                let info = this.$refs.chooseStartDate.getSelected()

                let year = info.year
                let month = `0${info.month}`.slice(-2)
                let day = `0${info.date}`.slice(-2)
                let weekDay = this.weeks[info.week === 7 ? 0 : info.week]
                let time = this.$refs.startTime.getValues()

                this.activeStartDateTitle = `${month}月${day}日`
                this.activeStartTimeTitle = `${time.join(':')}`

                this.startTime = `${month}月${day}日 ${weekDay} ${time.join(':')}`

                this.form.startTime = `${year}-${month}-${day} ${time.join(':')}`

                this.showStartTime = false
            },
            endTimeOk() {
                let info = this.$refs.chooseEndDate.getSelected()

                let year = info.year
                let month = `0${info.month}`.slice(-2)
                let day = `0${info.date}`.slice(-2)
                let weekDay = this.weeks[info.week === 7 ? 0 : info.week]
                let time = this.$refs.endTime.getValues()

                this.activeEndDateTitle = `${month}月${day}日`
                this.activeEndTimeTitle = `${time.join(':')}`

                this.endTime = `${month}月${day}日 ${weekDay} ${time.join(':')}`

                this.form.endTime = `${year}-${month}-${day} ${time.join(':')}`

                this.showEndTime = false
            },
            startDateChange(name, title) {
                this.startDateShow = name === 'date'

                // this.$nextTick(()=>{
                //     let start = this.form.startTime
                //     if(start){
                //         let startRef = this.$refs.startTime
                //
                //         let values = start.split(' ')[1].split(':')
                //         startRef.setValues(values)
                //     }
                // })
            },
            endDateChange(name, title) {
                this.endDateShow = name === 'date'

                // this.$nextTick(()=>{
                //     let end = this.form.endTime
                //     if(end){
                //         let endRef = this.$refs.endTime
                //
                //         let values = end.split(' ')[1].split(':')
                //         endRef.setValues(values)
                //     }
                // })
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

        .van-tabs {
            width: 50%;

            .van-tabs__line {
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

            .func{
                margin-right: .3rem;
            }
        }

        .ctx {
            margin-top: .94rem;

            .row {
                background: #fff;
                padding: .3rem 0;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;

                &:not(:last-child) {
                    margin-bottom: .3rem;
                }

                .title {
                    padding: 0.3rem 0 0.3rem .3rem;
                    position: relative;

                    img {
                        width: .34rem;
                        height: .34rem;
                        vertical-align: sub;
                        margin-right: .15rem;

                        &:last-child {
                            width: .3rem;
                            height: .3rem;
                        }
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
                    width: 90%;
                    margin: 0.4rem 0 0 0.75rem;
                    border-bottom: 0.02rem solid #EFF1F4;
                }

                .input {
                    position: relative;
                    padding-left: .75rem;

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
                        right: 0.1rem;
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

        .choose_time {
            position: relative;

            .time_ok {
                position: absolute;
                right: .3rem;
                top: .25rem;
                color: #40C273;
                font-size: .28rem;
            }
        }

        .save_btn {
            background: linear-gradient(270deg, rgba(60, 195, 109, 1) 0%, rgba(72, 191, 130, 1) 100%);
            border-radius: 0.08rem;
            width: 92%;
            margin: auto;
            height: .88rem;
            line-height: .88rem;
            color: #fff;
            font-size: .3rem;
            text-align: center;
            position: absolute;
            left: 4%;
            top: 92%;
        }
    }
</style>