<template>
    <div class="schedule">
        <div class="bar">
            <div class="back" @click="back"><img :src="backImg"/></div>
            <div class="title">日程</div>
            <div class="func">
                <img :src="searchImg" @click="showSearch = true" />
                <img :src="settingsImg" @click="showSettings = true"/>
            </div>
        </div>
        <more height="4rem">
            <div class="date_box">
                <div class="current_date">
                    <span @click="showChooseDate=true">{{currentDateStr}}</span>
                    <span class="today" @click="backToday">今天</span>
                </div>
                <date-box :date.sync="chooseDate" show-lunar show-point ref="dateBox" @select="dateSelected"></date-box>
            </div>
        </more>

        <div class="add" @click="showEditSchedule=true"><img :src="addImg"/>添加日程</div>

        <schedule-list :data="scheduleList"></schedule-list>

        <van-popup v-model="showChooseDate" position="bottom" :style="{ height: '40%' }">
            <van-datetime-picker
                    v-model="pickerDate"
                    type="year-month"
                    title="选择年月"
                    @change="dateChange"
                    @confirm="dateConfirm"
                    @cancel="dateCancel"
                    :formatter="dateFormatter"
                    :min-date="minDate"
                    :max-date="maxDate"
            />
        </van-popup>

        <van-popup v-model="showEditSchedule" class="edit_popup" position="right" :style="{ height: '100%',width:'100%' }">
            <edit-schedule :close.sync="showEditSchedule"></edit-schedule>
        </van-popup>

        <van-popup v-model="showSearch" class="search_popup" position="bottom" :style="{ height: '100%' }">
            <search :close.sync="showSearch"></search>
        </van-popup>

        <van-popup v-model="showSettings" class="settings_popup" position="bottom" :style="{ height: '100%' }">
            <settings :close.sync="showSettings"></settings>
        </van-popup>
    </div>
</template>

<script>
    import more from "./package/more"
    import scheduleList from "./package/scheduleList";
    import dateBox from "./package/dateBox";
    import editSchedule from "./package/editSchedule";
    import search from "./package/search";
    import settings from "./package/settings";

    import backImg from "@/assets/images/schedule/back.png";
    import searchImg from "@/assets/images/schedule/search.png";
    import settingsImg from "@/assets/images/schedule/settings.png";
    import addImg from "@/assets/images/schedule/add.png";

    export default {
        name: "schedule",
        props: ['option'],
        components: {more,scheduleList,dateBox,editSchedule,search,settings},
        data() {
            return {
                backImg,searchImg,settingsImg,addImg,

                minDate: new Date(),
                maxDate: new Date(2100,11,1),
                chooseDate: new Date(),
                pickerDate: new Date(),
                showChooseDate: false,
                showEditSchedule: false,
                showSettings: false,
                showSearch: false,
                currentDateStr: '',
                scheduleList:[
                    {name:'用户模块任务列表数据提交1',startTime:'10:00',endTime:'12:00',type:1,tag:'智慧机房PPT绘制1'},
                    {name:'用户模块任务列表数据提交2',startTime:'13:00',endTime:'14:00',type:2,tag:'智慧机房PPT绘制2'},
                    {name:'用户模块任务列表数据提交3',startTime:'15:00',endTime:'16:00',type:3,tag:'智慧机房PPT绘制3'}
                ]
            }
        },
        watch:{
            chooseDate(date){
                this.getYearAndMonth(date)
            }
        },
        mounted() {
            this.getYearAndMonth(this.chooseDate)
        },
        methods: {
            /**
             * @desc 选中日期回调函数
             * @param {Object}  info 选中的日期对象(包含农历子对象)
             * @date 2020-07-31 15:31:55
             * @author Dulongfei
             *
             */
            dateSelected(info){
                console.log(info)
            },
            getYearAndMonth(date){
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                this.currentDateStr = `${year}年${('0' + month).slice(-2)}月`
            },
            /**
             * @desc 选择日期change事件
             * @param {Object}  picker Picker 实例对象
             * @date 2020-07-31 15:31:55
             * @author Dulongfei
             *
             */
            dateChange(picker) {

            },
            /**
             * @desc 选择日期确认事件
             * @param {String}  value 当前选中的时间
             * @date 2020-07-31 15:31:55
             * @author Dulongfei
             *
             */
            dateConfirm(value) {
                // this.$refs.dateBox.initDate(value)
                this.chooseDate = value
                this.dateCancel()
            },
            /**
             * @desc 选择日期取消事件
             * @date 2020-07-31 15:31:55
             * @author Dulongfei
             *
             */
            dateCancel() {
                this.showChooseDate = false
            },
            /**
             * @desc 选择日期格式化
             * @date 2020-07-31 15:31:55
             * @author Dulongfei
             *
             */
            dateFormatter(type, val) {
                if (type === 'year') {
                    return `${val}年`;
                } else if (type === 'month') {
                    return `${val}月`;
                }
                return val;
            },
            /**
             * @desc 返回当前日期
             * @author Dulongfei
             *
             */
            backToday() {
                this.chooseDate = new Date()
            },
            /**
             * @desc 返回上一页
             * @author Dulongfei
             *
             */
            back() {
                this.$emit('back')
            }
        }
    };
</script>

<style lang="less">
    html, body {
        /*font-size: 62.5%;*/
        font-size: 50px;
        padding: 0;
        margin: 0;
    }

    .schedule {
        .show-more {
            background: #fff;
        }
    }
</style>
<style scoped lang="less">
    .schedule {
        font-size: 14px;
        background: #F7F9FB;
        height: 100vh;
        font-family: PingFangSC-Regular, PingFang SC;

        .bar {
            height: .94rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: url("../assets/images/schedule/bg.png") no-repeat;
            background-size: 100% 100%;
            position: fixed;
            top: 0;
            z-index: 1;
            width: 100%;

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
                flex: 4;
                text-align: center;
                font-size: .34rem;
                font-weight: 500;
                color: rgba(18, 27, 48, 1);
                padding-left: .8rem;
            }

            .func {
                flex: 2;
                text-align: center;
            }
        }

        .date_box {
            margin-top: .94rem;

            .current_date {
                padding: .3rem 0;
                text-align: center;
                font-size: .34rem;
                font-weight: 500;
                color: rgba(67, 75, 101, 1);
                background: #fff;
                position: relative;

                .today {
                    position: absolute;
                    top: .35rem;
                    right: .3rem;
                    color: #40C273;
                    font-size: .28rem;
                    border: .01rem solid #40c273;
                    padding: 0 .1rem;
                    border-radius: .1rem;
                    background: rgba(64, 194, 115, .15);
                }
            }
        }

        .add {
            background: #fff;
            height: .94rem;
            line-height: .94rem;
            border-top: .01rem solid #EFF1F4;
            color: #40C273;
            font-size: .28rem;
            margin-bottom: .2rem;

            img {
                width: .34rem;
                height: .34rem;
                vertical-align: sub;
                margin: 0 .2rem 0 .3rem;
            }
        }
    }
</style>
