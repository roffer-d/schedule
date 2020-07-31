<template>
    <div class="schedule">
        <div class="bar">
            <div class="back"><img src="~@/assets/back.png"/></div>
            <div class="title">日程</div>
            <div class="func">
                <img src="~@/assets/search.png"/>
                <img src="~@/assets/settings.png"/>
            </div>
        </div>
        <more height="3.4rem">
            <div class="date_box">
                <div class="current_date">
                    <span>{{current}}</span>
                    <span class="today">今天</span>
                </div>
                <div class="selector">
                    <div class="weeks">
                        <div v-for="(item,index) in weekList" :key="index">{{item}}</div>
                    </div>
                    <div class="day_box">
                        <div class="item"
                             :class="{
                                current_day:item.isCurrentDay,
                                current_month:item.isCurrentMonth,
                                selected_day:item.selected,
                                first_day:item.isFirstDay
                             }"
                             v-for="(item,index) in dayList"
                             :key="index">

                            <div class="solar">{{item.day}}</div>
                            <div class="lunar">{{item.lunar}}</div>
                            <div v-if="item.hasSchedule" class="have_schedule"></div>
                        </div>
                    </div>
                </div>
            </div>
        </more>
        <div class="add"><img src="~@/assets/add.png"/>添加日程</div>
        <div class="list">
            <div class="item" v-for="(item,index) in 3" :key="index">
                <div class="name">
                    用户模块任务列表数据提交
                    <!--                    <img src="~@/assets/jj.png" />-->
                    <img src="~@/assets/fcjj.png"/>
                </div>
                <div class="time">09:00 – 12:00</div>
                <div class="tag">智慧机房PPT绘制</div>
            </div>
        </div>
    </div>
</template>

<script>
    import calendar from "../../public/js/calendar"
    import more from "./more"

    export default {
        name: "schedule",
        props: ['option'],
        components: {more},
        data() {
            return {
                weekList: ['日', '一', '二', '三', '四', '五', '六'],
                dayList: [],
                current:''
            }
        },
        mounted() {

            this.initDate()
        },
        methods: {
            /**
             * @desc 初始化日期
             * @param {Date} d 日期
             * @date 2020-07-31 15:31:55
             * @author Dulongfei
             *
             */
            initDate(d = new Date()) {
                let year = d.getFullYear()
                let month = d.getMonth() + 1

                this.current = `${year}年${('0'+month).slice(-2)}月`

                this.getPrevDays(year, month)

                this.getDaysOfMonth(year, month)

                this.getNextDays(year, month)
            },
            /**
             * @desc 填充前面的空余日期，例如传入的日期是从周三开始，那么前边会空出3个格子，此时应填充为上个月的最后三天
             * @param {Number} year 年份
             * @param {Number} month 月份
             * @date 2020-07-31 16:15:14
             * @author Dulongfei
             *
             */
            getPrevDays(year, month) {
                let week = this.getWeekOfFirstDay(year, month)

                if (week > 0) {
                    let cDate = new Date(year, month - 1, 0)
                    cDate.setMonth(cDate.getMonth() - 1)

                    let end = cDate.getDate()
                    let start = end - week + 1

                    for (let i = start; i <= end; i++) {
                        let lunar = calendar.solar2lunar(cDate.getFullYear(), cDate.getMonth() + 2, i)
                        let {gzYear, IMonthCn, IDayCn,cMonth} = lunar

                        this.dayList.push({
                            day: i == 1 ? `${cMonth}月` : i,
                            lunar: IDayCn == '初一' ? IMonthCn : IDayCn,//农历
                            hasSchedule: false,//是否有日程
                            isFirstDay: i == 1,//是否是当月第一天
                            isCurrentMonth: false,//日期是否包含在当前月份中
                            isCurrentDay: false,//当前日期
                            selected: false//选中的日期
                        })
                    }
                }
            },
            /**
             * @desc 获取指定月份的每一天
             * @param {Number} year 年份
             * @param {Number} month 月份
             * @date 2020-07-31 16:09:11
             * @author Dulongfei
             *
             */
            getDaysOfMonth(year, month) {
                let countOfMonth = this.getDayCountOfMonth(year, month)
                let currentDay = new Date().getDate()

                for (let i = 1; i <= countOfMonth; i++) {
                    let lunar = calendar.solar2lunar(year, month, i)
                    let {gzYear, IMonthCn, IDayCn,cMonth} = lunar

                    this.dayList.push({
                        day: i == 1 ? `${cMonth}月` : i,
                        lunar: IDayCn == '初一' ? IMonthCn : IDayCn,//农历
                        hasSchedule: i % 5 == 0,//是否有日程
                        isFirstDay: i == 1,//是否是当月第一天
                        isCurrentMonth: true,//日期是否包含在当前月份中
                        isCurrentDay: i == currentDay,//当前日期
                        selected: i == 11//选中的日期
                    })
                }
            },
            /**
             * @desc 填充后面的空余格子，填充为下个月的日期
             * @param {Number} year 年份
             * @param {Number} month 月份
             * @date 2020-07-31 16:15:14
             * @author Dulongfei
             *
             */
            getNextDays(year, month) {
                let week = this.getWeekOfFirstDay(year, month)
                let countOfMonth = this.getDayCountOfMonth(year, month)

                let start = 1
                let end = 35 - week - countOfMonth

                let cDate = new Date(year, month + 1, 0)

                for (let i = start; i <= end; i++) {
                    let lunar = calendar.solar2lunar(cDate.getFullYear(), cDate.getMonth() + 1, i)
                    let {gzYear, IMonthCn, IDayCn,cMonth} = lunar
                    console.log(lunar)

                    this.dayList.push({
                        day: i == 1 ? `${cMonth}月` : i,
                        lunar: IDayCn == '初一' ? IMonthCn : IDayCn,//农历
                        hasSchedule: false,//是否有日程
                        isFirstDay: i == 1,//是否是当月第一天
                        isCurrentMonth: false,//日期是否包含在当前月份中
                        isCurrentDay: false,//当前日期
                        selected: false//选中的日期
                    })
                }
            },
            /**
             * @desc 获取日期中的第一天是周几
             * @param {Number} year 年份
             * @param {Number} month 月份
             * @date 2020-07-31 15:45:29
             * @author Dulongfei
             *
             */
            getWeekOfFirstDay(year, month) {
                let date = new Date(year, month - 1, 1)
                return date.getDay()
            },
            /**
             * @desc 获取指定月份的总天数
             * @param {Number} year 年份
             * @param {Number} month 月份
             * @date 2020-07-31 15:53:40
             * @author Dulongfei
             *
             */
            getDayCountOfMonth(year, month) {
                let date = new Date(year, month, 0)
                return date.getDate()
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
            background: url("~@/assets/bg.png") no-repeat;
            background-size: 100% 100%;

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
            .current_date {
                padding: .3rem 0;
                text-align: center;
                font-size: .34rem;
                font-weight: 500;
                color: rgba(67, 75, 101, 1);
                background: #fff;
                position: relative;

                .today{
                    position: absolute;
                    top: .35rem;
                    right: .3rem;
                    color: #40C273;
                    font-size: .28rem;
                    border: .01rem solid #40c273;
                    padding: 0 .1rem;
                    border-radius: .1rem;
                    background: rgba(64, 194, 115,.15);
                }
            }

            .selector {
                .weeks {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: .94rem;
                    background: #F7F9FB;

                    > div {
                        /*flex: 1;*/
                        width: calc(100% / 7);
                        text-align: center;
                        font-size: .28rem;
                        font-weight: 400;
                        color: rgba(0, 0, 0, 0.85);
                        line-height: 44px;
                        text-shadow: 0px 24px 96px rgba(0, 0, 0, 0.03);
                    }
                }

                .day_box {
                    background: #fff;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;

                    .item {
                        width: calc(100% / 7);
                        text-align: center;
                        margin: .15rem 0;
                        position: relative;

                        > div {
                            width: .48rem;
                            height: .48rem;
                            line-height: .48rem;
                            margin: auto;
                        }

                        .solar {
                            color: #B2BFCD;
                            font-size: .3rem;
                        }

                        .lunar {
                            color: #B2BFCD;
                            font-size: .18rem;
                        }

                        &.first_day { //当前月分第一天
                            .solar {
                                color: #40C273 !important;
                            }
                        }

                        &.current_month { //包含在当前月份中的日期
                            .solar {
                                color: #434B65;
                            }

                            .lunar {
                                color: #434B65;
                            }
                        }

                        &.selected_day { //选中的日期
                            .solar {
                                color: #40C273;
                                border: .01rem solid #40C273;
                                border-radius: .04rem;
                            }
                        }

                        &.current_day { //当前日期
                            .solar {
                                color: #fff;
                                background: #40C273;
                                border-radius: .04rem;
                            }

                            .lunar {
                                color: #434B65;
                            }
                        }

                        .have_schedule {
                            width: .1rem;
                            height: .1rem;
                            background: #FF8523;
                            border-radius: 50%;
                            position: absolute;
                            left: calc(50% - 0.05rem);
                        }
                    }
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

            img {
                width: .34rem;
                height: .34rem;
                vertical-align: sub;
                margin: 0 .2rem 0 .3rem;
            }
        }

        .list {
            margin-top: .2rem;
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
    }
</style>
